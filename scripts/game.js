var game = this.game || (this.game ={});
var createjs = this.createjs || {};
var jQuery = this.jQuery || $ || {};

;(function(game){
	game.canvas = document.getElementById('canvas');
	game.helper.resizeCanvas();
	game.setting = {
		gameWidth: game.canvas.width,
		gameHeight: game.canvas.height,
		probablityOfDropDown: 0.05,
		cupSpeed: 500,
		speed: 250,
		timeLimit: 60,
		startTime: 0
	}
}).call(this, game);
	
;(function(game, cjs, $){
	game.initLoader = function(complete){
		var resol = game.helper.getProperBG();
		var recorder = 0, allRecord;
		manifest = [
			{src: "coffeecup_icon.png", id: "coffeecup"},
			{src: "coffeebottle_icon.png", id: "coffeebottle"},
			{src: "gold_coffeebean_icon.png", id: "gold_coffeebean"},
			{src: "normal001_coffeebean_icon.png", id: "normal001_coffeebean"},
			{src: "normal002_coffeebean_icon.png", id: "normal002_coffeebean"},
			{src: "normal003_coffeebean_icon.png", id: "normal003_coffeebean"},
			{src: "normal004_coffeebean_icon.png", id: "normal004_coffeebean"},
			{src: "playing_background"+ resol +".png", id: "playing_background"},
			{src: "prepare_background"+ resol +".png", id: "prepare_background"},
			{src: "scorebar_coffeebottle_icon.png", id: "scorebar_coffeebottle"},
			{src: "scorebar_goldcoffeebean_icon.png", id: "scorebar_goldcoffeebean"},
			{src: "scorebar_normalcoffeebean_icon.png", id: "scorebar_normalcoffeebean"}
		];
		allRecord = manifest.length;
		game.loader = new cjs.LoadQueue(false);
		game.loader.addEventListener("progress", function(){
			game.progressScene.node.find('.box:eq('+ (recorder++) +')').addClass('active');
		});
		game.loader.addEventListener("complete", complete);
		game.loader.loadManifest(manifest, true, "images/");
	}
}).call(this, game, createjs, jQuery);

;(function(game, $){
	game.recorder = {
		scorebar_normalcoffeebean: {},
		scorebar_coffeebottle: {},
		scorebar_goldcoffeebean: {},
		init: function(){
			this.initRecorderPane();
		},
		initRecorderPane: function(){
			var pane = game.gameScene.node.find('#recordPane');
			var scorebar_normalcoffeebean = this.scorebar_normalcoffeebean = pane.find('.normal');
			var scorebar_coffeebottle = this.scorebar_coffeebottle = pane.find('.bottle');
			var scorebar_goldcoffeebean = this.scorebar_goldcoffeebean = pane.find('.golden');
			
			scorebar_normalcoffeebean.empty().append($('<img src="'+ game.loader.getResult('scorebar_normalcoffeebean').src +'">&nbsp;&nbsp;X&nbsp;&nbsp;<span>0</span>'));
			scorebar_coffeebottle.empty().append($('<img src="'+ game.loader.getResult('scorebar_coffeebottle').src +'">&nbsp;&nbsp;X&nbsp;&nbsp;<span>0</span>'));
			scorebar_goldcoffeebean.empty().append($('<img src="'+ game.loader.getResult('scorebar_goldcoffeebean').src +'">&nbsp;&nbsp;X&nbsp;&nbsp;<span>0</span>'));
		},
		addOneThing: function(thing){
			//console.log(thing.data.type);
			var temp = game.recorder[thing.data.type].find('span');
			var count = parseInt(temp.text()) + 1;
			temp.text(count);
		}
	}
}).call(this, game, jQuery)

;(function(game, cjs){
	game.flow = {
		startOver: function(){
			game.startScene.show();
			game.gameScene.hide();
			game.gameOverScene.hide();
			game.progressScene.hide();
		},
		startGame: function(){
			game.startScene.hide();
			game.gameScene.show();
			game.gameOverScene.hide();
		},
		gameOver: function(){
			game.startScene.hide();
			game.gameScene.hide();
			game.gameOverScene.show();
		}
	}
}).call(this, game, createjs);


;(function(game, cjs){
	game.eventHandler = {
		init: function(){
			game.stage.addEventListener('stagemousemove', this.pressMoveHandler);
		},
		pressMoveHandler: function(event){
			event.preventDefault();
			event.stopPropagation();
			game.userCup.x = event.stageX - game.userCup.getBounds().width * game.userCup.scaleX / 2;
		},
		reset: function(){
			if(game.stage) game.stage.removeAllEventListeners();
		}
	}

	game.coffeecup = {
		nowSpeed: 0,
		init: function(){	
			game.userCup = new game.cup();
			game.userCup.y = game.setting.gameHeight - 100;
			game.userCup.x = (game.setting.gameWidth - game.userCup.getBounds().width * game.userCup.scaleX)/2 
			game.stage.addChild(game.userCup);
		}
	}
	game.initTimer = function(){
		game.Timer = new game.clock();
		game.stage.addChild(game.Timer);
	}

	game.dropCache = {
		cache: [],
		generateDropThing: function(){
			var temp = new game[game.algorithm.getTempThing()]();
			temp.x = Math.random()* game.setting.gameWidth;
			temp.y = 50;
			temp.rotation = (Math.random() * 2 - 1) * 90;
			game.stage.addChild(temp);
			this.cache.push(temp);
		},
		thingStillFlying: function(idx){
			//如果超过边界了
			var thing = this.cache[idx];
			if(thing.y <= -thing.getBounds().height * thing.scaleY || thing.x >= game.setting.gameWidth ||  thing.x <= -thing.getBounds().width * thing.scaleX){
				this.destroything(idx)
				return false;
			}

			if (game.helper.collsionDetect(thing, game.userCup)) {
				//thing.data.type
				game.recorder.addOneThing(thing);
				this.destroything(idx);
				return false;
			};
			return true;
		},
		destroything: function(idx){
			if (game.stage.removeChild(this.cache[idx])) {
				this.cache.splice(idx ,1);
			}	
		},
		tick: function(event){
			if (!cjs.Ticker.paused) {
				var len = this.cache.length, 
					deltaS = event.delta / 1000,
					i;
				for(i = 0; i < len; i++){
					if(this.thingStillFlying(i)){

						this.cache[i].y = this.cache[i].y + deltaS * game.setting.speed;
					}else{
						len --;
					}
				}
				if (Math.random() < game.setting.probablityOfDropDown){
					this.generateDropThing();
				}
				console.log(cjs.Ticker.getTime() - game.setting.startTime)
				game.Timer.showTime(cjs.Ticker.getTime() - game.setting.startTime);
				if(cjs.Ticker.getTime() - game.setting.startTime > game.setting.timeLimit * 1000){
					game.flow.gameOver();
					cjs.Ticker.removeAllEventListeners();
				}
				game.stage.update(event);
			}
		},
		reset: function(){
			this.cache = [];
			if(game.stage) game.stage.removeAllChildren();
		}
	}

	game.gameView = {
		init: function(){
			game.coffeecup.init();
			game.eventHandler.init();
			game.recorder.init();
			game.initTimer();

			game.setting.startTime = cjs.Ticker.getTime();

			//cjs.Ticker.addEventListener("tick", game.coffeecup.tick.bind(game.coffeecup));
			cjs.Ticker.addEventListener("tick", game.dropCache.tick.bind(game.dropCache));
		}
	}
}).call(this, game, createjs)



;(function(game, cjs){
	//TODO 游戏开始方法
	game.start = function(){
		//console.log(game.setting.gameWidth, game.setting.gameHeight)
		game.stage = new cjs.Stage(game.canvas);
		cjs.Touch.enable(game.stage);
		var handleComplete = function(){
			game.initScene();
			game.flow.startOver();
		}
		game.initLoader(handleComplete);
	}
	game.initScene = function(){
		game.startScene.setup();
		game.gameScene.setup();
		game.gameOverScene.setup();
		cjs.Ticker.timingMode = createjs.Ticker.RAF;
		cjs.Ticker.setFPS(40);
	}
}).call(this, game, createjs);

;(function(game){
	if (game) {
		//页面加载完成后的初始化函数，调用本页面的208行
		game.start();
	}else{
		throw "No game logic found.";
	}
}).call(this, game);
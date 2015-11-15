//全局的对象game
var game = this.game || (this.game ={});
//全局的createjs，来自引入的createjs组件
var createjs = createjs || {};

;(function(game){

	//获得id=canvas的节点
	game.canvas = document.getElementById('canvas');
	//适配移动端，使得画布的大小和移动设备一样大小
	game.helper.resizeCanvas();
	//游戏的一些参数的设置
	game.setting = {
		//画布宽度
		gameWidth: game.canvas.width,
		//画布高度
		gameHeight: game.canvas.height,
		//生成diamond的间隔
		ticksPerNewDiamond: 20,
		//下落速度
		fallingSpeed: 5,
		//diamond宽度
		diamondWidth: 90,
		//计时器的时间,现在时设置为30秒钟
		gameTimeout: 30,
		lastTime: 0
	}
	//传入window作用域中的game对象作为参数
}).call(this, game);

;(function(game, cjs){
	//touchEventMng专门用来管理整个stage事件的监听，以及更新猫的位置
	game.touchEventMng = function(){
		//用来记录点击那一刻的X,Y坐标
		var mousedown = {x: 0, y: 0};
		//按下事件的回调函数
		var mousedownHandler = function(e){
			mousedown = {
				x: e.localX,
				y: e.localY
			}
			console.log(mousedown);
			//hasActiveTweens用来判断是否在运动
			if (cjs.Tween.hasActiveTweens(game.gameView.cat)) {
				console.log('hastweens');
				//如果不运动了，移除所有的Tweens
				cjs.Tween.removeAllTweens();
			};
			//更新猫的位置
			console.log(game.gameView.cat);
			cjs.Tween.get(game.gameView.cat).to(mousedown, (function(){
				//起点到终点的直线距离
				var _x=Math.abs(game.gameView.cat.x-mousedown.x);
				var _y=Math.abs(game.gameView.cat.y-mousedown.y);
				var distance=Math.sqrt(_x*_x+_y*_y);
				var time=(distance/game.gameView.cat.movespeed)*1000;
				console.log(time);
				return time;
			})());
		}
		return {
			//初始化对舞台的监听
			init: function(){
				if (!game.stage.hasEventListener('stagemousedown')) {
					console.log('noHandler');
					game.stage.addEventListener('stagemousedown', mousedownHandler);
				};
			},
			reset: function(){
				cjs.Tween.removeAllTweens();
				game.stage.removeEventListener('stagemousedown', mousedownHandler);
			}
		}
	}();
}).call(this, game, createjs)

//Tick
;(function(cjs){
	//游戏的渲染主程序，是tick事件的回调函数，在第99行,传入的e代表是tick事件
	game.Tick = function(e){
		//更新舞台
		game.stage.update();
		//如果tick事件没有停止
		if (!e.paused) {
			//移动diamond，处理离开屏幕的移动diamond
			game.gameView.moveObjects();

			if(game.gameView.diamondFactoryState){
				game.gameView.timer.showTime(cjs.Ticker.getTime() - game.setting.lastTime);
			}

			var ticksCount = createjs.Ticker.getTicks(true);
			if (game.gameView.diamondFactoryState && ticksCount % game.setting.ticksPerNewDiamond === 0) {
				game.gameView.generateDiamond();
			};
			game.gameView.checkOnDiamonds();
			
			//遍历diamondsRepositories，进行碰撞检测的判断,这块代码michael,写的，本人michael深知写的很渣，很丑
			for(var i=0; i<game.gameView.diamondsRepositories.length; i++){
				//
				if(
				   (game.gameView.diamondsRepositories[i].x<game.gameView.cat.x)&&
				   (game.gameView.cat.x<(game.gameView.diamondsRepositories[i].x+40))&&
				   (game.gameView.diamondsRepositories[i].y<game.gameView.cat.y)&&
				   (game.gameView.cat.y<(game.gameView.diamondsRepositories[i].y+40))
				  ){
                    console.log("钻石在猫的左上角碰撞到了");
                    game.gameView.removeDiamond(game.gameView.diamondsRepositories[i]);
                    game.gameView.countBoard.addNumberText();

				}

				if(
				   (game.gameView.diamondsRepositories[i].x<(game.gameView.cat.x+64))&&
				   ((game.gameView.cat.x+64)<(game.gameView.diamondsRepositories[i].x+40))&&
				   (game.gameView.diamondsRepositories[i].y<game.gameView.cat.y)&&
				   (game.gameView.cat.y<(game.gameView.diamondsRepositories[i].y+40))
				  ){
                    console.log("钻石在猫的右上角碰撞到了");
                    game.gameView.removeDiamond(game.gameView.diamondsRepositories[i]);
                    game.gameView.countBoard.addNumberText();
				}

				if(
				   (game.gameView.diamondsRepositories[i].x<(game.gameView.cat.x+32))&&
				   ((game.gameView.cat.x+32)<(game.gameView.diamondsRepositories[i].x+40))&&
				   (game.gameView.diamondsRepositories[i].y<(game.gameView.cat.y+45))&&
				   ((game.gameView.cat.y+45)<(game.gameView.diamondsRepositories[i].y+40))
				  ){
                    console.log("钻石在猫的中心碰撞到了");
                    game.gameView.removeDiamond(game.gameView.diamondsRepositories[i]);
                    game.gameView.countBoard.addNumberText();
				}
			}
		};
	}
}).call(this, createjs);

;(function(game, cjs){
	//游戏逻辑
	game.gameView = {
		//计分版
		countBoard: {},
		//diamonds仓库
		diamondsRepositories: [],
		diamondFactoryState: true,
		generateDiamond: function(){
			diamond = new game.diamond();
			diamond.y = - game.setting.diamondWidth;
			diamond.x = Math.random() * (game.setting.gameWidth - game.setting.diamondWidth);
			game.stage.addChild(diamond);
			this.diamondsRepositories.push(diamond);
		},
		//游戏初始化
		init: function(){

			//生成计数板，放入stage
			this.putOnCountBoard();
			//放入计时器
			this.putOnTimerBoard();
			//生成Diamond，放入stage
			this.generateDiamond();
			//生成猫，放入stage
			this.putOnCat();
			//为了在 stage 上使用鼠标事件,对stage添加touch事件
            createjs.Touch.enable(game.stage);
            // enabled mouse over / out events，// 10 updates per second,这个操作的开销很大，所以它默认是被关闭的。
		    game.stage.enableMouseOver(10);
		    // keep tracking the mouse even when it leaves the canvas

		    game.stage.mouseMoveOutside = true; 

		    game.setting.lastTime = cjs.Ticker.getTime();
			cjs.Ticker.setFPS(40);
			cjs.Ticker.addEventListener('tick', game.Tick);

		},
		reset: function(){
			game.stage.removeAllChildren();
			this.diamondFactoryState = true;
			this.diamondsRepositories = [];
			this.init();
		},
		//移动diamond，处理离开屏幕的移动diamond
		moveObjects: function(){
			for(var i=0, len=this.diamondsRepositories.length; i<len; i++){
				if (this.diamondsRepositories[i] != null) {
					var diamond = this.diamondsRepositories[i];
					//更新diamond的y
					diamond.y += game.setting.fallingSpeed;
					//如果diamond的y大于游戏的屏幕的高度，说明要离开屏幕了
					if (diamond.y > game.setting.gameHeight) {
						//把这个diamond从舞台中移除，也从diamondsRepositories中移除
						this.removeDiamond(diamond);
					};
				};	
			}
		},
		//遍历diamondsRepositories，把要离开屏的diamond从舞台中移除，也从diamondsRepositories中移除
		removeDiamond: function(target){
			for(var i=0, len=this.diamondsRepositories.length; i<len; i++){
				var diamond = this.diamondsRepositories[i];
				if (diamond === target) {
					this.diamondsRepositories.splice(i, 1);
					game.stage.removeChild(diamond);
					return;
				};
			}
		},

		checkOnDiamonds: function(){
			if (this.diamondsRepositories.length === 0) {
				game.stage.dispatchEvent(new game.helper.gameOverEvent(10));
			};
		},
		//生成计数板，放入stage
		putOnCountBoard: function(){
			//diamondBoard函数在view-sprites.js中
			this.countBoard = new game.diamondBoard();
			game.stage.addChild(this.countBoard);
		},
		putOnTimerBoard: function(){
			this.timer = new game.clock();
			game.stage.addChild(this.timer);
			//放入舞台
			game.stage.addChild(this.countBoard);
		},
		//生成猫，放入stage
		putOnCat: function(){
			//diamondBoard函数在view-sprites.js中
			this.cat = new game.cat();
			//放入舞台
			game.stage.addChild(this.cat);
		}
	}
    //加载资源
	game.initLoader = function(complete){
		//资源列表
		manifest = [
			{src: "cat_01.png", id: "cat"},
			{src: "money.png", id: "money"},
			{src: "diamond-spritesheet.png", id: "diamond"},
			{src: "diamonds.png", id:"diamondsBoard"},
			{src: "clock.png", id: "clock"}
		];
		//创建一个loader管理器
		game.loader = new cjs.LoadQueue(false);
		//加载完成后，调用回调函数complete
		game.loader.addEventListener("complete", complete);
		//加载资源列表
		game.loader.loadManifest(manifest, true, "imgs/");

	}
    //游戏结束事件
	game.initGameOver = function(){
		game.stage.addEventListener('gameOverEvent', function(e){
			console.log('game over');
			cjs.Ticker.removeEventListener('tick', game.Tick);
		
			
			console.log(game.setting.lastTime)
			game.touchEventMng.reset();
			document.getElementById('canvas').style.display = 'none';
            document.getElementById('gamebg').style.display = 'block';
            document.getElementById('score-btn').style.display = 'block';
            document.getElementById('score-btn').innerText = '得分: ' + game.gameView.countBoard.getNumberText();
            document.getElementById('start-btn').innerText = '再来一次';

		})
	}
	//停止产生Diamond 
	game.initStopGenerateDiamond = function(){
		game.stage.addEventListener('stopGenerateDiamondEvent', function(e){
			console.log('stop');
			game.gameView.diamondFactoryState = false;
		})
	}
}).call(this, game, createjs);



;(function(game, cjs){
	//TODO 游戏开始方法
	game.start = function(){
		//创建一个舞台
		game.stage = new cjs.Stage(game.canvas);
        //资源加载完成后的回调函数
		var handleComplete = function(){
			console.log('handleComplete');
			//初始化游戏结束事件
			game.initGameOver();
			//停止产生Diamond
			game.initStopGenerateDiamond();
			//资源加载完成后，调用init函数
			game.gameView.reset();
            //对舞台的事件的监听以及猫位置的更新
			game.touchEventMng.init();

		}
		//进行加载资源
		game.initLoader(handleComplete);
	}

}).call(this, game, createjs);


//游戏入口
// ;(function(game){
// 	//判断全局的game对象是否存在
// 	if (game) {
// 		//调用start方法开始
// 		game.start();
// 	}else{
// 		throw "No game logic found.";
// 	}
// }).call(this, game);
var game = this.game || (this.game = {});
var jQuery = this.jQuery || $ || {};

;(function(game, $){
	var scene = game.scene = {
		node: {},
		setup: function(){},
		onShow: function(){},
		onHide: function(){},
		show: function(){
			this.node.removeClass('out');
			this.onShow();
		},
		hide: function(){
			this.node.addClass('out');
			this.onHide();
		}
	}

	var progressScene = game.progressScene = Object.create(scene);
	progressScene.node = $('#progress');

	var startScene = game.startScene = Object.create(scene);
	startScene.node = $('#startOver');
	startScene.setup = function(){
		var img = game.loader.getResult("prepare_background");
		var ratioW = game.setting.gameWidth / img.width, 
			ratioH = game.setting.gameHeight / img.height,
			size = ratioW > ratioH 
						? game.setting.gameWidth + "px auto"
						: "auto " + game.setting.gameHeight + 'px';
		this.node
			.find('.background')
			.css({
				'background-image': 'url(' + img.src+')',
				'background-size': size
				})
			.find('button.btn')
			.on('touchend', function(e){
				e.preventDefault();
				game.flow.startGame();
			})

	}
	

	var gameOverScene = game.gameOverScene = Object.create(scene);
	//TODO
	gameOverScene.node = $('#gameOver')
	gameOverScene.setup = function(){
		var img = game.loader.getResult("prepare_background");
		var ratioW = game.setting.gameWidth / img.width, 
			ratioH = game.setting.gameHeight / img.height,
			size = ratioW > ratioH 
						? game.setting.gameWidth + "px auto"
						: "auto " + game.setting.gameHeight + 'px';
		this.node
			.find('.background')
			.css({
				'background-image': 'url(' + img.src+')',
				'background-size': size
				})
			.find('button.btn')
			.on('touchend', function(e){
				e.preventDefault();
				console.log('gameover startgame')
				game.flow.startGame();
			})
	}
	gameOverScene.onShow = function(){
		var result,
			conclution = "";
		if (window.localStorage['timesUserPlayed'] < 3) {
			result = game.recorder.getResult()
			if (result.normalcoffeebean >= 100 && result.coffeebottle >= 10 && result.goldcoffeebean > 1) {
				window.localStorage['userWonFirstPrize'] = true;
				conclution = "<h1>恭喜您，获得</h1><p>精美礼品一份（价值200元）<br>请输入您的联系电话<br>方便我们和你取得联系</p><br><input class='inputArea' type='text'>"
			}else if (result.normalcoffeebean >= 100 && result.coffeebottle >= 5) {
				window.localStorage['userWonSecondPrize'] = true;
				conclution = "<h1>恭喜您，获得</h1><p>咖啡换购券一张<br>已存入您的微信卡包<br>您可以去世纪联华XX店兑换</p>"
			}else if (result.normalcoffeebean >= 100) {
				conclution = "<h1>恭喜您，获得</h1><p>+2元咖啡换购券一张<br>已存入您的微信卡包<br>您可以去世纪联华XX店兑换</p>";
			}else{
				conclution = "<h1>再玩一次！</h1>"
			}
		}else{
			result = game.recorder.getResult()
			if (result.normalcoffeebean >= 100 && result.coffeebottle >= 10 && result.goldcoffeebean > 1) {
				window.localStorage['userWonFirstPrize'] = true;
				conclution = "<h1>恭喜您，获得</h1><p>精美礼品一份（价值200元）<br>请输入您的联系电话<br>方便我们和你取得联系</p><br><input class='inputArea' type='text'>"
			}else if (result.normalcoffeebean >= 100 && result.coffeebottle >= 5) {
				window.localStorage['userWonSecondPrize'] = true;
				conclution = "<h1>恭喜您，获得</h1><p>咖啡换购券一张<br>已存入您的微信卡包<br>您可以去世纪联华XX店兑换</p>"
			}else if (result.normalcoffeebean >= 100) {
				conclution = "<h1>恭喜您，获得</h1><p>+2元咖啡换购券一张<br>已存入您的微信卡包<br>您可以去世纪联华XX店兑换</p>";
			}
            game.recorder.initRecorderPane();
			conclution += "<p>今天您已经玩过3次了<br>分享给好友可再获得<br>三次游戏机会</p>";
		}
		console.log('gameover Onshow' + conclution);
		conclution += "<br>";
		gameOverScene.node.find('#conclution').empty().append(conclution);
	}

}).call(this, game, jQuery)
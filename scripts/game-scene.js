var game = this.game || (this.game = {});
var createjs = this.createjs || {};
var jQuery = this.jQuery || $ || {};

(function(game, cjs, $){
	var gameScene = game.gameScene = Object.create(game.scene);
	gameScene.node = $('#startGame');
	gameScene.setup = function(){
		var img = game.loader.getResult("playing_background");
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
				});
		gameScene.setup = function(){};
	}
	gameScene.onShow = function(){
		console.log('onshow')
		//ajax回调函数里面调用
		//game.gameView.init();
		var nowTime = new Date()
		if (window.localStorage['userWonFirstPrize']) {
			game.algorithm.probablity.coffeebean_Gold = 0;
		};
		if (window.localStorage['userWonSecondPrize']) {
			game.algorithm.probablity.coffeebottle = 0;
		};

		if (window.localStorage['timestamp'] && game.helper.constructTime(nowTime) != window.localStorage['timestamp']) {
			window.localStorage['timesUserPlayed'] = 0;
		};

		if (!window.localStorage['timesUserPlayed'] || window.localStorage['timesUserPlayed'] === 0) {
			window.localStorage['timesUserPlayed'] = 1;
			window.localStorage['timestamp'] = game.helper.constructTime(nowTime);
			game.gameView.init();
		}else if(window.localStorage['timesUserPlayed'] <= 2){
			window.localStorage['timesUserPlayed'] ++;
			game.gameView.init();
		}else{
			console.log('togameover')
			game.flow.gameOver();
		}
		
	}
	gameScene.onHide = function(){
		console.log('onhide')
		game.eventHandler.reset();
		game.dropCache.reset();
	}


}).call(this, game, createjs, jQuery)
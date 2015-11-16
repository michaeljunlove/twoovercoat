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
		game.gameView.init();
	}
	gameScene.onHide = function(){
		console.log('onhide')
		game.eventHandler.reset();
		game.dropCache.reset();
	}


}).call(this, game, createjs, jQuery)
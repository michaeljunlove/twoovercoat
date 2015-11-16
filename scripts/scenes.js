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
		gameOverScene.setup = function(){};
	}

}).call(this, game, jQuery)
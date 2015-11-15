var game = this.game || (this.game = {});
var createjs = createjs || {};

;(function(game, cjs){
	game.helper = game.helper || {};
	game.helper.resizeCanvas = function(){
		game.canvas.width = window.innerWidth;
		game.canvas.height = window.innerHeight;
	};

	(game.helper.stopGenerateDiamondEvent = function(){
		cjs.Event.call(this, 'stopGenerateDiamondEvent', true, true);
	}).prototype = Object.create(cjs.Event.prototype);

	(game.helper.gameOverEvent = function(score){
		cjs.Event.call(this, 'gameOverEvent', true, true);
		this.set({
			score: score
		});
	}).prototype = Object.create(cjs.Event.prototype);
    
}).call(this, game, createjs);
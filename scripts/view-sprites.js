var game = this.game || (this.game ={});
var createjs = createjs || {};

;(function(game, cjs){
	
	// (game.sycee = function(){
	// 	cjs.Bitmap.call(this, 'imgs/money.png');
	// 	this.x = 0;
	// 	this.y = 0;

	// }).prototype = Object.create(cjs.Bitmap.prototype);

	(game.cup = function(){
		cjs.Bitmap.call(this, game.loader.getResult("coffeecup"));
		this.scaleX = this.scaleY = 0.8;
	}).prototype = Object.create(cjs.Bitmap.prototype);

	(game.coffeebottle = function(){
		cjs.Bitmap.call(this, game.loader.getResult('coffeebottle'));
		this.data = {
			type: 'scorebar_coffeebottle'
		}
	}).prototype = Object.create(cjs.Bitmap.prototype);

	(game.coffeebean_A = function(){
		cjs.Bitmap.call(this, game.loader.getResult('normal001_coffeebean'));
		this.data = {
			type: 'scorebar_normalcoffeebean'
		}
	}).prototype = Object.create(cjs.Bitmap.prototype);

	(game.coffeebean_B = function(){
		cjs.Bitmap.call(this, game.loader.getResult('normal002_coffeebean'));
		this.data = {
			type: 'scorebar_normalcoffeebean'
		}
	}).prototype = Object.create(cjs.Bitmap.prototype);

	(game.coffeebean_C = function(){
		cjs.Bitmap.call(this, game.loader.getResult('normal003_coffeebean'));
		this.data = {
			type: 'scorebar_normalcoffeebean'
		}
	}).prototype = Object.create(cjs.Bitmap.prototype);

	(game.coffeebean_D = function(){
		cjs.Bitmap.call(this, game.loader.getResult('normal004_coffeebean'));
		this.data = {
			type: 'scorebar_normalcoffeebean'
		}
	}).prototype = Object.create(cjs.Bitmap.prototype);

	(game.coffeebean_Gold = function(){
		cjs.Bitmap.call(this, game.loader.getResult('gold_coffeebean'));
		this.data = {
			type: 'scorebar_goldcoffeebean'
		}
	}).prototype = Object.create(cjs.Bitmap.prototype);

}).call(this, game, createjs)
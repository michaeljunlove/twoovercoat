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

	(game.clock = function(){
		cjs.Container.call(this);
		var text = new cjs.Text('00:00', "20px Impact", "#f49f3e");
		text.textBaseline = 'middle';
		text.x = 0;
		text.y = 24.5;

		this.addChild(text);
		this.x = game.setting.gameWidth - 80;
		this.y = 50;
		//http://localhost:8080/game/catchMoney/index.html

		this.showTime = function(timeSpan){
			//得到当前的时间
			var now = new Date(game.setting.timeLimit * 1000 - timeSpan), 
				nowSecond = now.getSeconds(),
				nowMillionSecond = (now.getMilliseconds() / 10).toFixed(0);

			str = (nowSecond / 10 > 1)? nowSecond + '': '0'+ nowSecond;
      		str += ':'
      		str += (nowMillionSecond / 10 > 1)? nowMillionSecond + '': '0' + nowMillionSecond;
			//更新计时器的内容
			text.text = str;
		}
	}).prototype = Object.create(cjs.Container.prototype);

}).call(this, game, createjs)
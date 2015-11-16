var game = this.game || (this.game = {});

(function(game){
	game.algorithm = {
		probablity:{
			coffeebean_A: 0.2,
			coffeebean_B: 0.4,
			coffeebean_C: 0.6,
			coffeebean_D: 0.8,
			coffeebottle: 0.99,
			coffeebean_Gold: 1
		},
		getTempThing: function(){
			var prop = game.algorithm.probablity;
			var rand = Math.random();
			for(var obj in prop){
				if (prop[obj] > rand ) {
					return obj;
				};
			}
		}
	}
}).call(this, game)
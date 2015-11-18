var game = this.game || (this.game = {});

;(function(){
	game.helper = game.helper || {};
	game.helper.resizeCanvas = function(){
		game.canvas.width = window.innerWidth;
		game.canvas.height = window.innerHeight;
	}
	game.helper.getProperBG = function(){
		//640*960 640*1136 750*1334 1242*2208 
		console.log(game.setting.gameWidth, game.setting.gameHeight)
		if (game.setting.gameWidth <= 320 && game.setting.gameHeight <= 480){
			return "640x960";
		}
		if (game.setting.gameWidth <= 375 && game.setting.gameHeight <= 568){
			return "640x1136";
		}
		if (game.setting.gameWidth <= 375 && game.setting.gameHeight <= 627){
			return "750x1334";
		}
		return "1242x2208";
	}
	game.helper.collsionDetect = function(A, B){
		var t1 = A.y;
        var l1 = A.x;
        var r1 = A.x + A.image.width * A.scaleX;
        var b1 = A.y + A.image.height* A.scaleY;

        var t2 = B.y
        var l2 = B.x; 
        var r2 = B.x + B.image.width * B.scaleX;
        var b2 = B.y + B.image.height* B.scaleX;
        if (b1<t2 || l1>r2 || t1>b2 || r1<l2) return false;
        else return true;
	}
})();
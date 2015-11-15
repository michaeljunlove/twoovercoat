var game = this.game || (this.game ={});
var createjs = createjs || {};

;(function(game, cjs){
	
	(game.sycee = function(){
		cjs.Bitmap.call(this, game.loader.getResult("money"));
		this.x = 0;
		this.y = 0;
		this.scaleX = 0.2;
		this.scaleY = 0.2;
	}).prototype = Object.create(cjs.Bitmap.prototype);

	(game.diamond = function(){
		cjs.Container.call(this);
		var data = {
			framerate: 16,
			images: [game.loader.getResult("diamond")],
			frames: {width: 90, height:90}
		}
		var spritesheet = new cjs.SpriteSheet(data);
		var diamondSprite = new cjs.Sprite(spritesheet);
		diamondSprite.gotoAndPlay(0);
		//diamondSprite.framerate = 20;
		diamondSprite.scaleX = diamondSprite.scaleY = 0.5;
		this.addChild(diamondSprite);
	}).prototype = Object.create(cjs.Container.prototype);

	(game.diamondBoard = function(){
		cjs.Container.call(this);
		//loader是加载资源的管理器，在game.js中的initLoader定义的，getResult是根据id值来获取的。
		var background =  new cjs.Bitmap(game.loader.getResult("diamondsBoard"));
		//设置background的X坐标
		background.x = 0;
		//设置background的y坐标
		background.y = 0;
		var text = new cjs.Text("0", "20px Impact", "#000");
		text.textBaseline = 'middle';
		text.x = background.getBounds().width / 2 + 25;
		text.y = background.getBounds().height / 2;
		console.log(text.x, text.y);
		text.textAlign = 'center';
		this.addChild(background);
		this.addChild(text);
		this.x = 10;
		this.y = 10;

		this.addNumberText = function(){
			text.text = parseInt(text.text) + 1;
		}
		this.getNumberText = function(){
			return parseInt(text.text);
		}
	}).prototype = Object.create(cjs.Container.prototype);

	(game.clock = function(){
		cjs.Container.call(this);
		var clockPic = new cjs.Bitmap(game.loader.getResult('clock'));
		clockPic.x = 50;
		clockPic.y = 10;
		var text = new cjs.Text('00:00', "20px Impact", "#000");
		text.textBaseline = 'middle';
		text.x = 0;
		text.y = 24.5;

		this.addChild(clockPic);
		this.addChild(text);
		this.x = game.setting.gameWidth - 80;
		this.y = 10;
		//http://localhost:8080/game/catchMoney/index.html

		this.showTime = function(timeSpan){
			//得到当前的时间
			var now = new Date(timeSpan),delta = 1000/60;
			    //初始化计时器要显示的时间
			   
		    var str ;
		    if(game.setting.gameTimeout<10){
		    	str= '0'+game.setting.gameTimeout+':00';
		    }else{
		    	str= game.setting.gameTimeout+':00';
		    }
				
			//用来保存时间的副本
		    var temp=game.setting.gameTimeout;
            //得到相对于now的毫秒数
			var millionSecond = Math.floor(now.getMilliseconds() / delta);
			//得到当前过了几秒
			var second=Math.floor(now.getSeconds());
			

			temp=game.setting.gameTimeout-second;
			if(temp==game.setting.gameTimeout){
				if(game.setting.gameTimeout<10){
		    	    str= '0'+parseInt(game.setting.gameTimeout-second)+':00';
		        }else{
		    	    str= parseInt(game.setting.gameTimeout-second)+':00';
		        }       
			}else{
				if(game.setting.gameTimeout<10){
		    	    str='0'+parseInt(game.setting.gameTimeout-second)+':'+parseInt(59-millionSecond);
		        }else{
		    	    str=parseInt(game.setting.gameTimeout-second)+':'+parseInt(59-millionSecond);
		        }   
				
				
			}
            

			//到时间了
			if (second === game.setting.gameTimeout) {
				console.log('timeout')
				this.dispatchEvent(new game.helper.stopGenerateDiamondEvent());
				str = '00:00';
				text.text = str;
				return;
			};
           

			
			//更新计时器的内容
			text.text = str;

		}
	}).prototype = Object.create(cjs.Container.prototype);


	
    //生成猫
	(game.cat = function(){
		cjs.Bitmap.call(this, game.loader.getResult("cat"));		
		this.scaleX = 0.5;
		this.scaleY = 0.5;
		this.movespeed=500;
		this.x = game.setting.gameWidth/2-this.getBounds().width*this.scaleX/2;
		this.y = game.setting.gameHeight- this.getBounds().height*this.scaleX;


	}).prototype = Object.create(cjs.Bitmap.prototype);
	
}).call(this, game, createjs)
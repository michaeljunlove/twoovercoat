var game = this.game || (this.game = {});
//对不起我把原有的代码换成了小白版本...by inkhk
window.onload = function() {
            var button = document.getElementById('start-btn');
            button.onclick = function(e) {
                document.getElementById('gamebg').style.display = 'none';
                document.getElementById('canvas').style.display = 'block';
                game.start();
            }
}

//onorientationchange : 在每次屏幕方向在横竖屏间切换后，就会触发这个window事件
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
//判断手机横竖屏状态：
function hengshuping(event){
  if(window.orientation==180||window.orientation==0){
       //alert("竖屏状态！")       
   }
  if(window.orientation==90||window.orientation==-90){
  	   //alert("横屏状态！");

  	   //跟新游戏的宽度和高度
  	   game.setting.gameWidth=window.innerWidth;
  	   game.setting.gameHeight=window.innerHeight;
  	   game.helper.resizeCanvas();
    }
 }

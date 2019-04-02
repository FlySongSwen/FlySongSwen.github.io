var can1;
var ctx1;              //block,data

var can2;           
var ctx2;              //ball,addMinus

var canWidth;
var canHeight;

var lastTime=0;            //上一帧的时间
var deltaTime=0;          //两帧之间的时间差

var mx;         //鼠标位置
var my;         //鼠标位置

var Circle_X= 800;
var Circle_Y= 600;             //圆心的坐标
var RADIUS = 300;



var ball;
var ballCount;

var colors = ["#990000","#0099CC","#99CC00","#AA66CC","#9933CC","#669900","#FFBB33"]
var blocks;               //记录点的位置

var data;
var addMinus;

window.requestAnimFrame = (function() {            //requestAnimFrame的兼容性适配
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();                   

document.body.onload = game;
function game() {
    init();
    gameloop();
}

function init() {
    can1=document.getElementById("canvas1");
    ctx1=can1.getContext("2d");

    can2=document.getElementById("canvas2");
    ctx2=can2.getContext("2d");

    canWidth = can1.width;
    canHeight = can1.height;

                
    mx = Circle_X;
    my = Circle_Y;
    blocks = new blockObj();
    blocks.init();

    ball = new ballObj();
    ball.init();
    ballCount = 0;

    data = new dataObj();

    addMinus = new addMinusObj();
    addMinus.init();
    

    can2.addEventListener("mousemove",onMouseMove,false);
    can2.addEventListener("click",onClick,false);
}

function gameloop() {
    window.requestAnimFrame (gameloop);    //setInterval, setTimeout
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;

    blocks.draw ();
    ball.draw ();
    data.draw ();
    addMinus.draw();
    //preset();

    collision();
    killBall();
}

function preset () {
    ctx1.save();
    ctx1.fillStyle = ball.color[ballCount];
    ctx1.fillRect(80,80,90,30);
    ctx1.restore();     
}


function onMouseMove (e)            
{
   if (e.offsetX || e.layerX)
    {
        mx = e.offSetX == undefined ? e.layerX : e.offSetX; //判断e.offsetX是否存在？在赋值给mx，不在e.layerX赋值给mx
        my = e.offSetY == undefined ? e.layerY : e.offSetY;
        //console.log("(" + mx +"," + my + ")");
    }
}

function onClick () {

    var distance = Math.pow((mx - Circle_X),2) + Math.pow((my - Circle_Y), 2);
    if ( distance > Math.pow((RADIUS + 5 *ball.radius), 2) ) {
        ball.x[ballCount] = mx;
        ball.y[ballCount] = my;
        ball.ratio[ballCount] = 10;
        ball.vectorX[ballCount] =  (Circle_X - mx) / Math.sqrt(distance) ;
        ball.vectorY[ballCount] =  (Circle_Y - my) / Math.sqrt(distance) ;
        ball.color[(ballCount + 1) % ball.num] = colors[Math.floor( Math.random() * 6.99)];//确定下一球个颜色
        ball.alive[ballCount] = true;
        
        //console.log("ballCount:" + ballCount + "  ratio" + ball.ratio[ballCount]);
        // console.log("(" + ball.x[ballCount] +"," + ball.y[ballCount] + ")");
        //console.log("vector:" + "(" + ball.vectorX[ballCount] +"," + ball.vectorY[ballCount] + ")");
        // console.log(ball.alive[ballCount]);
        ballCount = (ballCount + 1) % ball.num;
    }

    
}

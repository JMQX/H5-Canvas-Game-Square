var can1;
var can2;
var ctx1;
var ctx2;
var canWidth=820;
var canHeight=640;
var maxHeight=window.innerHeight;
var maxWidth=window.innerWidth;

var beginGame;
var gameOver;


var backrgound;
var squares;
var mySquare;

var beginAnim;			//开始界面动画

var lastTime;
var changeColorTime;
var changeTimeArrays=["10","9","8","7","6","5","4","3","2","1","color change!"];
var changeColorindex=0;
var totalSpeed=3;

var isStep;

var colorChangeTimeW=0;

var score;

document.body.onload=game;


function game(){
	init();
	loop=setInterval(gameloop,20);
}
function init(){
	score=0;
	beginGame=false;
	gameOver=false;
	isStep=false;
	
	lastTime=Date.now();
	
	can1=document.getElementById("myCanvas1");
	ctx1=can1.getContext("2d");
	can2=document.getElementById("myCanvas2");
	ctx2=can2.getContext("2d");
	if(maxWidth!=canWidth){
		canWidth=maxWidth;
	}
	if(maxHeight!=canHeight){
		canHeight=maxHeight;
	}
	document.getElementById("main_box").style.width=canWidth+'px';
	document.getElementById("main_box").style.height=canHeight+'px';
	
	can1.width=canWidth;
	can2.width=canWidth;
	can1.height=canHeight;
	can2.height=canHeight;
	
	$("#game_title").slideDown(500);
	$("#login_btn").delay(500).slideToggle(500);
	
	colorChangeTimeW=(canHeight>canWidth?canWidth:canHeight)*0.5;
	$("#colorChangeTime_div").css("width",colorChangeTimeW*1.6);
	$("#colorChangeTime_div").css("height",colorChangeTimeW*0.5);
	$("#colorChangeTime_div").css("margin-left",-colorChangeTimeW*0.8);
	$("#colorChangeTime_div").css("line-height",colorChangeTimeW*0.5+"px");
	$("#colorChangeTime_div").css("font-size",colorChangeTimeW*0.3+"px");
	
	backrgound=new backgroundObj();
	backrgound.init();
	
	squares=new squareObj();
	squares.init();
	
	mySquare=new mySquareObj();
	mySquare.init();
	
	beginAnim=new beginAnimObj();
	beginAnim.init();
	
}
function restart(){
	backrgound.init();
	squares.init();
	mySquare.init();
	lastTime=Date.now();
	$("#state").hide();
	$("#game_title").hide();
	$("#login_btn").hide();
	$("#score").show();
	score=0;
	totalSpeed=3;
}
function gameloop(){
		backrgound.draw();
		ctx2.clearRect(0,0,canWidth,canHeight);
		ctx2.save();
		if(beginAnim.isLive&&Date.now()-lastTime>1000){
			beginAnim.draw();
		}
		
		if(beginGame&&!gameOver){	
			$("#score").html("得分:"+Math.floor(score));
			addSpeed();
			squares.draw();
			mySquare.draw();
			squaresToMy();
			$("#main_box").click(function(){
				mySquare.jump();
			});
		}
		else if(gameOver&&!beginGame){
		
		}	
		ctx2.restore();
}
function loginGame(){
	changeColorTime=Date.now();
	$("#colorChangeTime_div").show();
	$("#colorChangeTime_div").css("color",squareColor[Math.floor(Math.random()*squareColor.length)]);
	$("#colorChangeTime_div").html(""+changeTimeArrays[changeColorindex]);
	if(!gameOver&&!beginGame){
		$("#score").show();
		$("#game_title").hide();
		$("#square_main").hide();
		beginGame=true;
		$("#login_btn").hide();
	}
	else if(gameOver&&!beginGame){
		restart();
		gameOver=false;
		beginGame=true;
	}
	beginAnim.isLive=false;
	$("#square_main").hide();
}
function addSpeed(){
	totalSpeed+=0.04*0.05;
	score+=0.04;
}
function squaresToMy(){
	for(var i=0;i<squares.num;i++){
		if(squares.isLive[i]){
			if(squares.color[i]!=mySquare.color){
				if(mySquare.isLive){
					if(((mySquare.x+mySquare.l-1>squares.x[i]&&mySquare.x+mySquare.l-1<squares.x[i]+squares.w[i]
						&&mySquare.x+mySquare.l-30>squares.x[i]&&mySquare.x+mySquare.l-30<squares.x[i]+squares.w[i]
						)||(mySquare.x>squares.x[i]&&mySquare.x+10<squares.x[i]+squares.w[i]
						&&mySquare.x+10>squares.x[i]&&mySquare.x+10<squares.x[i]+squares.w[i]))
						&&(mySquare.y+mySquare.l>squares.y[i]&&mySquare.y+mySquare.l<squares.y[i]+squares.h[i])){
						mySquare.y=squares.y[i]-mySquare.l;
						mySquare.toVSpeed=-totalSpeed*0.2;
						mySquare.toDownSpeed=0;
						jump_count=0;
					}
					if(mySquare.x+mySquare.l>squares.x[i]&&mySquare.x+mySquare.l<squares.x[i]+squares.w[i]
						&&mySquare.y+mySquare.l>squares.y[i]&&mySquare.y+mySquare.l<squares.y[i]+squares.h[i]
						){
						mySquare.x=squares.x[i]-mySquare.l;
					}			
					
				}
			}	
		}
	}
}

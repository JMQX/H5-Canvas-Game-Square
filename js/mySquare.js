var mySquareObj=function(){
	this.x;
	this.y;
	this.isLive;	//生命状态
	this.l;     //正方形边长
	this.color;
	this.toDownSpeed;		//垂直方向速度
	this.toVSpeed;			//水平方向速度
}
var jump_count=0;
mySquareObj.prototype.init=function(){
	this.isLive=true;
	this.x=0;
	this.y=0;
	this.l=40;
	this.toDownSpeed=0;
	this.toVSpeed=0;
	this.color=squareColor[0];
}
mySquareObj.prototype.jump=function(){
	if(this.isLive){
		this.toDownSpeed=-15;
		this.toVSpeed=2;
		jump_count++;
		//alert(jump_count);
		if(this.x+this.l>canWidth){
			this.x=canWidth-this.l;
		}		
	 }
}
mySquareObj.prototype.toDown=function(){
	if(this.isLive){
		this.toDownSpeed+=9.8*1*0.06;
		this.y+=this.toDownSpeed;
		this.x+=this.toVSpeed;
		if(this.y+this.l>canHeight){
			this.isLive=false;
		}	
	}
}
mySquareObj.prototype.draw=function(){
	if(this.isLive){
		var now=Date.now();
		if(now-changeColorTime>1000){
			changeColorindex=(++changeColorindex)%changeTimeArrays.length;
			var strColor=""+squareColor[Math.floor(Math.random()*squareColor.length)];
			$("#colorChangeTime_div").css("color",strColor);
			$("#colorChangeTime_div").html(""+changeTimeArrays[changeColorindex]);
			if(changeColorindex==10){
				$("#colorChangeTime_div").css("font-size",colorChangeTimeW*0.15+"px");
				this.color=strColor;
			}else{
				$("#colorChangeTime_div").css("font-size",colorChangeTimeW*0.3+"px");
			}
			changeColorTime=now;
		}
		ctx2.fillStyle=this.color+"";
		//ctx2.rotate(45);
		ctx2.rect(this.x,this.y,this.l,this.l);
		ctx2.fill();
		ctx2.lineWidth=3;
		ctx2.radiusX=3;
		
		ctx2.strokeStyle="#ffffff";
		ctx2.stroke();
		if(this.x<-100){
			this.isLive=false;
		}
	}else{
		restartInit();
	}
	this.toDown();
}
function restartInit(){
			AnimPX=new Array();
			AnimPY=new Array();
			changeColorindex=0;
			jump_count=0;
			$("#colorChangeTime_div").hide();
			beginAnim.init();
			beginGame=false;
			gameOver=true;
			lastTime=Date.now();
			$("#game_title").html("方&nbsp;块&nbsp;跳&nbsp;跃");
			$("#score").hide();
			$("#game_title").slideDown(500);
			$("#login_btn").delay(500).slideToggle(500);
			$("#login_btn").html("再来一次");
			$("#state").show();
			$("#state").delay(500).slideDown(500);
			$("#state").html("游戏结束，得分："+Math.floor(score));
}

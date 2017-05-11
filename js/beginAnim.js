var beginAnimObj=function(){
	this.x;
	this.y;
	this.isLive;
	this.l;     //正方形边长
	this.color;
	this.toDownSpeed;		//垂直方向速度
	this.toVSpeed;			//水平方向速度
}
var AnimPX=new Array();
var AnimPY=new Array();
beginAnimObj.prototype.init=function(){
	this.isLive=true;
	this.x=0;
	this.y=0;
	this.l=40;
	this.toDownSpeed=0;
	this.toVSpeed=canWidth*0.021;
	this.color=squareColor[0];
}
beginAnimObj.prototype.jump=function(){
	if(this.isLive){
		//$("#square_main").animate({rotaion:'360deg'});
		this.toDownSpeed=-this.toDownSpeed;
		this.toVSpeed=canWidth*0.021*0.5;
		jump_count++;
		if(this.x+this.l>canWidth){
			this.x=canWidth-this.l;
		}		
		this.x+=this.toVSpeed;
		if(this.toVSpeed+2<3){
			this.toVSpeed+=1;
		}	
	 }
}
beginAnimObj.prototype.toDown=function(){
	if(this.isLive){
		this.toDownSpeed+=9.8*1*0.06;
		this.y+=this.toDownSpeed;
		this.x+=this.toVSpeed;
		if(this.y>canHeight){
			this.isLive=false;
		}
		
	}	
}
beginAnimObj.prototype.draw=function(){
	if(this.isLive){
		$("#square_main").show();
		$("#square_main").css("left",this.x);
//		var color=squareColor[Math.floor(Math.random()*squareColor.length)];
//		$("#square_main").css("background",color);
//		AnimPX.push(this.x);
//		AnimPY.push(this.y);
		$("#square_main").css("top",this.y);
		if(this.y+this.l>canHeight*0.35&&this.x+this.l*0.5<canWidth*0.5+120&&this.x+this.l*0.5>canWidth*0.5-120){
			this.jump();
			$("#game_title").html("方&nbsp;块&nbsp;<i style='font-size: 46px;color:#FF6688;'>跳&nbsp;</i>跃");
		}
//		ctx2.clearRect(0,0,canWidth,canHeight);
//		ctx2.save();
//		ctx2.beginPath();
//		var grd=ctx2.createLinearGradient(200,0,370,200);
//		grd.addColorStop(0,"#FF6688");
//		grd.addColorStop(1,"#ffffff");
//		ctx2.strokeStyle=grd;
//		ctx2.lineWidth=15;
//		ctx2.moveTo(0,0);
//		for(var i=0;i<AnimPX.length;i++){
//			ctx2.lineTo(AnimPX[i],AnimPY[i]);
//		}
//		ctx2.stroke();
//		ctx2.closePath();
		ctx2.restore();
		this.toDown();
	}else{
		$("#square_main").hide();
	}
	
}
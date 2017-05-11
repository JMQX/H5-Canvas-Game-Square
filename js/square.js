var squareColor=["#FF6688","#00FF00","#3399FF","#FFDAB9","blueviolet"];
var repeatColor_count=0;
var squareObj=function(){
	this.x=[];
	this.y=[];
	this.w=[];
	this.h=[];
	this.color=[];
	this.isLive=[];
}
squareObj.prototype.num=12;
squareObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.color[i]=squareColor[Math.floor(Math.random()*squareColor.length)];
		if(i==0){
			this.x[i]=0;
			if(this.color[i]==this.color[this.num-1]){
				repeatColor_count++;
			}else{
				repeatColor_count=0;
			}
			if(repeatColor_count>1){
			this.color[i]=squareColor[squareColor.indexOf(this.color[this.num-1])-1];
			}
		}else{
			this.x[i]=this.x[i-1]+this.w[i-1]+1;
			if(this.color[i]==this.color[i-1]){
				repeatColor_count++;
			}else{
				repeatColor_count=0;
			}
			if(repeatColor_count>1){
			this.color[i]=squareColor[squareColor.indexOf(this.color[i])+1];
			}
		}
		this.h[i]=canHeight*0.3+canHeight*0.25*Math.random();
		this.w[i]=canWidth*0.15+canWidth*0.06*Math.random();
		this.y[i]=canHeight-this.h[i];	
		this.isLive[i]=true;
	}
	
}
squareObj.prototype.squareBorn=function(i){
		var maxX=0;
		var maxI=0;
		for(var i=0;i<this.num;i++){
			if(this.x[i]>maxX){
				maxX=this.x[i];
				maxI=i;
			}
		}
		for(var i=0;i<this.num;i++){
			if(!this.isLive[i]){
				if(i==0&&this.isLive[this.num-1]){
					this.x[i]=this.x[maxI]+this.w[maxI]+1;
					this.h[i]=canHeight*0.25+canHeight*0.35*Math.random();
					this.w[i]=canWidth*0.14+canWidth*0.1*Math.random();
					this.y[i]=canHeight-this.h[i];
					this.color[i]=squareColor[Math.floor(Math.random()*3)];
					if(this.color[i]==this.color[this.num-1]){
						repeatColor_count++;
					}else{
						repeatColor_count=0;
					}
					if(repeatColor_count>1){
					this.color[i]=squareColor[squareColor.indexOf(this.color[this.num-1])-1];
					}
					this.isLive[i]=true;
				}else if(i>0&&this.isLive[i-1]){
					this.x[i]=this.x[maxI]+this.w[maxI]+1;
					this.h[i]=canHeight*0.25+canHeight*0.35*Math.random();
					this.w[i]=canWidth*0.14+canWidth*0.1*Math.random();
					this.y[i]=canHeight-this.h[i];
					this.color[i]=squareColor[Math.floor(Math.random()*3)];
					if(this.color[i]==this.color[i-1]){
						repeatColor_count++;
					}else{
						repeatColor_count=0;
					}
					if(repeatColor_count>1){
					this.color[i]=squareColor[squareColor.indexOf(this.color[i])+1];
					}
					this.isLive[i]=true;
				}
				return;
			}
		}
}
squareObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){	
		if(this.isLive[i]){
			ctx2.fillStyle=this.color[i]+"";
			ctx2.beginPath();
			ctx2.fillRect(this.x[i],this.y[i],this.w[i],this.h[i]);
			ctx2.fill();
			ctx2.closePath();
			this.x[i]-=totalSpeed;
		}
		if(this.x[i]+this.w[i]<0){
			this.isLive[i]=false;
		}
	}
	this.squareBorn();
}

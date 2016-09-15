function getWidth() {
  if (self.innerHeight) {
    return self.innerWidth;
  }

  if (document.documentElement && document.documentElement.clientWidth) {
    return document.documentElement.clientWidth;
  }

  if (document.body) {
    return document.body.clientWidth;
  }
}
function getHeight() {
  if (self.innerHeight) {
    return self.innerHeight;
  }
  if (document.documentElement && document.documentElement.clientHeight) {
    return document.documentElement.clientHeight;
  }
  if (document.body) {
    return document.body.clientHeight;
  }
}
var WIDTH=getWidth(), HEIGHT = getHeight(), pi=Math.PI;

ball = {
	x:1,
	y:1,
	
	vel: {x: 9, y: 7},
	side:20,
	startspeed:9,
	speed: 9,
	speedMult:0.5,
	
	
	update:function(){
		window.addEventListener("deviceorientation", handleOrientation, true);
		function handleOrientation(e){
			this.vel.x = e.gamma;	
			this.vel.y = e.beta;	
		}
		this.x += this.vel.x;
		this.y += this.vel.y;
		
		if( 0 > this.y || this.y+this.side > HEIGHT){ // slår i taket eller golvet
			var offset = this.vel.y < 0 ? 0- this.y : HEIGHT - (this.y+this.side);
			this.y += 2*offset;
			this.vel.y *= -1;
			
			
			/*this.vel.y += this.speedMult;
			this.speedMult *= this.speedMult; 
			console.log(this.speedMult);*/
			
		}
		if( 0 > this.x || this.x+this.side > WIDTH){ // slår i taket eller golvet
			var offset = this.vel.x < 0 ? 0- this.x : WIDTH - (this.x+this.side);
			this.x += 2*offset;
			this.vel.x *= -1;
			
			
			/*this.vel.y += this.speedMult;
			this.speedMult *= this.speedMult; 
			console.log(this.speedMult);*/
			
		}
		
		var AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh){ // kolitions test
			return ax < bx+bw && ay < by+bh && bx < ax+aw && by < ay+ah;
		};
		 


	},
	draw:function(){
		//ctx.fillRect(this.x, this.y, this.side, this.side);
		ctx.beginPath();
        ctx.arc(this.x+(this.side/2), this.y+(this.side/2), this.side/2, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#000';
        ctx.fill();
	}
	
}


function update() {
	ball.update();
}
function draw() {

	//paint the canvas white before drawing the ball
	ctx.fillStyle = "#FFF"; 
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	//Draw ball
	ctx.save();
	ball.draw();

	

	ctx.restore();
	
}




function main() {
	canvas = document.createElement("canvas");
	canvas.width = WIDTH;
	canvas.height= HEIGHT;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	
	
	//init();
	var loop = function(){
		update();
		draw();
		
		window.requestAnimationFrame(loop, canvas);
	};
	window.requestAnimationFrame(loop, canvas);
}
main();
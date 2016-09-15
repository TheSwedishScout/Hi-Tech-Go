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
var upArrow = 38, downArrow= 40;
var aKey = 65, zKey= 90;
var canvas, ctx, keystate;
var player, ai, ball;

player = {
	x:null,
	y:null,
	wictorys:0,
	width:20,
	height:100,
	playerSpeed: HEIGHT*0.005,
	
	update:function(){
		if(keystate[aKey]) this.y -= this.playerSpeed;
		if(keystate[zKey]) this.y += this.playerSpeed;
		this.y = Math.max(Math.min(this.y, HEIGHT- this.height), 0);
	},
	draw:function(){
		ctx.fillRect(this.x, this.y, this.width/2, this.height);
		ctx.beginPath();
        ctx.ellipse(this.x+(this.width/2), this.y+(this.height/2), 50, 10, 90 * Math.PI/180, 0, 2 * Math.PI);
        ctx.fill();
	}
	
}
ai = {
	x:null,
	y:null,
	wictorys:0,
	width:20,
	height:100,
	playerSpeed: HEIGHT*0.005,
	
	update:function(){
		if(keystate[upArrow]) this.y -= this.playerSpeed;
		if(keystate[downArrow]) this.y += this.playerSpeed;
		this.y = Math.max(Math.min(this.y, HEIGHT- this.height), 0);
	},
	draw:function(){
		ctx.fillRect(this.x+(this.width/2), this.y, this.width/2, this.height);
		ctx.beginPath();
        ctx.ellipse(this.x+(this.width/2), this.y+(this.height/2), this.height/2, this.width/2, 90 *pi/180, 0, 2 * pi);
        ctx.fill();
	}
	
}
ball = {
	x:null,
	y:null,
	
	vel: null,
	side:20,
	startspeed:9,
	speed: 9,
	speedMult:0.5,
	
	
	update:function(){
		this.x += this.vel.x;
		this.y += this.vel.y;
		
		if( 0 > this.y || this.y+this.side > HEIGHT){ // slår i taket eller golvet
			var offset = this.vel.y < 0 ? 0- this.y : HEIGHT - (this.y+this.side);
			this.y += 2*offset;
			this.vel.y *= -1;
			this.speed += this.speedMult;
			
			/*this.vel.y += this.speedMult;
			this.speedMult *= this.speedMult; 
			console.log(this.speedMult);*/
			
		}
		
		var AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh){ // kolitions test
			return ax < bx+bw && ay < by+bh && bx < ax+aw && by < ay+ah;
		};
		var pdle = this.vel.x < 0 ? player : ai; 
		if (AABBIntersect(pdle.x, pdle.y, pdle.width, pdle.height, this.x, this.y, this.side, this.side)){ // studs på spelare
			this.x = pdle===player ? player.x+player.width : ai.x- this.side;
			var n = (this.y+this.side- pdle.y)/(pdle.height+this.side);
			var phi = 0.25*pi* (2*n - 1);
			this.vel.x = (pdle === player ? 1 : -1)* this.speed*Math.cos(phi);
			this.vel.y = this.speed*Math.sin(phi);
		    this.speed += this.speedMult;
			pdle.playerSpeed += 0.5;
			
			//console.log(this.speed);
		}
		if (0 > this.x+this.side || this.x > WIDTH){ // servar
			if(this.x > WIDTH){
				player.wictorys ++;
			}else{
				ai.wictorys++;
			}
			
			ball.x = (WIDTH - ball.side)/2;
			ball.y = (HEIGHT - ball.side)/2;
			this.speed = this.startspeed;
			player.playerSpeed= 10;
			ai.playerSpeed= 10;
			
			ball.vel = {
				x: (pdle === player ? 1 : -1)*this.speed,
				y: 0
			}
			
		}
	},
	draw:function(){
		//ctx.fillRect(this.x, this.y, this.side, this.side);
		ctx.beginPath();
        ctx.arc(this.x+(this.side/2), this.y+(this.side/2), this.side/2, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#fff';
        ctx.fill();
	}
	
}

function main() {
	canvas = document.createElement("canvas");
	canvas.width = WIDTH;
	canvas.height= HEIGHT;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	
	keystate = {};
	document.addEventListener("keydown", function(evt){
		keystate[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function(evt){
		delete keystate[evt.keyCode];
	});
	
	init();
	var loop = function(){
		update();
		draw();
		
		window.requestAnimationFrame(loop, canvas);
	};
	window.requestAnimationFrame(loop, canvas);
}
function init() {
	player.x = player.width;
	player.y = (HEIGHT - player.height)/2;
	
	ai.x = WIDTH - (player.width + ai.width);
	ai.y = (HEIGHT - ai.height)/2;
	
	ball.x = (WIDTH - ball.side)/2;
	ball.y = (HEIGHT - ball.side)/2;
	
	ball.vel = {
		
		x: ball.speed,
		y: 0
	}
}
function update() {
	ball.update();
	player.update();
	ai.update();
}
function draw() {
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	
	ctx.save();
	ctx.fillStyle = "#fff";
	
	ball.draw();
	player.draw();
	ai.draw();
	ctx.font = "120px minecraft";
	ctx.textAlign="center";
	ctx.fillText(ball.speed, WIDTH/2, (HEIGHT+120)/2);
	ctx.textAlign="left";
	ctx.font = "60px minecraft";
	ctx.fillText(player.wictorys+"p", 80, (HEIGHT+60)/2);
	ctx.fillText("Player 1", 80, 100);
	
	ctx.textAlign="right";
	ctx.fillText(ai.wictorys+"p", WIDTH-120, (HEIGHT+60)/2);
	ctx.fillText("Player 2", WIDTH-120, 100);
	
	var w = 4;
	var x = (WIDTH - w)*0.5;
	var y = 0;
	var step = HEIGHT/30;
	while (y < HEIGHT){
		ctx.fillRect(x, y+step*0.25, w, step*0.5);
		y += step;
	}
	
	
	ctx.restore();

}
main()




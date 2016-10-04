/*---------------------------------------
|---_____----------__--__-______--_____--|
|--/ ____|---/\---|  \/  |  ____|/ ____|-|
|-| |-------/  \--| \  / | |__  | (___---|
|-| |-|_ |-/ /\ \-| |\/| |  __|--\___ \--|
|-| |__| |/ ____ \| |--| | |____-____) |-|
|--\_____/_/----\_\_|--|_|______|_____/--|
----------------------------------------*/
var game = document.getElementById('game');
function akademin() {
    debugger;
}

function biblan(id) {
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

    var ctx, WIDTH, HEIGHT, canvas, compleated;
    compleated = false;
    
    if (getWidth() < getHeight()) {
        WIDTH = getWidth();
        HEIGHT = getWidth();
    } else {
        WIDTH = getHeight();
        HEIGHT = getHeight();
    }
    
    function finnish(){
        
        console.log("GOAL!");
        intressePungter[id].played = true;
        //Close canvas
        ctx.fillStyle ="#FFF";
        ctx.fillRect(0,0,WIDTH,HEIGHT);
        ctx.textAlign = "center";
        ctx.font = "48px serif";
        ctx.fillStyle = "yellow"
        ctx.fillText("Congratulation!", WIDTH/2, WIDTH/2);
        canvas.addEventListener("click", function(){
            canvas.parentNode.removeChild(canvas);
            myLocation();
        })
        //alert("help!");
        //canvas.parentNode.removeChild(canvas);
        //myLocation();
    }
    
    /*----------------------------------------------------||----||--------\\
    ||----------------------------------------------------||----||--------||
    ||-----------------------Seting upp the walls---------||____||--------||
    ||----------------------------------------------------||----||--------||
    \\----------------------------------------------------||----||--------*/


    var walls = [
        //Vertical walls
        {
            x: WIDTH * 0.14 - 10,
            y: 0,
            width: 20,
            height: HEIGHT * 0.9,

            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }, {
            x: WIDTH * 0.28 - 10,
            y: HEIGHT * 0.72,
            width: 20,
            height: HEIGHT * 0.28,

            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }, {
            x: WIDTH * 0.28 - 10,
            y: HEIGHT * 0.14,
            width: 20,
            height: HEIGHT * 0.28,

            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }, {
            x: WIDTH * 0.42 - 10,
            y: HEIGHT * 0.58,
            width: 20,
            height: HEIGHT * 0.28,

            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }, {
            x: WIDTH * 0.42 - 10,
            y: HEIGHT * 0.14,
            width: 20,
            height: HEIGHT * 0.28,

            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }, {
            x: WIDTH * 0.56 - 10,
            y: 0,
            width: 20,
            height: HEIGHT * 0.28,

            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }, {
            x: WIDTH * 0.56 - 10,
            y: HEIGHT * 0.42,
            width: 20,
            height: HEIGHT,

            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }, {
            x: WIDTH * 0.70 - 10,
            y: 0,
            width: 20,
            height: HEIGHT * 0.58,

            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }, {
            x: WIDTH * 0.70 - 10,
            y: HEIGHT * 0.72,
            width: 20,
            height: HEIGHT * 0.58,

            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }, {
            x: WIDTH * 0.84 - 10,
            y: HEIGHT * 0.42,
            width: 20,
            height: HEIGHT,

            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }, {
            x: WIDTH * 0.84 - 10,
            y: HEIGHT * 0.14,
            width: 20,
            height: HEIGHT * 0.14,

            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        },

        //Horizontal
        {
            x: WIDTH * 0.14 - 10,
            y: HEIGHT * 0.42,
            width: WIDTH * 0.14 + 20,
            height: 20,

            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);

            }
        }, {
            x: WIDTH * 0.42 - 10,
            y: HEIGHT * 0.42,
            width: WIDTH * 0.14 + 20,
            height: 20,

            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);

            }
        }, {
            x: WIDTH * 0.14 - 10,
            y: HEIGHT * 0.58,
            width: WIDTH * 0.28 + 10,
            height: 20,

            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);

            }
        }, {
            x: WIDTH * 0.70 - 10,
            y: HEIGHT * 0.28,
            width: WIDTH * 0.14 + 20,
            height: 20,

            draw: function() {
                ctx.fillRect(this.x, this.y, this.width, this.height);

            }
        }
    ];
    var imgGoal = new Image();
    imgGoal.src = "images/book.png";
    var good_point = {
        /*the goal or a point to go trow*/
        x: WIDTH*0.9,
        y: HEIGHT*0.9,
        width: WIDTH*0.1,
        height: HEIGHT*0.1,

        draw: function() {
            ctx.fillStyle = "#0F0";
            //ctx.fillRect(WIDTH-20, HEIGHT-20, 20, 20);
            
            ctx.drawImage(imgGoal, this.x, this.y, this.width, this.height);

        }
    };

    /*-------------------------------------------------------______------\\
    ||------------------------------------------------------/      \-----||
    ||-----------------------Seting upp the ball-----------|        |----||
    ||-----------------------------------------------------\        /----||
    \\------------------------------------------------------\______/-----*/
    var img = new Image();
    img.src = "images/hat.png";
    var ball = {
            x: 1,
            y: 1,

            vel: {
                x: 9,
                y: 7
            },
            side: 20,
            startspeed: 9,
            speed: 9,
            orientX: null,
            orientY: null,
            speedMult: 0.5,

            update: function() {
                this.vel.x = this.orientX;
                this.vel.y = this.orientY;


                this.x += this.vel.x;
                this.y += this.vel.y;

                if (0 > this.y || this.y + this.side > HEIGHT) { // slår i taket eller golvet
                    var offset = this.vel.y < 0 ? 0 - this.y : HEIGHT - (this.y + this.side);
                    this.y += offset;
                    this.vel.y = 0;


                    /*this.vel.y += this.speedMult;
                    this.speedMult *= this.speedMult; 
                    console.log(this.speedMult);*/

                }
                if (0 > this.x || this.x + this.side > WIDTH) { // slår i någon av sidorna
                    var offset = this.vel.x < 0 ? 0 - this.x : WIDTH - (this.x + this.side);
                    this.x += offset;
                    this.vel.x = 0;


                    /*this.vel.y += this.speedMult;
                    this.speedMult *= this.speedMult; 
                    console.log(this.speedMult);*/

                }
                if(this.x < good_point.x + good_point.width &&
                   this.x + this.side > good_point.x &&
                   this.y < good_point.y + good_point.height &&
                   this.side + this.y > good_point.y){
                    //good_point.x < this.x
                    compleated = true;
                    
                    
                }
                //box detection prioritize the longer side
                for (var i = 0; i < walls.length; i++) {
                    //trimma lite på siderna för att få sid kolitioner

                    if (walls[i].width > walls[i].height) {

                        //ball bottom collided with wall1 top
                        if ((this.y > walls[i].y - walls[i].height) && (this.y < walls[i].y) && (this.x + this.side > walls[i].x) && (this.x < (walls[i].x + walls[i].width))) {
                            //  && (this.x + this.side > wall1.x) && (this.x < (wall1.x + wall1.width))
                            //&& (this.y+ this.side < wall1.y)

                            this.vel.y = 0;
                            this.y = walls[i].y - walls[i].height;
                            //console.log("top")

                        }

                        //ball top collided with wall1 bottom
                        if ((this.y + this.side > walls[i].y) && (this.y < walls[i].y + walls[i].height) && (this.x + this.side > walls[i].x) && (this.x < (walls[i].x + walls[i].width))) {
                            this.vel.y = 0;
                            this.y = walls[i].y + walls[i].height;
                            //console.log("bottom");
                        }
                    } else {

                        //colition to right side of wall


                        if ((this.x > walls[i].x) && this.x < walls[i].x + walls[i].width && this.y < walls[i].y + walls[i].height && (this.y + this.side > walls[i].y)) {

                            this.vel.x = 0;
                            this.x = walls[i].x + walls[i].width;
                            //console.log("right");
                        }

                        if ((this.x + this.side > walls[i].x) && (this.x + this.side < walls[i].x + walls[i].width) && this.y < walls[i].y + walls[i].height && (this.y + this.side > walls[i].y)) {
                            //&& this.x < walls[i].x + walls[i].width

                            this.vel.x = 0;
                            this.x = walls[i].x - this.side;
                            //console.log("left");
                        }
                    }
                }
                


            },
            draw: function() {
                //drwing the ball
                //var img = new Image();
                
                ctx.drawImage(img, this.x, this.y, this.side, this.side);
                
                /*ctx.beginPath();
                ctx.arc(this.x + (this.side / 2), this.y + (this.side / 2), this.side / 2, 0, 2 * Math.PI, false);
                ctx.fillStyle = '#000';
                ctx.fill();
                */
            }


        } // End Ball Function

    //Orientation of the device
    window.addEventListener("deviceorientation", handleOrientation, true);

    function handleOrientation(event) {
        var maxSpeed = 18; // Max speed for the ball (ball ca pass trow the wall)
        var beta = event.beta;
        var gamma = event.gamma;
        if (beta > maxSpeed) {
            beta = maxSpeed;
        } else if (beta < -maxSpeed) {
            beta = -maxSpeed;
        }
        if (gamma > maxSpeed) {
            gamma = maxSpeed;
        } else if (gamma < -maxSpeed) {
            gamma = -maxSpeed;
        }

        //asigning the orentation to the ball object
        ball.orientY = beta;
        ball.orientX = gamma;
    }



    function draw() {

        //paint the canvas white before drawing the ball
        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        //Draw ball
        ctx.save();
        ball.draw();
        good_point.draw();
        
        //draw walls
        ctx.fillStyle = "#73481D";
        for (var i = 0; i < walls.length; i++) {
            walls[i].draw();
        }
        
        ctx.font = "120px";
        ctx.textAlign = "center";
        //ctx.fillText(Math.round(ball.x), WIDTH/2, (HEIGHT)/2);
        //ctx.fillText(Math.round(ball.y), WIDTH/2, (HEIGHT+50)/2);
        ctx.restore();

    }



    function main() {
        canvas = document.createElement("canvas");
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        ctx = canvas.getContext("2d");
        game.appendChild(canvas);


        //init();
        var loop = function() {
            if(compleated == false){
                ball.update();
                draw();
                window.requestAnimationFrame(loop, canvas);
            }else{
                finnish();
            }
        };
        window.requestAnimationFrame(loop, canvas);
    }
    main();
}

function systemet(id) {
    debugger;
    var correctBottles = 0;
    var bottle;
    var logos  =[
        {
            id:"budweiser",
            logoSrc: "images/budweiserlogo.png",
            bottleSrc: "images/budweiserbottle.png"
        },
        {
            id:"heineken",
            logoSrc: "images/heinekenlogo.png",
            bottleSrc: "images/heinekenbottle.png"
        },
        {
            id:"staropramen",
            logoSrc: "images/staropramenlogo.png",
            bottleSrc: "images/staropramenbottle.png"
        }
    ];
    function init() {
        // body...
        
        bottle = document.createElement("div");
        bottle.id = "dragndrop";
        //Logos
        logosUl = document.createElement("ul");
        logosUl.id = "logos";
        for (var i = logos.length - 1; i >= 0; i--) {
            logosLi = document.createElement("li");
            logosImg = document.createElement("img");
            logosImg.src = logos[i].logoSrc;
            logosImg.id = "b_"+logos[i].id;
            logosImg.dataset.id=logos[i].id;
            logosImg.className = "logo";
            logosImg.draggable="true";
            logosImg.alt = logos[i].id + "Logo";
            logosImg.addEventListener("dragstart",drag)

            logosLi.appendChild(logosImg);
            logosUl.appendChild(logosLi);
        }
        bottle.appendChild(logosUl);
        //bottels
        console.log(logos);
        logos.reverse();
        console.log(logos);
        bottleUl = document.createElement("ul");
        bottleUl.id = "bottles";
        for (var i = logos.length - 1; i >= 0; i--) {
            bottleLi = document.createElement("li");
            bottleImg = document.createElement("img");
            bottleImg.src = logos[i].bottleSrc;
            bottleImg.id = "b_"+logos[i].id;
            bottleImg.dataset.id=logos[i].id;
            bottleImg.className = "bottle";
            
            bottleImg.alt = logos[i].id + "Bottle";
            bottleImg.addEventListener("dragover",allowDrop)
            bottleImg.addEventListener("drop",drop)

            bottleLi.appendChild(bottleImg);
            bottleUl.appendChild(bottleLi);
        }
        bottle.appendChild(bottleUl);
        game.appendChild(bottle);
    }
    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        console.log("hej")
        ev.dataTransfer.setData("text", ev.target.id);
        ev.dataTransfer.setData("data-id", ev.target.getAttribute("data-id"));
    }

    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        var logo = ev.dataTransfer.getData("data-id");
        var bottle = ev.target.getAttribute("data-id");
        if (logo == bottle) {
          ev.target.appendChild(document.getElementById(data));
          correctBottles++;
          if (correctBottles == logos.length) {
            finnish();
          }
        } else {
          alert("Wrong bottle");
        }
        
    }
    function finnish(){
        
        console.log("GOAL!");
        intressePungter[id].played = true;
        
        bottle.parentNode.removeChild(bottle);
        myLocation();
        
    }
    init();
}
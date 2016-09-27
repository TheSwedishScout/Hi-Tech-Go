"use strict";
function akademin() {
    debugger;
}

function biblan() {
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

    var ctx, WIDTH, HEIGHT, pi = Math.PI;

    if (getWidth() < getHeight()) {
        WIDTH = getWidth();
        HEIGHT = getWidth();
    } else {
        WIDTH = getHeight();
        HEIGHT = getHeight();
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

    var good_point = {
        /*the goal or a point to go trow*/
        x: WIDTH * 0.9,
        Y: HEIGHT * 0.9,
        width: WIDTH * 0.1,
        height: HEIGHT * 0.1,

        draw: function() {
            ctx.fillRect(this.x, this.y, this.width, this.height);

        }
    };

    /*-------------------------------------------------------______------\\
    ||------------------------------------------------------/      \-----||
    ||-----------------------Seting upp the ball-----------|        |----||
    ||-----------------------------------------------------\        /----||
    \\------------------------------------------------------\______/-----*/

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
                            console.log("top")

                        }

                        //ball top collided with wall1 bottom
                        if ((this.y + this.side > walls[i].y) && (this.y < walls[i].y + walls[i].height) && (this.x + this.side > walls[i].x) && (this.x < (walls[i].x + walls[i].width))) {
                            this.vel.y = 0;
                            this.y = walls[i].y + walls[i].height;
                            console.log("bottom");
                        }
                    } else {

                        //colition to right side of wall


                        if ((this.x > walls[i].x) && this.x < walls[i].x + walls[i].width && this.y < walls[i].y + walls[i].height && (this.y + this.side > walls[i].y)) {

                            this.vel.x = 0;
                            this.x = walls[i].x + walls[i].width;
                            console.log("right");
                        }

                        if ((this.x + this.side > walls[i].x) && (this.x + this.side < walls[i].x + walls[i].width) && this.y < walls[i].y + walls[i].height && (this.y + this.side > walls[i].y)) {
                            //&& this.x < walls[i].x + walls[i].width

                            this.vel.x = 0;
                            this.x = walls[i].x - this.side;
                            console.log("left");
                        }
                    }
                }
                //ball bottom collided with wall1 top
                if ((this.y > good_point.y - good_point.height) && (this.y < good_point.y) && (this.x + this.side > good_point.x) && (this.x < (good_point.x + good_point.width))) {
                    //  && (this.x + this.side > wall1.x) && (this.x < (wall1.x + wall1.width))
                    //&& (this.y+ this.side < wall1.y)
                    // exit maze
                    myLocation();
                    console.log("Exit")

                }



            },
            draw: function() {
                //drwing the ball

                ctx.beginPath();
                ctx.arc(this.x + (this.side / 2), this.y + (this.side / 2), this.side / 2, 0, 2 * Math.PI, false);
                ctx.fillStyle = '#000';
                ctx.fill();
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

        //draw walls
        for (var i = 0; i < walls.length; i++) {
            walls[i].draw();
        }
        good_point.draw();
        ctx.font = "120px";
        ctx.textAlign = "center";
        //ctx.fillText(Math.round(ball.x), WIDTH/2, (HEIGHT)/2);
        //ctx.fillText(Math.round(ball.y), WIDTH/2, (HEIGHT+50)/2);
        ctx.restore();

    }



    function main() {
        var canvas = document.createElement("canvas");
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        ctx = canvas.getContext("2d");
        document.body.appendChild(canvas);


        //init();
        var loop = function() {
            ball.update();
            draw();

            window.requestAnimationFrame(loop, canvas);
        };
        window.requestAnimationFrame(loop, canvas);
    }
    main();
}

function systemet() {
    debugger;
}
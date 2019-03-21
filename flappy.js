var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");



//images
var bird = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var bg = new Image();
var ground = new Image();
var s = new Image();
var a;

bird.src = "images/shs.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
bg.src = "images/back.png";
ground.src = "images/bottom.png";
s.src = "images/s.png";


var bx = 10;
var by = 150;

var gravity = 1.8;
var gap = 95;

var score = 0;

var sound = false;
var crash = false;
var con;
var show;

start();
function image(){
	ctx.drawImage(s,0,0);
	requestAnimationFrame(image);
}

function load(){
	location.reload();
	
	

}
function start(){

image();

}









//on key down
document.addEventListener("keydown",moveUp);
function moveUp(){
	if(sound){
	fly.play();
	by -=25;
	}
}

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};


//draw images
function draw(){
	
	ctx.drawImage(bg,0,0);
	 sound = true;
    for(var i = 0; i < pipe.length; i++){
        
        con = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+con);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }
		 //collision
		 if( bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width && (by <= pipe[i].y + pipeNorth.height || by+bird.height >= pipe[i].y+con) || by + bird.height >=  cvs.height - ground.height){
	
			by = 512;
			remove();
			over();
			}
	
		//score
		  if(sound){
		  if(pipe[i].x == 5){
			score++;
			SCORE.play();
			}
        }
		
		
	}
	
	ctx.drawImage(ground,0,cvs.height - ground.height);
	ctx.drawImage(bird,bx,by);
	
	by += gravity;
	if(sound){
    ctx.fillStyle = "orange";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: "+score,10,cvs.height-20);
	}
	requestAnimationFrame(draw);
	

}


function over(){
	
	sound = false;
	score = score;
	ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "orange";
    ctx.font = "20px Verdana";
    ctx.fillText("Your Score is: "+score,50,200);
	requestAnimationFrame(over);

}
function remove() {
	var mydiv = document.getElementById('start');
while(mydiv.firstChild) {
  mydiv.removeChild(mydiv.firstChild);
}

}


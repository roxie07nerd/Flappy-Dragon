var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");



//images
var bird = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var bg = new Image();
var ground = new Image();

bird.src = "images/shs.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
bg.src = "images/back.png";
ground.src = "images/bottom.png";


var bx = 10;
var by = 170;

var gravity = 1.5;
var gap = 100;

var score = 0;







//on key down
document.addEventListener("keydown",moveUp);
function moveUp(){
	by -=25;
	fly.play();
}
var pipe = [];
pipe[0] = {
	x : cvs.width,
	y : 0
}


//draw images
function draw(){
	ctx.drawImage(bg,0,0);
	 
    for(var i = 0; i < pipe.length; i++){
        
        con = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+con);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125){
            pipe.push({
                x : cvs.width+175,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }
		//collision
		 if( bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width && (by <= pipe[i].y + pipeNorth.height || by+bird.height >= pipe[i].y+con) || by + bird.height >=  cvs.height - ground.height){
  		    CRASH.play();
			alert("your high score is:"+score);
			location.reload();
		 }
		 //score
		  if(pipe[i].x == 5){
            score++;
			SCORE.play();
        }
		
		
		ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
		ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+con);
		pipe[i].x--;
		if(pipe[i].x == 125){
			pipe.push({
				x : cvs.width,
				y: Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height
			});
		}
	}
	
	ctx.drawImage(ground,0,cvs.height - ground.height);
	ctx.drawImage(bird,bx,by);
	
	by += gravity;
	
    ctx.fillStyle = "orange";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
	requestAnimationFrame(draw);
}
draw();

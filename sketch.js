
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//var edge
var engine,world;
var package,packageIMG,helicopter,helicopterIMG,ground;
var packageBody,helicopterBody,groundBody;
var SERVE,MOTION,END,gameState;

function preload(){

	packageImg = loadImage("package.png");
	helicopterImg = loadImage("helicopter.png");
}

function setup(){
	createCanvas(800,400);

    //edge = createEdgeSprite();

    engine = Engine.create();
	world = engine.world;
	
	helicopter = createSprite(-30,130);
	helicopter.addImage(helicopterImg);
	helicopter.scale = 0.35;

    package = createSprite(-30,130);
	package.addImage(packageImg);
	package.scale = 0.2;

    package.depth = helicopter.depth;
    package.depth = package.depth + 1;

	ground = createSprite(399,390,800,5);
	ground.shapeColor = rgb(60,0,20);
	
	SERVE = 2;
	MOTION = 1;
	END = 0;
	gameState = SERVE;

    var packageProperty = {
		
		isStatic: true,
		restitution: 3
	}

	packageBody = Bodies.rectangle(-30,130,30,30,packageProperty);
	World.add(world,packageBody);

	helicopterBody = Bodies.rectangle(-30,130,{isStatic: true});
	World.add(world,helicopterBody);
	  
	groundBody = Bodies.rectangle(393,390,{isStatic: true});
 	World.add(world,groundBody);

	Engine.update(engine);
}


function draw() {
  
  if(gameState === SERVE){

	background('black');

	helicopter.visible = false;
  	package.visible = false;
	ground.visible = false;
	 
    if(keyDown('space')){

    	gameState = MOTION;

	}
  }

  if(gameState === MOTION){
	 
	background('lightBlue');

    package.visible = true;
    helicopter.visible = true;
	ground.visible = true;

    if(helicopter.velocityX > 0){

		package.x = helicopter.x;
	}

	if(helicopter.x > 730){

		helicopter.velocityX = -3;
		//package.x = helicopter.x;
	}

	if(helicopter.x < 70){
	  
		helicopter.velocityX = 3;
		//package.x = helicopter.x;
	}

	keyPressed();
  }

  if(gameState === END){

	if(keyDown('1')){

		gameState = PLAY;
		gameState = SERVE;
	}
  }

  //package.collide(bottomEdge);

  //console.log(packageBody);

  //ellipseMode(CENTER);
  //ellipse(packageBody.position.x,packageBody.position.y,20,20);

  rectMode(CENTER);
  rect(packageBody.position.x,packageBody.position.y,30,30);
  rect(helicopterBody.position.x,helicopterBody.position.y);
  rect(groundBody.position.x,groundBody.position.y,790,5);

  drawSprites();

  if(gameState === SERVE){

	stroke("red");
	strokeWeight(8);
	textSize(30);
	text("Emergency Mission",275,40);
	textSize(25);
	text("Press 'space' to start the emergency",195,170);
	text("mission",365,200);
	stroke("white");
	strokeWeight(4);
	textSize(25);
	text("________________________",240,51);
  }

  if(gameState === MOTION){

	stroke("yellow");
	strokeWeight(2);
	textSize(18);
	text("Press key 'd' to drop the",515,20);
	text("supply on the ground for the people in",445,40);
	text("emergency,danger in this Zombie",465,60);
	text("infested area.",545,80);
  }
}

if(gameState = END){

	stroke("green");
	strokeWeight(2);
	textSize(18);
	text("Press '1' or refresh the page",75,20);
	text("to restart the supply mission",70,40);
}

function keyPressed(){
	if(keyDown('d')) {
	   
		helicopter.velocityX = 0;
		
		gameState = END;
   }
}



var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas (600,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.13;
  
  ground = createSprite(400,350,10000,10);
  
  ground.velocityX = -4;
  
  ground.x = ground.width/2; 
  
  console.log(ground.x);

  bananaGroup = new Group();
  
  obstacleGroup = new Group();
}


function draw() {

  background("white");
  
   if(gameState === PLAY){
  
  if (keyDown("space") && monkey.y >= 300) {
      
    monkey.velocityY = -15;    
          
  }
    
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);
  monkey.collide(obstacleGroup);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score, 500,50); 

  stroke("black");
  textSize(20);
  fill("black");    
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time : " + survivalTime,100,50);
  
  if(obstacleGroup.isTouching(monkey)) {
    gameState = END;
  }
   }  
  
  else if (gameState === END) {
   ground.velocityX = 0; 
   monkey.velocityX = 0; 
   obstacleGroup.velocityX = 0;
   bananaGroup.velocityX = 0; 
   obstacleGroup.setLifetimeEach(0); 
   bananaGroup.setLifetimeEach(0); 
   monkey.collide(ground); 
  }
  
  
  food();
  rock();
  
  drawSprites();
}

function food() {
if (frameCount % 80 === 0) {
    
    var banana = createSprite(600,Math.round(random(120,200)),20,20);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -7;
    banana.lifetime = 92;
    bananaGroup.add(banana);
    
  }
}
  
function rock () {
  
  if (frameCount % 300 === 0) {
      
    obstacle = createSprite(600,320,20,20);
    obstacle.addImage("rock", obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -7;
    obstacle.lifetime = 95;
    obstacleGroup.add(obstacle);
  
  }

}


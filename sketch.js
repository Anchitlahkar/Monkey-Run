var PLAY = 1
var END = 0
var gameState = PLAY
var monkey , monkey_running
var banana ,bananaGroup,bananaImage, obstacle, obstacleImage,support,supportGroup;
var obstacleGroup,gameOver,restart;
var score = 0;


function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stop = loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png")

}



function setup() {
  createCanvas(800,405);
  
  monkey = createSprite(70,355,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("stop", monkey_stop);
  monkey.scale = 0.15;
  monkey.debug = false
  monkey.setCollider("rectangle",0,0,400,400)
  
  
  backgroundImage = createSprite(200,215,600,200);
  backgroundImage.addImage(jungleImage)
  backgroundImage.depth = monkey.depth
  monkey.depth = monkey.depth +1
  score.depth = score.depth +1
  backgroundImage.scale = 1.5
  
  
  
  backgroundImage1 = createSprite(650,215,600,200);
  backgroundImage1.addImage(jungleImage)
  backgroundImage1.depth = monkey.depth
  monkey.depth = monkey.depth +1
  score.depth = score.depth +1
  backgroundImage1.scale = 1.5
  
  
  
  backgroundImage2 = createSprite(1100,215,600,200);
  backgroundImage2.addImage(jungleImage)
  backgroundImage2.depth = monkey.depth
  monkey.depth = monkey.depth +1
  score.depth = score.depth +1
  backgroundImage2.scale = 1.5
  
 
  
  gameOver = createSprite(350,150);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(350,250,50,50);
  restart.addImage(restartImage);  
  
  
  invisibleGround = createSprite(200,375,400,10);
  invisibleGround.visible = false;
  

  
  obstaclesGroup = createGroup();
  bananaGroup = new Group();
  supportGroup = new Group()
}

function draw() {
  background("Green");
  
  // console.log(monkey.y) 
  
  monkey.collide(invisibleGround);

  
  
if(gameState === PLAY){
  
  fill("Black")
  textSize(20)
  text("Survivel Time: "+ score, 600,20);
  text("Survivel Time: "+ score, 600,20);
  

  
  gameOver.visible = false;
  restart.visible = false;
  
  
  backgroundImage.velocityX = -3
  backgroundImage1.velocityX = -3
  backgroundImage2.velocityX = -3
  
  if(backgroundImage.x < -150){
    backgroundImage.x = 200
    backgroundImage1.x = 650
    backgroundImage2.x = 1100
  }
  
  
  if(bananaGroup.collide(monkey)){
    bananaGroup.destroyEach()
  }
  
  //displaying score
    score = score + Math.round(frameCount%20 === 0)

  
  if(keyDown("space") && monkey.y >= 320){
    monkey.velocityY = -20
    // console.log(monkey.velocityY)  
  }
 monkey.velocityY = monkey.velocityY + 1
  
  spawnSupport()
  spawnObstacles();
  spawnBanana();
  
  if(obstaclesGroup.collide(monkey)){
    // monkey.velocityY = -20
    gameState = END
    console.log(gameState)
    monkey.changeAnimation("stop", monkey_stop);
  } 
  
  if(supportGroup.isTouching(monkey)){
    monkey.velocityY = -10    
  }
  
}
  
else if(gameState === END){
  background(150)
  
  fill("Black")
  textSize(20)
  text("Survivel Time: "+ score, 500,20);
  text("Survivel Time: "+ score, 500,20);


  
  gameOver.visible = true;
  restart.visible = true;
  
  obstaclesGroup.destroyEach()  
  bananaGroup.destroyEach()
  bananaGroup.destroyEach()
  
  backgroundImage.destroy()
  backgroundImage1.destroy()
  backgroundImage2.destroy()
  monkey.destroy()

  if (mousePressedOver(restart)) {
    reset()
  }

}

  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   obstacle = createSprite(900,345,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.debug = false;
   obstacle.setCollider("rectangle",0,0,200,200)
   
   obstacle.velocityX = -3;
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 600;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnSupport(){
 if (frameCount % 300 === 0){
   support = createSprite(900,195,10,40);
   
   support.velocityX = -3;
   
    //assign scale and lifetime to the obstacle           
    support.scale = 0.15;
    support.lifetime = 600;
   
   supportGroup.add(support);
 }
}

function spawnBanana(){
 if (frameCount % 80 === 0){
   banana = createSprite(900,195,10,80);
   banana.addImage(bananaImage);
   banana.y = Math.round(random(120,305))
   banana.debug = false; 
   banana.setCollider("rectangle",0,0,250,100)
   
   banana.velocityX = -3;
   
    //assign scale and lifetime to the obstacle           
    banana.scale = 0.15;
    banana.lifetime = 600;
   
   bananaGroup.add(banana);
 }
}
function reset() {
  gameState = PLAY;
  score = 0

  backgroundImage = createSprite(200,215,600,200);
  backgroundImage.addImage(jungleImage)
  backgroundImage.depth = monkey.depth
  monkey.depth = monkey.depth +1
  score.depth = score.depth +1
  backgroundImage.scale = 1.5
  
  
  
  backgroundImage1 = createSprite(650,215,600,200);
  backgroundImage1.addImage(jungleImage)
  backgroundImage1.depth = monkey.depth
  monkey.depth = monkey.depth +1
  score.depth = score.depth +1
  backgroundImage1.scale = 1.5
  
  
  
  backgroundImage2 = createSprite(1100,215,600,200);
  backgroundImage2.addImage(jungleImage)
  backgroundImage2.depth = monkey.depth
  monkey.depth = monkey.depth +1
  score.depth = score.depth +1
  backgroundImage2.scale = 1.5

  monkey = createSprite(70,355,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("stop", monkey_stop);
  monkey.scale = 0.15;
  monkey.debug = false
  monkey.setCollider("rectangle",0,0,400,400)
}
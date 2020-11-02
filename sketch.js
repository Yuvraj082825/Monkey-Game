
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, obstacleGroup;
var bananaGroup,bananaImage;
var score,ground;
var survivaltime=0;
var score=0;
var bananaGroup,obstaclesGroup;
var gamestate=PLAY;
var PLAY,END;

function preload()
{
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
 
}
function setup() 
{
  createCanvas(600,500);
  //creating ground
  ground = createSprite(500,500,1300,20);
  ground.x = ground.width /2;
  ground.velocityX=-9;
  
  //creating monkey
  monkey=createSprite(66,435,20,10);
  monkey.addAnimation("runnning",monkey_running);
  monkey.scale=0.2;
  
  //creating groups for bananas and obstacles
  bananaGroup= new Group();
  obstaclesGroup= new Group();
}


function draw() 
{
  background("pink");
  console.log(frameCount);
  console.log(frameRate());
  
  obstacles();
  bananas();
  
  stroke("white");
  fill("white");
  textSize(20);
  text("Score " + score,500,50);
  
  //monkey.debug=true;
  
  stroke("black");
  fill("black");
  textSize(20);
  
  survivaltime=Math.ceil(frameCount/frameRate());
  text("Survival Time " + survivaltime,100,50);
  if(gamestate==PLAY)
    {
  
  if (ground.x < 50)
  {
      ground.x = ground.width/2;
  }
  if(keyDown("space")&&monkey.y>=250)
  {
      monkey.velocityY = -17.5;
      
  }
  if(monkey.isTouching(bananaGroup))
    {
      bananaGroup.destroyEach();
      score=score+2;
    }
  if(monkey.isTouching(obstaclesGroup))
    {
      gamestate=END;
      ground.velocityX=0;
      monkey.velocityY=0;
      obstaclesGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      monkey.debug=true;
      reset();
        
      obstaclesGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
    }
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 1;
      
    
    monkey.collide(ground)
    drawSprites();

  
}
function reset()
{
  gameState=PLAY;
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  score=0;
  survivaltime=0;
}
function obstacles()
{
  if(frameCount%100==0)
    {
      obstacle=createSprite(600,430,10,10);
      obstacle.scale=0.4 ;
      obstacle.addImage(obstacleImage);
      obstacle.velocityX=-8;
      obstacle.lifetime=83;
      obstaclesGroup.add(obstacle);
    }
  
}  
function bananas()
{
  if(frameCount%80==0)
    {
      banana=createSprite(600,105,10,10);
      banana.scale=0.2;
      banana.addImage(bananaImage);
      banana.velocityX=-8;
      banana.y=Math.round(random(105,380));
      banana.lifetime=81;
      bananaGroup.add(banana);
    }
}
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300,30,80);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

}

function draw() {
  background(200);
  if(gameState === "play"){
    if(keyDown("right")){
      ghost.x = ghost.x+3
    }
  
    if(keyDown("left")){
      ghost.x = ghost.x-3
    }
  
    if (keyDown("space")){
      ghost.velocityY = -10
    }
    
    ghost.velocityY += 0.8


  }
  
  if(tower.y > 400){
      tower.y = 300
  }

  spawnDoors();

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }

  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) || ghost.y <0{
    ghost.destroy();
    gameState = "end"
  }

  

  drawSprites();

  if(gameState === "end"){
    stroke("yellow");
    createCanvas(600,600)
    background(0)
    fill("yellow")
    textSize(30);
    text("Game Over", 230,250)
  }

 
}



function spawnDoors(){
  if(frameCount%200===0){
    door = createSprite(200,-50,30,80);
    door.addImage("door",doorImg);
    door.velocityY = 1.5;

    climber = createSprite(200,10,50,20)
    climber.addImage("climber",climberImg);
    climber.velocityY = 1.5;

    invisibleBlock = createSprite(200,15,50,20)
    invisibleBlock.velocityY = 1.5;
    invisibleBlock.visible = false;

    ghost.depth = door.depth;
    ghost.depth+=1;
    
    climber.lifetime = 800
    door.lifetime = 800
    invisibleBlock.lifetime = 800

    door.x = Math.round(random(120,400));
    climber.x = door.x
    invisibleBlock.x = door.x



    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);



  
    

 }
    

    
      
  



}

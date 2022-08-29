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
  
  ghost = createSprite(300,300)
  ghost.addImage("ghost",ghostImg)
  ghost.velocityY = 1;
  ghost.scale = 0.3

  doorsGroup= new Group()
  climbersGroup= new Group()
  invisibleBlockGroup= new Group()


}

function draw() {
  background(200);

  if(gameState=="play"){

  if(tower.y > 400){
      tower.y = 300
    }

    if (keyDown ("space")){
      ghost.velocityY = -10;
    }

  if (keyDown ("left")){
    ghost.x = ghost.x - 5;
  }

  if (keyDown ("right")){
    ghost.x = ghost.x + 5;    
  }
  spawnDoor()

    ghost.velocityY = ghost.velocityY+0.5

  if (ghost.isTouching(climbersGroup)){
    ghost.velocityY= 0
  }

  if (ghost.isTouching(invisibleBlockGroup) || ghost.y>600){
    ghost.destroy()
    gameState="end"; 
  }
    drawSprites()
    
}
else{
  textSize(45)
  fill("red")
  text("GAME OVER",150,300)
  
}
}

function spawnDoor(){
if (frameCount% 200===0){
  door = createSprite(100, -50);
  door.addImage("door", doorImg);
  door.x = Math.round(random(200,400))
  door.velocityY = 1.5;
  door.scale = 0.9;

  climber= createSprite(door.x,door.y+55)
  climber.addImage("climber", climberImg)
  climber.velocityY = 1.5;

  invisibleBlock = createSprite(climber.x,climber.y+10, climber.width, 2)
  invisibleBlock.velocityY=1.5;
  //invisibleBlock.visible=false
  //invisibleBlock.debug= true

  door.depth= ghost.depth
  climber.depth = ghost.depth
  ghost.depth = ghost.depth+1

  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);
}
}

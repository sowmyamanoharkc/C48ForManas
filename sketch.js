var bg,bgImg;
var player, buttonImg, button2Img;

var playerA, playerB, selectPlayerA, selectPlayerB;
var c1, c2, c3, c4, c5, c6, c7, c8, c9,C10;
var characterImages = [];
var characterScaling = [];
var characterYPositions = [];
var characterXPositions = [];
var players1 = [];
var players2 = [];

var gameState = 0;
var isPlayerASelected = false;
var isPlayerBSelected = false;
/*
  initial = 0;
  ready = 1;
  play = 2;
  end = 3;
*/
function preload(){
  
  buttonImg = loadImage("assets/button.jpeg")
  button2Img = loadImage("assets/button2.jpg")
  //shooter_shooting = loadImage("assets/shooter_3.png")
  bgImg = loadImage("assets/bg1.jpg")
  c1 = loadImage("assets/c1.png")
  c2 = loadImage("assets/c2.png")
  c3 = loadImage("assets/c3.jpg")
  c4 = loadImage("assets/c4.jpeg")
  c5 = loadImage("assets/c5.jpg")
  c6 = loadImage("assets/c1.png")
  c7 = loadImage("assets/c2.png")
  c8 = loadImage("assets/c3.jpg")
  c9 = loadImage("assets/c4.jpeg")
  c10 = loadImage("assets/c5.jpg")

}

function setup() {
  
  createCanvas(windowWidth,windowHeight);

  characterImages = [c1, c2, c3, c4, c5, c6, c7 , c8, c9, c10];
  characterScaling = [1, 0.5, 1, 2, 0.4, 1, 0.5, 1, 2, 0.4];
  characterYPositions = [250,0,0,0,-100,250,-100,0,0,0];
  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.8
  

  var x = displayWidth/3;
  var y = 0;

    for(var i = 0; i<5 ; i++){
        y = y+displayHeight / 6;
        player = createSprite(x-150,y, 50, 50);
        player.addImage(buttonImg)
        player.setCollider("rectangle",0,0,300,300)
        player.scale = 0.65
        player.debug = false
        players1.push(player)
    }
    x =  2*x;
    y=0;

    for(var i = 0; i<5; i++){
        y = y+displayHeight / 6;
        player = createSprite(x+150,y, 50, 50);
        player.addImage(buttonImg)
            player.scale = 0.65
            player.debug = false
            player.setCollider("rectangle",0,0,300,300)
            players2.push(player)
        }
  playerA = createSprite(180, 180, 50, 50)
  playerA.visible=false;
  playerB = createSprite(1700, 180, 50, 50)
  playerB.visible=false;

  selectPlayerA = createSprite(180, 800, 50, 50)
  selectPlayerA.addImage(button2Img);
  selectPlayerA.scale = 0.6;
  selectPlayerA.visible=false;
  selectPlayerB = createSprite(1700, 800, 50, 50)
  selectPlayerB.addImage(button2Img);
  selectPlayerB.scale = 0.6;
  selectPlayerB.visible=false;
}

function draw() {
  background(0); 
  
  checkButtonClicks();

  //moving the player up and down and making the game mobile compatible using touches
/*if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
*/

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

drawSprites();
text(mouseX+","+mouseY, mouseX, mouseY);
}

function checkButtonClicks() {

  if(isPlayerASelected === false) {
    for(var index in players1) {
      if(mousePressedOver(players1[index]))
      { 
        console.log(players1[index].x+", "+players1[index].y);
        console.log(characterImages[index]);
        playerA.addImage(characterImages[index])
        playerA.scale = characterScaling[index];
        playerA.visible=true;
        playerA.y = players1[index].y+characterYPositions[index];
        selectPlayerA.visible = true;
      } 
    }
  }

  if(isPlayerBSelected === false) {
    for(var index in players2) {
        if(mousePressedOver(players2[index]))
        { 
          var offset = 5
          var index2 = offset + Number(index);
          console.log(players2[index].x+", "+players2[index].y);
          console.log(characterImages[index2]);
          playerB.addImage(characterImages[index2])
          playerB.scale = characterScaling[index2];
          playerB.visible=true;
          playerB.y = players1[index].y+characterYPositions[index2];
          selectPlayerB.visible = true;
        } 
    }
  }

  if(mousePressedOver(selectPlayerA)){
    isPlayerASelected = true;

  }

  if(mousePressedOver(selectPlayerB)){
    isPlayerBSelected = true;
  }

  if(isPlayerASelected && isPlayerBSelected) {
    gameState = 1;
  }
}
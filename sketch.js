var dog,dogImg,dogImg2;

var database;

var foodS,foodStock;

function preload(){
  
   dogImg=loadImage("Dog.png");

   dogImg2=loadImage("happydog.png");

  }

function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.29;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

function draw() {
  background("pink");
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg2);
  }

  drawSprites();
  fill("blue");
  stroke("purple");
  text("Remaining Food : "+foodS,170,200);
  textSize(13);
  text("Press UP TO Feed Little Cuty Pie Doggo!!!",130,10,300,20);
}

function readStock(data){
  foodS=data.val();
}


function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}
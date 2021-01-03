//Create variables here
var dog, happyDog, database, foodS, foodStock;
var foodObj;
var feedTime, lastFeed;
var feed, add;
function preload()
{
  //load images here
  dog_img = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 500);
  
  dog = createSprite(700,200,20,20);
  dog.addImage(dog_img);
  dog.scale = 0.3;

  database = firebase.database();
  console.log(database);
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  foodObj = new Food();

  feed = createButton("FEED TOMMY");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  add = createButton("ADD FOOD");
  add.position(800,95);
  add.mousePressed(addFood);
}


function draw() {  
  background(46,139,87);

  foodObj.display();

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }
  text("Note: Press Up Arrow key to feed Tommy milk",200,450);
  text("Food remaining:"+foodS, 100,50)

  drawSprites();
  //add styles here
  textSize(15);
  fill(255,255,254);
  
  


}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){

  if(x<=0){
    x=0;
  } else{
    x = x-1;
  }

  database.ref('/').update({
    Food : x
  })
}

function addFood(){
  foodS++
  database.ref('/').update({
    Food: foodS
  })
}

function feedDog(){
  dog.addImage(dogHappy);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    feedTime : hour()
  })
}



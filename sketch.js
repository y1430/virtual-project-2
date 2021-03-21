var dog,happyDog,database,foodStock;
var foodRemaining=0;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  
  database=firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  foodObj=new Food();

  feed=createButton("Feed Bruno");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() { 
  background("green");
  image(dog,300,250,150,150);

  fedTime=database.ref('Feed Time');
  fedTime.on("value",function(data){
lastFed=data.val();
  });

  drawSprites();
  foodObj.display();
  
  textSize(15);
  fill("white");
  text("Note: Press Up Arrow key to feed milk to Bruno",100,50);
  text("Food Remaining: "+ foodStock ,100,150);
  if (lastFed >= 12){
    text("Last Feed : " + lastFed%12 + "PM",350,30);

  }else if (lastFed==0){
text("Last Feed : 12 AM ",350,30);

  }else {
    text("Last Feed : " + lastFed + "AM",350,30);
  }

}

function readStock(data){
foodStock=data.val();
}

function writeStocks(x) {
  if(x<=0){
    x=0;
  }
  else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.UpdateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Foods:foodS
  })

}
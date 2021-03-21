class Food{
    constructor(){
        var foodStock,lastFed;
        var milkImg;
        milkImg=loadImage("images/Milk.png");

    }

    getFoodStock(){
        var FoodRef=database.ref('Food');
        FoodRef.on("value",function(data){
            foodStock=data.val();
        })
    }

    updateFoodStock(x){
database.ref('/').update({
    Food:x
});
    }

    deductFoodStock(x){
        if (x <= 0) {
            x=0;
        }
        else {
            x = x-1;
        }
        database.ref('/').update({
            Food:x
        });
    }

    display(){
       var  x=80,y=100;

    imageMode(CENTRE);
    image(this.image,720,220,70,70);

    if(this.foodStock!=0){
        for(var i=0; i<this.foodStock;i++) {
if(i%10===0){
    x=80;
    y=y+50;
}
image(this.image,x,y,50,50);
x=x+30;
        }
    }
    }
}
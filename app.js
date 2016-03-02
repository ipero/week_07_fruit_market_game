// global fruits array which holds objects of fruits
var fruits=[];

function Fruit (name, price, averagePrice, inventory, className){
  this.name=name;
  this.price=price;
  this.averagePrice=averagePrice;
  this.inventory=inventory;
  this.className=className;
  fruits.push(this);
}

var randomInitialPrice = function() {
  return randomNumber(50, 999);

}
//global variables
var apple = new Fruit("Apples", randomInitialPrice(), [], 0, "apple");
var banana = new Fruit("Bananas", randomInitialPrice(), [], 0, "banana");
var orange = new Fruit("Oranges", randomInitialPrice(), [], 0, "orange");
var grape = new Fruit("Grapes", randomInitialPrice(), [], 0, "grape");
var pear = new Fruit("Pears", randomInitialPrice(), [], 0, "pear");
var watermelon = new Fruit("Watermelons", randomInitialPrice(), [], 0, "watermelon");

var counter = 0;
var timer;
var cash=10000;

//funciton begin first game
function beginGame() {
  timer = setInterval(priceUpdate, 15000);
  priceUpdate();
}

//function try again
function tryAgain () {
  $(".blur").removeClass("blur");
  $(".message").hide();
  for(i=0; i<fruits.length;i++){
    fruits[i].averagePrice=[];
    $('.'+fruits[i].className+'-expense').html(0);
  }
  cash=10000;
  $('.bank').html('100.00')
  beginGame();
}

// get random number function
function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min);
}

//main funciton priceUpdate updates every 5 sec. and will be stoped at 5 min.
function priceUpdate() {
  counter++;
  if (counter == 20) { //change coutner latter to 20

    for(i=0; i<fruits.length;i++){
      if(fruits[i].inventory>0){
        var fireSale=0;
        fireSale=fruits[i].inventory*fruits[i].price;
        fruits[i].inventory=0;
        $('.'+fruits[i].className+'-inventory').html(fruits[i].inventory);
        cash+=fireSale;
      }
    }
    $('.bank').html(cash/100);
    clearInterval(timer);
    $(".main").addClass("blur");
    $('.alert-message').html("You earned: $"+(cash-10000)/100)
    $('.message').show();
    //alert("Your you earned: $"+(cash-10000)/100);
  }

  for(var i=0;i<fruits.length; i++){
    var priceUpdate=0;
    var priceUpdate = randomNumber(-50, 50);
    fruits[i].price = fruits[i].price + priceUpdate;
    if(fruits[i].price >= 1000){
      fruits[i].price -= 49;
    }
    else if (fruits[i].price < 50) {
      fruits[i].price += 49;
    }
    $('.'+fruits[i].className+'-price').text(fruits[i].price / 100);
  }

}

//buy funciton
function buy(){
   var myClass = $(this).data('classname');
   for( i=0; i<fruits.length; i++){
     if(myClass==fruits[i].className && cash>=fruits[i].price){

       cash-=fruits[i].price;
       fruits[i].inventory++;
       $('.'+fruits[i].className+'-inventory').html(fruits[i].inventory);
       $('.bank').html(cash/100);

       fruits[i].averagePrice.push(fruits[i].price);
       $('.'+fruits[i].className+'-expense').html('$'+Math.round(calcAverage(fruits[i].averagePrice) )/100);

      }
   }
}

// fuction to calculate average purchase price per fruit
function calcAverage(array){
  var sum=0;
  for(var j=0; j<array.length; j++){
    sum+=parseInt(array[j]);
  }
  return sum/array.length;
}

//sell funciton
function sell() {
  console.log(this);
  var myClass = $(this).data('classname');
  console.log(myClass);
  for( i=0; i<fruits.length; i++){
    if(myClass==fruits[i].className && fruits[i].inventory > 0){
      cash+=fruits[i].price;
      fruits[i].inventory--;
      $('.'+fruits[i].className+'-inventory').html(fruits[i].inventory);
      $('.bank').html(cash/100);
     }
  }
}


$(document).ready(function() {

  $('.start').on('click', beginGame);

  $('.apple-buy').on('click', buy);
  $('.orange-buy').on('click', buy);
  $('.banana-buy').on('click', buy);
  $('.pear-buy').on('click', buy);

  $('.apple-sell').on('click', sell);
  $('.orange-sell').on('click', sell);
  $('.banana-sell').on('click', sell);
  $('.pear-sell').on('click', sell);

  $('.start-over-button').on('click', tryAgain);

});

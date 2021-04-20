var rain = new Audio("./sounds/rain_short.mp3");
var birds = new Audio("./sounds/birds_short.mp3");
var coffee = new Audio("./sounds/coffee_short.mp3");

chrome.extension.onMessage.addListener(
   function(request) {
     if (request.action == "Rain"){
         birds.pause(); 
         coffee.pause();
         rain.ontimeupdate = function (i) {
             if((this.currentTime / this.duration) > 0.9){
                 this.currentTime = 0;
                 this.play();
             }
         };
         rain.play();
     } else if (request.action == "Birds") {
         rain.pause();
         coffee.pause();
         birds.ontimeupdate = function (i) {
             if((this.currentTime / this.duration) > 0.9){
                 this.currentTime = 0;
                 this.play();
             }
         };
         birds.play();
     } else if (request.action == "Coffee"){
         rain.pause();
         birds.pause();
         coffee.ontimeupdate = function (i){
             if((this.currentTime / this.duration) > 0.9) {
                 this.currentTime = 0;
                 this.play();
             }
         };
         coffee.play();
     } else {
         rain.pause();
         birds.pause();
         coffee.pause();
     }
});
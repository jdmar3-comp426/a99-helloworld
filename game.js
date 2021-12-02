var num;
var clickers = 0;
gameIsOn = false;


var cookie = document.getElementById("cookie");

function cookieClick(number) { 
  if(gameIsOn) {
      num += number;          
      document.getElementById("numbers").innerHTML = num;
  }  
}


function gameOver() {

  const endMessage = `You have made ${num} clicks. Saving your answers. Press the Start button to reset`;
  gameIsOn = false;
  document.getElementById("status").innerHTML = endMessage;

}


function start() {

  gameIsOn = true;
  num = 0; 
  document.getElementById("numbers").innerHTML = num;
  document.getElementById("status").innerHTML = '';
  
}

function buyClicker(){
  if(gameIsOn){
    var clickerCost = 25;
    if (num >= clickerCost) {
      clickers++;
      num = num - 25;
      document.getElementById("clickers").innerHTML = clickers;
      document.getElementById("numbers").innerHTML = num;
    }
  }
}

  window.setInterval(function(){
    cookieClick(clickers);
  }, 1000);

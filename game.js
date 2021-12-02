var num;
gameIsOn = false;


var cookie = document.getElementById("cookie");

function cookieClick() { 
  if(gameIsOn) {
      num += 1;          
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


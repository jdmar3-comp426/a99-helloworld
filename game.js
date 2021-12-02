var num = 0;
var clickers = 0;
gameIsOn = false;

window.addEventListener("load", function () {
  function saveData(id) {
    const count = num
    const XHR = new XMLHttpRequest();

    //update cookies for current id
    const url = "http://localhost:5000/app/update/cookie/" + id;
    XHR.open( "PATCH", url );
    XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    XHR.onload  = function() {
      if(XHR.status == 200){
        alert(`Data Saved Successfully. Cookies: ${num}`)
      } else {
        alert("Save Failed")
      }
    };
    XHR.send("cookies=" + count + "&clickers=" + clickers);
  }

  function gameOver() {
    if (localStorage.getItem('id') != null){
      saveData(localStorage.getItem('id'));
    }
    const endMessage = `You have made ${num} clicks. Saving your answers.`;
    gameIsOn = false;
    document.getElementById("status").innerHTML = endMessage;

  }

  // Access the button element...
  const stop = document.getElementById("ResetButton");

  // ...and take over its submit event.
  stop.addEventListener("click", function (event) {
    event.preventDefault();
    gameOver()
  });
});


var cookie = document.getElementById("cookie");

function cookieClick(number) { 
  if(gameIsOn) {
      num += number;          
      document.getElementById("numbers").innerHTML = num;
  }  
}


function start() {

  gameIsOn = true;
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

//load cookies for user
function load() {
  if (localStorage.getItem('id') != null){
    const userId = localStorage.getItem('id')
    const XHR = new XMLHttpRequest()
    XHR.open("GET", 'http://localhost:5000/app/user/' + userId)
    XHR.onload  = function() {
      //if nothing has been saved load 0, otherwise saved amount
      if(XHR.status == 200){
        var response = XHR.response;
        var jsonResponse = JSON.parse(response)
        
        num = jsonResponse.cookies
        clickers = jsonResponse.clickers
        document.getElementById("numbers").innerHTML = num;
        document.getElementById("clickers").innerHTML = clickers;
        alert(`Data Loaded Successfully. Cookies: ${num}`)
      } else {
        alert("Error Loading Data")
      }
    };
    XHR.send()
  }
}

  window.setInterval(function(){
    cookieClick(clickers);
  }, 1000);

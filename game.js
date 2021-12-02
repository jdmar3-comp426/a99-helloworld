var num = 0;
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
    XHR.send("cookies=" + count);
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

function cookieClick() { 
  if(gameIsOn) {
      num += 1;          
      document.getElementById("numbers").innerHTML = num;
  }  
}


function start() {
  gameIsOn = true;
  document.getElementById("numbers").innerHTML = num;
  document.getElementById("status").innerHTML = '';
  
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
        if (jsonResponse.cookies === null){
          num = 0
          document.getElementById("numbers").innerHTML = num;
        }
        else {
          num = jsonResponse.cookies
          document.getElementById("numbers").innerHTML = num;
          alert(`Data Loaded Successfully. Cookies: ${num}`)
        }
      } else {
        alert("Error Loading Data")
      }
    };
    XHR.send()
    
  }
}

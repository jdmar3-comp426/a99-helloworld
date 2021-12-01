window.addEventListener( "load", function () {
    function signIn() {
      const XHR = new XMLHttpRequest();
  
      // Bind the FormData object and the form element
      const FD = new URLSearchParams( new FormData( signInForm ) );
  
      // Define what happens on successful data submission
      XHR.addEventListener( "load", function(event) {
        alert( event.target.responseText );
      } );
  
      // Define what happens in case of error
      XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
      } );
  
      // Set up our request
      XHR.open( "POST", "http://localhost:5000/app/login" );
  
      // The data sent is what the user provided in the form
      XHR.send( FD );
    }

    // Access the form element...
    const signInForm = document.getElementById( "signin-form" );
  
    // ...and take over its submit event.
    signInForm.addEventListener( "submit", function ( event ) {
      event.preventDefault();
  
      signIn();
    } );
  } );
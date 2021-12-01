window.addEventListener("load", function () {
    function createAccount() {
        const XHR = new XMLHttpRequest();

        // Bind the FormData object and the form element
        const FD = new URLSearchParams(new FormData(createForm));

        // Define what happens on successful data submission
        XHR.addEventListener("load", function (event) {
            alert(event.target.responseText);
        });

        // Define what happens in case of error
        XHR.addEventListener("error", function (event) {
            alert('Oops! Something went wrong.');
        });

        // Set up our request
        XHR.open("POST", "http://localhost:5000/app/new");

        // The data sent is what the user provided in the form
        XHR.send(FD);
    }

    // Access the form element...
    const createForm = document.getElementById("account-form");

    // ...and take over its submit event.
    createForm.addEventListener("submit", function (event) {
        event.preventDefault();

        createAccount();
    });
});
# Front End Documentation

## index.html
Used Bootstrap for CSS framework. 

Users sign-in via the index.html page (Clicker Sign In) and input a username and password to start. If users
don't have an account, they can create one via the 'Create one here' link, which takes them to createAccount.html.

Since the page uses Bootstrap framework elements, some classes like 'form-floating' are necessary to maintain
the nature of the sign in fields. Additionally, the sign in button at the bottom also references Bootstrap.

### form-floating
Wraps around input div with class 'form-control' and label div to create floating labels upon input within form fields.

### form-control
Sets basic format for forms with input div. Options include custom styles, sizing, heights, etc., such as 'form-control
form-control-sm' for small form heights or a disabled value if preferred. Default is used here.

### btn
Custom Bootstrap button styles for form actions. Color can be set by different class labels; default button is used here. Button
can be adjusted to fit length of label text or extend to a custom preferred width.

## createAccount.html
Still references the same Bootstrap framework.

Web title changes (Create Account) but 'Clicker Game' label remains the same. 'Sign in to Start' has been replaced
by 'Create an Account'; the sign in button has been replaced with a create account button. In case the user already has
an account and has traversed to this page by accident, there is a link returning them to the sign in page.

The input fields are slightly different with labeling instructions for direction and example username and password shaded
in for reference.

## game.html
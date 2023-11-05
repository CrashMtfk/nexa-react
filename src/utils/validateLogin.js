export function validateForm(username, password, event){
    event.preventDefault();
    const errorMessage = document.getElementById("error-message");
    const minLength = 8;
    errorMessage.innerHTML = '';

    if(username.length < minLength){
        errorMessage.innerHTML = "Please enter a valid username!";
        return false;
    } else if(password.length < minLength){
        errorMessage.innerHTML = "Please enter a valid password!";
        return false;
    }

    return true;
}
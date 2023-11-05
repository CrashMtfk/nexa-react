export function validateForm (username, password, playerName, event){

    event.preventDefault();
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = '';

    if(!validateUsername(username)){
        errorMessage.innerHTML = "Please enter a valid username!It should be 8 characters long."
        return false;
    }
    else if(!validatePassword(password)){
        errorMessage.innerHTML = "Please enter a valid password! It should be 8 characters long and have at least one upper case character and a number.";
        return false;
    } else if (!validatePlayerName(playerName)){
        errorMessage.innerHTML = "Please enter a valid player name!It should be 8 characters long.";
        return false;
    }
    return true;
}

function validateUsername(username){
    const minLength = 8;
    return (username.length >= minLength);
}

function validatePlayerName(playerName){
    const minLength = 8;
    return (playerName.length >= minLength);
}

function validatePassword(password){
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return (
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber
    );
}
export function processTitle(title){
    if(title.length > 0){
        return true;
    }
    alert("Please give a title!");
    return false;
}

export function verifyEmptyData(data){
    if(data.length === 0){
        alert("Please fill all the fields!");
        return true;
    }
    return false;
}

export function processSingularNoteData(inputText){
    if(inputText.length === 0){
        inputText = "Can't wait to see what will be here!";
        return inputText;
    }
    return inputText;
}
export function getErrorMessage(errorMessage:string):string { 
    let regex = /\(([^)]+)\)/;
    let match = errorMessage.match(regex);
    if(match && match[1] && (match[1] === "201" || match[1] === "202")  ){
        return "Incorrect username or password."
    }
    return errorMessage

}
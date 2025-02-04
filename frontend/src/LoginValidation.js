function Validation(values){
    let error = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(values.email === ""){
        error.email = "Email should not be empty";
    } else if(!emailPattern.test(values.email)){
        error.email = "Email format is incorrect";
    } else {
        error.email = "";
    }

    if(values.password === ""){
        error.password = "Password should not be empty";
    } else {
        error.password = "";
    }

    return error;
}

export default Validation;

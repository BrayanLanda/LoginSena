//validacion de datos cuando se este registrando
function Validation(values){
    let error = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordPattern = /a/;

    if(values.name === ""){
        error.name = "Name should not be empty";
    }else{
        error.name = "";
    }

    if(values.email === ""){
        error.email = "Name should not be empty";
    }else if(!emailPattern.test(values.email)){
        error.email = "Email Didn't match"
    }else{
        error.email = "";
    }

    if(values.password === ""){
        error.password = "Password should not be empty"
    }else if(!passwordPattern.test(values.password)){
        error.password = "Password didn't match" 
    }else{
        error.password = ""
    }
    return error;
}

export default Validation;
var validator = require('validator');
function validate(value, options){
    let result = {
        check: true,
        error:""
    }
    if(options.required){
        if(validator.isEmpty(value, { ignore_whitespace:true })){
            result.check = false;
            result.error = "This field is required";
            return result
        }
    }
        if(options.min){
            if(!validator.isLength(value, {min:options.min})){
                result.check = false;
                result.error = "This field length should be less than "+options.min;
                return result
            }
        }
        if(options.max){
            if(!validator.isLength(value, {max:options.max})){
                result.check = false;
                result.error = "This field length should be greater than "+options.max;
                return result
            }
        }
        if(options.email){
            if(!validator.isEmail(value)){
                result.check = false;
                result.error = "This field should be a valid Email" ;
                return result
            }
        }
        if(options.custom){
            if(!validator.matches(value, options.custom.patern)){
                result.check = false;
                result.error = options.custom.message ;
                return result
            }
        }
        
        if(options.equel){
            
            if(value !== options.equel.value){
                result.check = false;
                result.error = options.equel.message ;
                return result
            }
        }
        return result
    
}

// function validateRegUser(user){
//     user.check = true;
// if(validator.isEmpty(user.fName.value,{ ignore_whitespace:true })){
//     user.check = false;
//     user.fName.error = "First Name is required";

// }else{
//     if(!validator.isLength(user.fName.value, {min: 2, max: 50 })){
//         user.check = false;
//         user.fName.error = "First Name length should be between 2 - 50 chars";
//     }
// }
// if(validator.isEmpty(user.lName.value,{ ignore_whitespace:true })){
//     user.check = false;
//     user.lName.error = "Last Name is required";

// }else{
//     if(!validator.isLength(user.lName.value, {min: 2, max: 50 })){
//         user.check = false;
//         user.lName.error = "Last Name length should be between 2 - 50 chars";
//     }
// }
// if(validator.isEmpty(user.email.value,{ ignore_whitespace:true })){
//     user.check = false;
//     user.email.error = "Email Name is required";

// }else{
//     if(!validator.isEmail(user.email.value, {allow_utf8_local_part: false})){
//         user.check = false;
//         user.email.error = "Email is not valid";
//     }else{
//         if(!validator.isLength(user.email.value, {min: 5, max: 100 })){
//             user.check = false;
//             user.email.error = "Email length should be between 5 - 100 chars";
//         }
//     }
// }
// if(validator.isEmpty(user.pass.value,{ ignore_whitespace:true })){
//     user.check = false;
//     user.pass.error = "Password Name is required";

// }else{
//     if(!validator.isLength(user.pass.value, {min: 6, max: 50 })){
//         user.check = false;
//         user.pass.error = "Password length should be between 6 - 50 chars";
//     }else{
//         if(!validator.matches('[0-9]+[a-f]', '[a-f]+[0-9]')){
//             user.check = false;
//             user.pass.error = "Password must consist of at least one number and one alpha character";
//         }
//     }
// }
// if(user.pass.value !== user.repass.value){
//     user.check = false;
//     user.repass.error = "Password and re-password dose not match";

// }
// return user;
// }

module.exports ={
    validate
}
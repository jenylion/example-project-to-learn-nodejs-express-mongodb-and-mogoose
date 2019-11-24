const {validate} = require('./validate')
const initApp = ()=>{
    
    const newUserButton = document.querySelector('#registerBtn')
    const loginButton = document.querySelector('#loginBtn')
    const todoaddButton = document.querySelector('#todoaddBtn')
    const todolistaddButton = document.querySelector('#todolistaddBtn')
    // check if the page is register page

    // register page
    if(newUserButton){
        newUserButton.addEventListener('click',function(){
            
            let fNameElement = document.querySelector('#fname')
            let lNameElement = document.querySelector('#lname')
            let emailElement = document.querySelector('#email')
            let passElement = document.querySelector('#pass')
            let repassElement = document.querySelector('#repass')
            let errorList = document.querySelector('#errorlist')
            errorList.innerHTML = ""
            errorList.classList.add('hidden')

            let checkValidate = true
            let validateFname = validate(fNameElement.value,{required: true, max:50, min:2})
            let validateLname = validate(lNameElement.value,{required: true, max:50, min:2})
            let validateEmail = validate(emailElement.value,{required: true, max:50, min:5, email:true})
            let validatePass = validate(passElement.value,{required: true, max:50, min:6, custom:{patern:"[0-9]+[a-z]|[a-z]+[0-9]", message:"Password must consist of at least one number and one alpha character"}})
            let validateRepass = validate(repassElement.value,{equel:{value:passElement.value, message:"password dose not match re-password"}})
            
            fNameElement.addEventListener('input', function(){
                let validateFname = validate(fNameElement.value,{required: true, max:50, min:2})
                if(!validateFname.check){
                    errorCalss(fNameElement, false, validateFname.error)
                }else{
                    errorCalss(fNameElement, true)
                }
            })
            lNameElement.addEventListener('input', function(){
                let validateLname = validate(lNameElement.value,{required: true, max:50, min:2})
                if(!validateLname.check){
                    errorCalss(lNameElement, false, validateLname.error)
                }else{
                    errorCalss(lNameElement, true)
                }
            })
            emailElement.addEventListener('input', function(){
                let validateEmail = validate(emailElement.value,{required: true, max:50, min:5, email:true})
                if(!validateEmail.check){
                    errorCalss(emailElement, false, validateEmail.error)
                }else{
                    errorCalss(emailElement, true)
                }
            })
            passElement.addEventListener('input', function(){
                let validatePass = validate(passElement.value,{required: true, max:50, min:6, custom:{patern:"[0-9]+[a-z]|[a-z]+[0-9]", message:"Password must consist of at least one number and one alpha character"}})
                if(!validatePass.check){
                    errorCalss(passElement, false, validatePass.error)
                }else{
                    errorCalss(passElement, true)
                }
            })
            repassElement.addEventListener('input', function(){
                let validateRepass = validate(repassElement.value,{equel:{value:passElement.value, message:"password dose not match re-password"}})
                if(!validateRepass.check){
                    errorCalss(repassElement, false, validateRepass.error)
                }else{
                    errorCalss(repassElement, true)
                }
            })
                if(!validateFname.check){
                    checkValidate = false
                    errorCalss(fNameElement, false, validateFname.error)
                    
                }else{
                    errorCalss(fNameElement, true)
                }
                if(!validateLname.check){
                    checkValidate = false
                    errorCalss(lNameElement, false, validateLname.error)
                }else{
                    errorCalss(lNameElement, true)
                }
                if(!validateEmail.check){
                    checkValidate = false
                    errorCalss(emailElement, false, validateEmail.error)
                }else{
                    errorCalss(emailElement, true)
                }
                if(!validatePass.check){
                    checkValidate = false
                    errorCalss(passElement, false, validatePass.error)
                }else{
                    errorCalss(passElement, true)
                }
                if(!validateRepass.check){
                    checkValidate = false
                    errorCalss(repassElement, false, validateRepass.error)
                }else{
                    errorCalss(repassElement, true)
                }
                if(checkValidate){
                    newUserButton.disabled = true
                    let user = {
                        fname:fNameElement.value,
                        lname:lNameElement.value,
                        email:emailElement.value,
                        password:passElement.value
                    }
                    postData('/register',user).then(data=>{
                        newUserButton.disabled = false
                        if(data.error){
                            let errorsList = ""
                            switch (data.error) {
                                case 1:
                                    errorsList ='<li>Email is already registerd</li>'
                                    break
                                case 2:
                                    errorsList ='<li>Database Connection Error</li>'
                                    break
                                case 3:
                                    errorsList ='<li>Server Error</li>'
                                    break
                                case 10:
                                    errorsList ='<li>Server Validation Error</li>'
                                    break
                                default:
                                        errorsList ='<li>Somthing was Wrong</li>'
                                    break
                            }
                            
                            errorList.innerHTML = errorsList
                            errorList.classList.remove('hidden')
                            errorList.classList.remove('successlist')
                            errorList.classList.add('errorlist')
                        }else{
                            errorList.innerHTML = '<li>Done! you can login now...</li>'
                            errorList.classList.remove('hidden')
                            errorList.classList.add('successlist')
                            errorList.classList.remove('errorlist')
                        }
                    }).catch(error=>{
                        newUserButton.disabled = false
                        errorList.innerHTML = '<li>can not Send data</li>'
                    })
                }
            
            
        })
    }

    // login page
    if(loginButton){
        loginButton.addEventListener('click', function () {
            let usernameElement = document.querySelector('#usernameInput')
            let passwordElement = document.querySelector('#password')
            let errorList = document.querySelector('#errorlist')
            errorList.innerHTML = ""
            errorList.classList.add('hidden')
            let validateUsermname = validate(usernameElement.value, {required: true,min:5, max:50, email: true })
            let validatePassword = validate(passwordElement.value, {required: true})
            usernameElement.addEventListener('input', function(){
                let validateUsermname = validate(usernameElement.value,{required: true, max:50, min:5, email:true})
                if(!validateUsermname.check){
                    errorCalss(usernameElement, false, validateUsermname.error)
                }else{
                    errorCalss(usernameElement, true)
                }
            })
            passwordElement.addEventListener('input', function(){
                let validatePassword = validate(passwordElement.value,{required: true})
                if(!validatePassword.check){
                    errorCalss(passwordElement, false, validatePassword.error)
                }else{
                    errorCalss(passwordElement, true)
                }
            })
            let checkValidate = true
            if(!validateUsermname.check){
                checkValidate = false
                errorCalss(usernameElement, false, validateUsermname.error)
                
            }else{
                errorCalss(usernameElement, true)
            }
            if(!validatePassword.check){
                checkValidate = false
                errorCalss(passwordElement, false, validatePassword.error)
                
            }else{
                errorCalss(passwordElement, true)
            }
            if(checkValidate){
                loginButton.disabled = true
                let user = {
                    username: usernameElement.value,
                    password: passwordElement.value
                }
                postData('/', user).then(data=>{
                    
                    loginButton.disabled = false
                    let errorsList = ""

                    if(data.error){
                    
                            switch (data.error) {
                                case 11:
                                    errorsList ='<li>Username or password is wrong</li>'
                                    break
                                case 2:
                                    errorsList ='<li>Database Connection Error</li>'
                                    break
                                case 3:
                                    errorsList ='<li>Server Error</li>'
                                    break
                                case 10:
                                    errorsList ='<li>Server Validation Error</li>'
                                    break
                                default:
                                        errorsList ='<li>Somthing was Wrong</li>'
                                    break
                            }
                            
                            errorList.innerHTML = errorsList
                            errorList.classList.remove('hidden')
                            errorList.classList.remove('successlist')
                            errorList.classList.add('errorlist')
                        }else{
                            if(data == 'ok'){
                                window.location.href="/users"
                            }
                        }
                }).catch(error=>{
                    loginButton.disabled = false
                    errorList.innerHTML = '<li>can not Send data</li>'
                    
                    
                }) 
            }

          })
    }

    //todo  page
    if(todoaddButton){
        todoaddButton.addEventListener('click', function () {
            let todoElement = document.querySelector('#todolistname')
            let errorList = document.querySelector('#errorlist')
            errorList.innerHTML = ""
            errorList.classList.add('hidden')
            let todoValidate = validate(todoElement.value, {required: true, min:2, max:50})
            todoElement.addEventListener('input', function () {
                let todoValidate = validate(todoElement.value, {required: true, min:2, max:50})
                if(!todoValidate.check){
                    errorCalss(todoElement, false, todoValidate.error)
                }else{
                    errorCalss(todoElement, true)
                }
              })

              if(!todoValidate.check){
                errorCalss(todoElement, false, todoValidate.error)
            }else{
                todoaddButton.disabled = true
                errorCalss(todoElement, true)
                postData('/users', {todoname: todoElement.value}).then(data=>{
                    todoaddButton.disabled = false
                    let errorsList = ""
                    if(data.error){
                    
                        switch (data.error) {
                            case 1:
                                errorsList ='<li>todo list is already exist</li>'
                                break
                            case 2:
                                errorsList ='<li>Database Connection Error</li>'
                                break
                            case 3:
                                errorsList ='<li>Server Error</li>'
                                break
                            case 10:
                                errorsList ='<li>Server Validation Error</li>'
                                break
                            default:
                                    errorsList ='<li>Somthing was Wrong</li>'
                                break
                        }
                        
                        errorList.innerHTML = errorsList
                        errorList.classList.remove('hidden')
                        errorList.classList.remove('successlist')
                        errorList.classList.add('errorlist')
                    }else{
                        
                            let todolistElement = document.querySelector('#todolists')
                            let newLi = document.createRange().createContextualFragment( '<li><a href="/users/'+data+'">'+todoElement.value+'</a><span id="close_'+data+'" class="close" >×</span></li>');
                            
                        todolistElement.appendChild(newLi)
                        todoElement.value = ""
                        document.querySelector("#close_"+data).addEventListener('click', function () {
                            deletTodo(this.id.replace('close_', ''))
                          })
                        
                        
                    }
                }).catch(error=>{
                    todoaddButton.disabled = false
                    errorList.innerHTML = '<li>can not Send data</li>'
                })
            }
          })

          document.querySelectorAll('.close').forEach(closebtn=>{
              closebtn.addEventListener('click', function () {
                deletTodo(closebtn.id.replace('close_',''))
                })
          })
        

    }

    // todo list page
    if(todolistaddButton){
        todolistaddButton.addEventListener('click', function () {
            let todolistElement = document.querySelector('#todolistname')
            let errorList = document.querySelector('#errorlist')
            errorList.innerHTML = ""
            errorList.classList.add('hidden')
            let todoValidate = validate(todolistElement.value, {required: true, min:2, max:50})
            todolistElement.addEventListener('input', function () {
                let todoValidate = validate(todolistElement.value, {required: true, min:2, max:50})
                if(!todoValidate.check){
                    errorCalss(todolistElement, false, todoValidate.error)
                }else{
                    errorCalss(todolistElement, true)
                }
              })

              if(!todoValidate.check){
                errorCalss(todolistElement, false, todoValidate.error)
            }else{
                todolistaddButton.disabled = true
                errorCalss(todolistElement, true)
                let todoid = document.querySelector('#todoId').value
                postData('/users/addtodotag', {tagname: todolistElement.value,todoid: todoid }).then(data=>{
                    todolistaddButton.disabled = false
                    let errorsList = ""
                    if(data.error){
                    
                        switch (data.error) {
                            case 1:
                                errorsList ='<li>tag is already exist</li>'
                                break
                            case 2:
                                errorsList ='<li>Database Connection Error</li>'
                                break
                            case 3:
                                errorsList ='<li>Server Error</li>'
                                break
                            case 10:
                                errorsList ='<li>Server Validation Error</li>'
                                break
                            default:
                                    errorsList ='<li>Somthing was Wrong</li>'
                                break
                        }
                        
                        errorList.innerHTML = errorsList
                        errorList.classList.remove('hidden')
                        errorList.classList.remove('successlist')
                        errorList.classList.add('errorlist')
                    }else{
                        
                            let todotagElement = document.querySelector('#todolist')
                            let newLi = document.createRange().createContextualFragment( '<li>'+todolistElement.value+'<span id="close_'+data.id+'" class="close" >×</span></li>');
                            document.querySelector('#updatedDate').innerText = data.date.replace('T', '   ').replace('Z', '   ')
                            todotagElement.appendChild(newLi)
                        todolistElement.value = ""
                        document.querySelector("#close_"+data.id).addEventListener('click', function () {
                            deletTodotag(this.id.replace('close_', ''), todoid)
                          })
                        
                        
                    }
                }).catch(error=>{
                    todolistaddButton.disabled = false
                    errorList.innerHTML = '<li>can not Send data</li>'
                })
            }
          })

          document.querySelectorAll('.close').forEach(closebtn=>{
              closebtn.addEventListener('click', function () {
                deletTodotag(closebtn.id.replace('close_',''), document.querySelector('#todoId').value)
                })
          })
        

    }
    
    
     
}
function deletTodotag(tagid, todoid) {
    postData('/users/delettodotag',{tagid: tagid, todoid:todoid } ).then(data=>{
    if(data.result == 'ok'){
        
        document.querySelector("#close_"+tagid).parentElement.remove()
        document.querySelector('#updatedDate').innerText = data.date.replace('T', '   ').replace('Z', '   ')
    }else{
        let errorsList = "";
        switch (data.error) {
            case 1:
                errorsList ='todo list not found'
                break
            case 2:
                errorsList ='Database Connection Error'
                break
            case 3:
                errorsList ='Server Error'
                break
            case 10:
                errorsList ='Server Validation Error'
                break
            default:
                    errorsList ='Somthing was Wrong'
                break
        }
        alert(errorsList)
    }
    }).catch(error=>{
        alert('can not send data')
    })
      }
function deletTodo(todoId) {
postData('/users/delettodo',{todoId: todoId} ).then(data=>{
if(data == 'ok'){
    
    document.querySelector("#close_"+todoId).parentElement.remove()
}else{
    let errorsList = "";
    switch (data.error) {
        case 1:
            errorsList ='todo list not found'
            break
        case 2:
            errorsList ='Database Connection Error'
            break
        case 3:
            errorsList ='Server Error'
            break
        case 10:
            errorsList ='Server Validation Error'
            break
        default:
                errorsList ='Somthing was Wrong'
            break
    }
    alert(errorsList)
}
}).catch(error=>{
    alert('can not send data')
})
  }
function errorCalss(element, check, message){
    let nextElement = document.querySelector('#'+element.id+'errorelement')
    if(check){
        element.classList.remove('validate-error')
        if(nextElement){
            nextElement.remove()
        }
    }else{ 
        if(!nextElement){        
            nextElement = document.createElement('div')
            nextElement.classList.add('errormessage')
            nextElement.id =element.id+'errorelement'
            nextElement.innerText = message
        }else{
            nextElement.innerText = message
        }
        element.classList.add('validate-error')
        
        element.parentNode.insertBefore(nextElement, element.nextSibling)
    }
}
function postData(url = '', data = {}) {
    // Default options are marked with *
    // eslint-disable-next-line no-undef
    return fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then(response => response.json()) // parses JSON response into native Javascript objects
  }
initApp()
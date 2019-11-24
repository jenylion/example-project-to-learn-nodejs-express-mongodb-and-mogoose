// error map
// 10: validation error
// 11: user login failed
// database error map
// 1: dubelcated uniqe field
// 2: database connection error
// 3: server error
const {createUser, addTodo, getUser, deletTodo, addTodoTag, deletTodoTag} = require('./db')
const passwordHash = require('password-hash');

class User{
    static create(fName, lName, email, password){
        const createPromise = new Promise((resolve, reject)=>{
            createUser(fName, lName, email, passwordHash.generate(password) ).then(createdUser=>{
                resolve(createdUser)
            }).catch(error=>{
                reject(error)
            })
        })
        return createPromise
    }
    static checkLogin(username, password){
        const checkPromise = new Promise((resolve, reject)=>{
            getUser(username).then(foundUser=>{
                if(foundUser){
                    if(passwordHash.verify(password, foundUser.password)){
                        
                        resolve(foundUser)
                    }else{
                        reject(11)
                    }
                }else{
                        reject(11)
                }
            }).catch(error=>{
                reject(3)
            })
        })
        return checkPromise
    }
    static addTodoTag(userId, todoName, todoId, updatedDate){
        const addPromise = new Promise((resolve, reject)=>{
            addTodoTag(userId, todoName, todoId, updatedDate).then(newUser=>{
                resolve(newUser)
            }).catch(error=>{
                reject(error)
            })
        })
        return addPromise
    }
    static addTodo(userId, todoName, createdDate){
        const addPromise = new Promise((resolve, reject)=>{
            addTodo(userId, todoName, createdDate).then(newUser=>{
                resolve(newUser)
            }).catch(error=>{
                reject(error)
            })
        })
        return addPromise
    }
    static deletTodo(userId, todoId){
        const deletPromise = new Promise((resolve, reject)=>{
            deletTodo(userId, todoId).then(newUser=>{
                resolve(newUser)
            }).catch(error=>{
                reject(error)
            })
        })
        return deletPromise
    }
    static deletTodoTag(userId, todoId, tagId, updatedDate){
        const deletPromise = new Promise((resolve, reject)=>{
            deletTodoTag(userId, todoId,  tagId, updatedDate).then(newUser=>{
                resolve(newUser)
            }).catch(error=>{
                reject(error)
            })
        })
        return deletPromise
    }
}

module.exports = {
    User
}
// error maps
// 10: validation error
// 11: user login failed
// database error map
// 1: dubelcated uniqe field
// 2: database connection error
// 3: server error
const mongoose = require('mongoose')
require('dotenv').config()
const connectionString = process.env.mongoDB
const {Schema} = mongoose
const todoListSchema = new Schema({
  tag:{
  type: String,
  required: true
  }
})
const todoSchema = new Schema({
name:{
  type: String,
  required: true
},
createdDate:{
  type: Date,
  required: true
},
updatedDate:{
  type: Date,
  required: true
},
todoList:{
  type: [todoListSchema]
}
})
const userSchema = new Schema({

    lname: {
      type: String,
      required: true
    },
    fname: {
        type: String,
        required: true
      },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    todo:{
      type:[todoSchema]

    }
  })

  const User = mongoose.model('users', userSchema)

  // test the connection with mongoDB
  function testConnection () {

    const connectionPromise = new Promise((resolve, reject) => {
      try {
        if (mongoose.connection.readyState !== 1) {
          mongoose.connect(connectionString, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
          }).then(

            () => {
              resolve()
            },
            (err) => {
              reject(2)
            }).catch(error => {
            reject(2)
          })
        } else {
          resolve()
        }
      } catch (error) {
        reject(3)
      }
    })
    return connectionPromise
  }

  // create user and save it in mongodb
  function createUser(fName, lName, email, password) {
    const createPromise = new Promise((resolve, reject)=>{
      // check connection first
      testConnection().then(()=>{
        const newUser = new User({
          fname: fName,
          lname: lName,
          email: email,
          password: password,
          todo: []
        })
        newUser.save().then(createdUser=>{
          resolve(createdUser)
        }).catch(error=>{
          let err = 3
          if(error.code == "11000"){
            err = 1
          }
          reject(err)
        })
      }).catch(error=>{
        reject(2)
      })
    })
    return createPromise
    }

    // add todo Tag
    function addTodoTag(userId, todoName, todoId, updatedDate ) {

      const createPromise = new Promise((resolve, reject)=>{
        testConnection().then(()=>{
          User.findById(userId).then(foundUser=>{
            if(foundUser){
              let foundTodo = foundUser.todo.find(todo=> todo._id == todoId)
              if(foundTodo){

                foundUser.todo[foundUser.todo.indexOf(foundTodo)].updatedDate = updatedDate

                foundUser.todo[foundUser.todo.indexOf(foundTodo)].todoList.push({
              tag: todoName

            })
            foundUser.save().then(savedUser=>{
              resolve(savedUser)
            }).catch(error=>{
              let err = 3
          if(error.code == "11000"){
            err = 1
          }
          reject(err)
            })
          }else{
            reject(3)
            }
          }else{
          reject(3)
          }
          }).catch(error=>{
            reject(3)
          })

        }).catch(error=>{
          reject(2)
        })
      })
      return createPromise
      }

      // delete todo Tag
      function deletTodoTag(userId, todoId, tagId, updatedDate ) {

        const deletPromise = new Promise((resolve, reject)=>{
          testConnection().then(()=>{
            User.findById(userId).then(foundUser=>{
              if(foundUser){
                let foundTodo = foundUser.todo.find(todo=> todo._id == todoId)
                if(foundTodo){

                  foundUser.todo[foundUser.todo.indexOf(foundTodo)].updatedDate = updatedDate

                  foundUser.todo[foundUser.todo.indexOf(foundTodo)].todoList.splice(foundUser.todo[foundUser.todo.indexOf(foundTodo)].todoList.indexOf(foundUser.todo[foundUser.todo.indexOf(foundTodo)].todoList.find(tag=>tag._id==tagId)),1)
              foundUser.save().then(savedUser=>{
                resolve(savedUser)
              }).catch(error=>{
                let err = 3
            if(error.code == "11000"){
              err = 1
            }
            reject(err)
              })
            }else{
              reject(3)
              }
            }else{
            reject(3)
            }
            }).catch(error=>{
              reject(3)
            })

          }).catch(error=>{
            reject(2)
          })
        })
        return deletPromise
        }


        // add todo list
    function addTodo(userId, todoName, createdDate ) {

      const createPromise = new Promise((resolve, reject)=>{
        testConnection().then(()=>{
          User.findById(userId).then(foundUser=>{
            if(foundUser){
            foundUser.todo.push({
              name: todoName,
              createdDate: createdDate,
              updatedDate: createdDate,
              todoList: []
            })
            foundUser.save().then(savedUser=>{
              resolve(savedUser)
            }).catch(error=>{
              let err = 3
          if(error.code == "11000"){
            err = 1
          }
          reject(err)
            })
          }else{
          reject(3)
          }
          }).catch(error=>{
            reject(3)
          })

        }).catch(error=>{
          reject(2)
        })
      })
      return createPromise
      }

      // delete todo list
      function deletTodo(userId, todoId ) {

        const deletPromise = new Promise((resolve, reject)=>{
          testConnection().then(()=>{
            User.findById(userId).then(foundUser=>{
              if(foundUser){
                let foundTodo = foundUser.todo.find(todo=>todo.id==todoId)
                if(foundTodo){
                  foundUser.todo.splice(foundUser.todo.indexOf(foundTodo),1)
                  foundUser.save().then(savedUser=>{
                    resolve(savedUser)
                  }).catch(error=>{
                    reject(3)
                  })
                }else{
                  resolve(foundUser)
                }

            }else{
            reject(3)
            }
            }).catch(error=>{
              reject(3)
            })

          }).catch(error=>{
            reject(2)
          })
        })
        return deletPromise
        }

        // get user via its email 
      function getUser(email) {
        const getPromise = new Promise((resolve, reject)=>{
          testConnection().then(()=>{
            User.findOne({email: email}).then(foundUser=>{
              resolve(foundUser)
            }).catch(error=>{
              reject(3)
            })
          }).catch(error=>{
            reject(2)
          })
        })
        return getPromise
        }

      module.exports={
        createUser,
        addTodo,
        getUser,
        deletTodo,
        addTodoTag,
        deletTodoTag
      }


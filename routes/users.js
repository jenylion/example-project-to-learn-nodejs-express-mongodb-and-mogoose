var express = require('express');
const {User} = require('../modules/core')
const {validate} = require('../modules/validate')
var router = express.Router();

/* GET users listing. */
router.use(function(req, res, next) {
  // set locals, only providing error in development
  if(req.session.user){
    next()
  }else{
    res.redirect('/')
  }
});
router.get('/', function(req, res, next) {
  res.render('todolists', {todos: req.session.user.todo});
});
router.post('/', function(req, res, next) {
let todoName = req.body.todoname

// validating parameters
let todonameValidate = validate(todoName, {required: true, min:2, max:50})

if(todonameValidate.check){
  let checkUniq = true
  req.session.user.todo.forEach(todo => {
    if(todo.name === todoName){
      checkUniq= false
    }
  });
  if(checkUniq){
    User.addTodo(req.session.user._id, todoName, new Date() ).then(newUser=>{
      req.session.user = newUser
      res.json(newUser.todo.find(todo=>todo.name == todoName)._id)
    }).catch(error=>{
      res.json({error:error})
    })
  }else{
    res.json({error:1})
  }

}else{
  res.json(10)
}
});


router.post('/delettodo', function(req, res, next) {
  let todoId = req.body.todoId

  // validating parameters
  let todoIdValidate = validate(todoId, {required: true})

  if(todoIdValidate.check){
    let checkexist = true
    req.session.user.todo.forEach(todo => {
      if(todo.id === todoId){
        checkexist= false
      }
    }); 
    if(checkexist){
      User.deletTodo(req.session.user._id, todoId ).then(newUser=>{
        req.session.user = newUser
        res.json('ok')
      }).catch(error=>{
        res.json({error:error})
      })
    }else{
      res.json({error:1})
    }
  
  }else{
    res.json(10)
  }
  });

  
  router.post('/addtodotag', function(req, res, next) {
    let tagName = req.body.tagname
    let todoId = req.body.todoid

    // validating parameters
    let todonameValidate = validate(tagName, {required: true, min:2, max:50})
    let todoidValidate = validate(todoId, {required: true})

    if(todonameValidate.check && todoidValidate.check){
      let checkUniq = true
      req.session.user.todo.find(todo=>todo._id == todoId).todoList.forEach(todo => {
        if(todo.tag === tagName){
          checkUniq= false
        }
      });

      if(checkUniq){
        let updateDate =  new Date()
        User.addTodoTag(req.session.user._id, tagName, todoId, updateDate ).then(newUser=>{
          req.session.user = newUser
          res.json({id: newUser.todo.find(todo=>todo._id == todoId).todoList.find(todo=>todo.tag == tagName)._id, date: updateDate})
        }).catch(error=>{
          res.json({error:error})
        })
      }else{
        res.json({error:1})
      }
    
    }else{
      res.json(10)
    }
    });

    // get todo list using its id
  router.get('/:id', function(req, res, next) {
    let todoId = req.params.id
    
    let todo = req.session.user.todo.find(todo=> todo._id == todoId)
    if(todo){
      //todo.createdDate = (new Date(todo.createdDate)).toISOString()
      //todo.createdDate = (new Date(todo.updatedDate)).toISOString()
      res.render('todolist',{todo:todo})
    }else{
      res.redirect('/error')
    }
  });
  
  router.post('/delettodotag', function(req, res, next) {
    let todoId = req.body.todoid
    let tagId = req.body.tagid
    let todoIdValidate = validate(todoId, {required: true})
    let tagIdValidate = validate(tagId, {required: true})
    
    if(todoIdValidate.check && tagIdValidate.check){
      let checkUniq = true
      req.session.user.todo.find(todo=>todo._id==todoId).todoList.forEach(tag => {
        if(tag.id === tagId){
          checkUniq= false
        }
      }); 
      if(checkUniq){
        let currentDate = new Date()
        User.deletTodoTag(req.session.user._id, todoId, tagId, currentDate ).then(newUser=>{
          req.session.user = newUser
          res.json({result:'ok', date: currentDate})
        }).catch(error=>{
          res.json({error:error})
        })
      }else{
        res.json({error:1})
      }
    
    }else{
      res.json(10)
    }
    });

module.exports = router;

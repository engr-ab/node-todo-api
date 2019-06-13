require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _=require('lodash');
const  bcrytp = require('bcryptjs');
//body-paeser.. to send json to the server

const {mongoose} = require('./db/mongoose'); //ES6 destructuring
const {toDo} = require('./models/toDo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT ||3000;

//middleware
app.use(bodyParser.json()); //bodyParser.json() returns a function that is our middleware
//body-parser converts incoming /request json to js object

//users 
//save/post a user
app.post('/users',(req, res)=>{
    const body = _.pick(req.body, ['email', 'password'])
    const user= new User(body);

    user.save()
    .then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send( user.toJSON() ); 
    }).catch((e)=>{
        res.status(400).send({e});
    });
});// post request end

//login user
app.post('/users/login',(req,res)=>{
    var body = _.pick(req.body,['email', 'password']);
    User.findByCredentials(body.email, body.password).then( (user)=>{
        return user.generateAuthToken(user).then((token)=>{ //return keyword here, makes sure to run catch(err) in case of any error
            res.header('x-auth',token).send('new token setting done');
        });
    } ).catch((err)=>{
        res.status(400).send(err)
    });
});

//remove token, logging out
app.delete('/users/me/token',authenticate,(req, res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send('token romoved');
    }).catch((err)=>{
        res.status(400).send(err);
    });
});

//find by token
app.get('/users/me',authenticate,(req,res)=>{
        res.send(req.user);
});

//post todo
app.post('/todos',authenticate,(req, res)=>{

    const newToDo= new toDo({
        text: req.body.text,
        _creator:req.user._id
    });

    newToDo.save()
    .then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
 
}); //post todos end

app.get('/todos',authenticate, (req,res)=>{
    toDo.find({
        _creator:req.user._id
    }).then((todos)=>{
        res.send({
            // env:process.env.NODE_ENV,
            // mongodb_uri:process.env.MONGODB_URI,
            todos_length:todos.length,
            todos,
        });
    }, (e)=>{
        res.status(400).send(e);
    });
});

//get todo with id
app.get('/todos/:id',authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  toDo.findOne({
      _id:id,
      _creator:req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id',authenticate, (req,res)=>{
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send({error:"bad id"});
    }

    // toDo.findByIdAndRemove(id)
    toDo.findOneAndRemove({
        _id:id,
      _creator:req.user._id
    })
    .then((todo)=>{
        if(!todo){
            return res.status(404).send({error:"not found"});
        }
        res.send({todo});
        
    }).catch((err)=>{
        res.status(400).send(err);
    });
});//delete request end

//patch request
app.patch('/todos/:id',authenticate,(req,res)=>{
    const id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(400).send({error:"invalid id"});
    }
                //.pick(take_object,['pull desried 1 or more properties']); it will return object with extractted properties
    const body = _.pick(req.body,['text','completed']);
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt= new Date().getTime();
    }else{
        body.completed=false;
        body.completedAt=null;
    }
    //update {new :true} is saying return us new updated todo.
    toDo.findOneAndUpdate({_id:id, _creator:req.user._id },{$set:body},{new:true})
    .then((todo)=>{
        if(!todo){
            return res.status(404).send({error:"NOT FOUND"});
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send(e);
    });
});



app.listen(port, ()=>{
    console.log(`-----\nserver started at port ${port} ....`);
});


module.exports= {
    app
};
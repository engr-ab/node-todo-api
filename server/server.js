var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
//body-paeser.. to send json to the server

const {mongoose} = require('./db/mongoose'); //ES6 destructuring
const {toDo} = require('./models/toDo');
const {user} = require('./models/user');


var app = express();
const port = process.env.PORT ||3000;

//middleware
app.use(bodyParser.json()); //bodyParser.json() returns a function that is our middleware
//body-parser converts incoming /request json to js object


app.post('/todos',(req, res)=>{

    const newToDo= new toDo({
        text: req.body.text
    });

    newToDo.save()
    .then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
 
}); //post todos end

app.get('/todos', (req,res)=>{
    toDo.find().then((todos)=>{
        res.send({
            todos_length:todos.length,
            todos,
        });
    }, (e)=>{
        res.status(400).send(e);
    });
});

//get todo with id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  toDo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.post('/user',(req, res)=>{
    const newUser= new user({
        email: req.body.email,
        name: req.body.name
    });

    newUser.save()
    .then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.send(err);
    });
});// post request end

app.delete('/todos/:id', (req,res)=>{
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send({error:"bad id"});
    }

    // toDo.findByIdAndRemove(id)
    toDo.findOneAndDelete({'_id':id})
    .then((todo)=>{
        if(!todo){
            return res.status(404).send({error:"not found"});
        }
        res.send({todo});
        
    }).catch((err)=>{
        res.status(400).send(err);
    });
});

app.listen(port, ()=>{
    console.log(`-----\nserver started at port ${port} ....`);
});


module.exports= {
    app
};
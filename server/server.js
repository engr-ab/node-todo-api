var express = require('express');
var bodyParser = require('body-parser');
//body-paeser.. to send json to the server

const {mongoose} = require('./db/mongoose'); //ES6 destructuring
const {toDo} = require('./models/toDo');
const {user} = require('./models/user');


var app = express();

//middleware
app.use(bodyParser.json()); //bodyParser.json() returns a function that is our middleware
//body-parser converts incoming /request json to js object


app.post('/todo',(req, res)=>{
    const newToDo= new toDo({
        text: req.body.text
    });

    newToDo.save()
    .then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
 
}); //post end

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

app.listen(3000, ()=>{
    console.log('-----\nserver started at port 3000....');
});



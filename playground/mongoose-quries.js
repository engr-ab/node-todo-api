const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');

const {toDo} = require('./../server/models/toDo');

var id ='5cc170c7b9c9d4250883c322';

if(!ObjectID.isValid(id)){ //it will not check that id not exists in daatabase, rather it will check id format:number of digits , and also allowed digits/letters
    return console.log('Invalid id');
}

/*toDo.find({
    _id: id
}).then((todos)=>{
    console.log('todos by id',todos);
});


toDo.findOne({
    _id: id
}).then((todo)=>{
    console.log('single todo by id',todo);
});*/


toDo.findById(id).then((todo)=>{
    if(!todo){
       return  console.log('Id not found');
    }
    console.log('todos by findById',todo);
});
const mongoose = require('mongoose');

var toDo = mongoose.model('to_dos_app',{ //2nd argument to model is a schema 
    //in model() first argument is a collection name and it will add 's' 'todo' => 'todos' if 's' is not last later 'us' => 'us', 'use'=>'uses'
    text:{
        type: String,  // due to type casting in mongoose a number here will be converted to a string automatic
        required: true,
        minlength: 3,
        trim: true //leading and trailing spaces removed
    },
    completed:{
        type : Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    }
}); //model end

module.exports={
    toDo
}

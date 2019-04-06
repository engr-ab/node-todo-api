const mongoose = require('mongoose');

const user = mongoose.model('user',{
    name:{
        type: String,
        required:true,
        minlength:3,
        trim: true
    },
    email:{
        type: String,
        required: true,
        minlength: 5,
        trim:true
    }
});

module.exports={
    user
}

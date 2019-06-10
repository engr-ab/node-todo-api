const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//created schema so that we can add methods on it
var UserSchema = new mongoose.Schema({
   
    email:{
        type: String,
        required: true,
        minlength: 5,
        trim:true,
        unique: true,
        validate: {
            validator:validator.isEmail,
            message:`{VALUE} is not a valid email`
        }
    },
    password:{
        type: String,
        require:true,
        minlength: 6
    },
    tokens:[{
        access:{
            type: String,
            required:true,
        },
        token:{
            type:String,
            required: true
        }
    }] 
});

//what exactly sent back when a model is mongoose converted to json
//overriding toJSON()
UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject(); //convert to regular object

    return _.pick(userObject, ['_id' , 'email']);
};

//jwt.sign returns an object
UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access ='auth';
    var token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123').toString();

    //push to tokens array, ES6 syntax
    user.tokens.push({access, token});
    return user.save().then(()=>{
        return token;
    });
};
UserSchema.statics.findByToken = function (token){
    var User = this;
    var decoded ;

try{
    decoded = jwt.verify(token, 'abc123');
}catch(e){
    // return new Promise((resolve, reject) =>{
    //     reject(e);
    // });
    return Promise.reject(e);
    
}
return User.findOne({
   _id: decoded._id,
   'tokens.token':token,
   'tokens.access': 'auth' 
});
};

//model methods e.g User.find by token();, instance methods {apply on each individual instance} user.generateAuthToken
var User = mongoose.model('users',UserSchema);

module.exports={
    User
}

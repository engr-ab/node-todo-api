const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrytp = require('bcryptjs');

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

//model method
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

//find by credentials
UserSchema.statics.findByCredentials = function(email, password){
    var User = this;
    return User.findOne({email}).then( (user)=>{
        if(!user){
            return Promise.reject('user not found!');
        }
        return new Promise((resolve, reject)=>{
             bcrytp.compare(password, user.password, (err, res)=>{
                if(res===true){
                    return resolve (user);
                }
                return  reject('Password wrong');
            });
        });
       
    } );
};

//mongoose middleware, run before 'save' event
UserSchema.pre('save', function (next){
    var user = this;
    if(user.isModified('password')){
        bcrytp.genSalt(10, (err ,salt)=>{
            bcrytp.hash(user.password,salt,(err,hash)=>{
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

//model methods e.g User.find by token();, instance methods {apply on each individual instance} user.generateAuthToken
var User = mongoose.model('users',UserSchema);

module.exports={
    User
}

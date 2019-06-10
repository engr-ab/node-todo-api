const {User} = require('../models/user');

//middleware
var authenticate = (req,res,next)=>{
    var token = req.header('x-auth');
    
    User.findByToken(token)
    .then((user)=>{ //if promise rejected, sucess case(this then) callback will not be fired
        if(!user){
            res.status(401).send();  
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e)=>{
        res.status(401).send();
    });

} ;

module.exports={
    authenticate
}

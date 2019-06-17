const config = require('./config.json');
//default env  only exists for test and production
var env = process.env.NODE_ENV || "development";
if(env === "development" || env ==="test" ){
    envConfig = config[env];
    Object.keys(envConfig).forEach((key)=>{
        process.env[key] = envConfig[key];
    })
}

// if(env === "development"){
//     process.env.PORT = config[env].PORT;
//     process.env.MONGODB_URI = config[env].MONGODB_URI;
// }else if(env === "test"){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/todos_api_test';
// } 
// console.log("env***** ",env);
// console.log("mongodb_uri", process.env.MONGODB_URI);
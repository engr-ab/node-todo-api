//for production, default
process.env.MONGODB_URI= 'mongodb://admin:admin123@ds157256.mlab.com:57256/node-todos-api';

var env = process.env.NODE_ENV || "development";
if(env === "development"){
    process.env.NODE_ENV = "development";
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/todos_api';
}else if(env === "test"){
    process.env.NODE_ENV ="test";
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/todos_api_test';
}
// console.log("env***** ",env);
// console.log("mongodb_uri", process.env.MONGODB_URI);
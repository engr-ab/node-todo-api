const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(   encodeURI('mongodb://admin:admin123@ds157256.mlab.com:57256/node-todos-api') ||'mongodb://localhost:27017/to_dos_app', {useNewUrlParser: true});
//mongodb+srv://admin:<password>@node-todo-api-l4qzk.mongodb.net/test?retryWrites=true
//encodeURI('mongodb+srv://admin:Public-1-2-3@node-todo-api-l4qzk.mongodb.net/test?retryWrites=true')
module.exports={
    mongoose
}

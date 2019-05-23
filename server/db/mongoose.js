const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//for heroku mlab add_ons
// mongoose.connect(   process.env.MONGODB_URI ||'mongodb://localhost:27017/to_dos_app', {useNewUrlParser: true});

//if using mlab direct link
mongoose.connect(   encodeURI('mongodb://admin:admin123@ds157256.mlab.com:57256/node-todos-api'), {useNewUrlParser: true});

//for local database, without internet
// mongoose.connect('mongodb://localhost:27017/to_dos_app', {useNewUrlParser: true});

//encodeURI('mongodb+srv://admin:Public-1-2-3@node-todo-api-l4qzk.mongodb.net/test?retryWrites=true')

module.exports={
    mongoose
}

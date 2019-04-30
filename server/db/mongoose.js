const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/to_dos_app', {useNewUrlParser: true});

module.exports={
    mongoose
}

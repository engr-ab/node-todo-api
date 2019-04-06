const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDosApp' ,(err, db)=>{
    if(err){
        return console.log('cannot connect to the server'),err;
    }

    console.log('Server is connected');

    db.collection('toDos').findOneAndUpdate(
        {_id: new ObjectID('5c9f18737b8ab9132047103a')},
        { $set:{
            name: 'practice node',
            completed:true
        }},
        {returnOriginal:false}) //true  mean old value in database before update
        .then((result)=>{
            console.log(result);
        }, (err)=>{
            console.log('Cannot update',err);
        });

        //close connection
        db.close();
});
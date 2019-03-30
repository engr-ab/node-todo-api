const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDosApp', (err, db)=>{
    if(err){
        return console.log('cannot connect to database',err);
    }
    console.log('server is connected...');

    db.collection('toDos')
    .find()
    .toArray()
    .then((docs)=>{
        docs.forEach((doc)=>{
            console.log(doc._id+"  "+doc.name+"  "+doc.completed);
        });
    },(err)=>{
        console.log('error occured',err);
    });

    //close connection
    db.close();
});
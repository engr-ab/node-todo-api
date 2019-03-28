const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/ToDoApp", (err, db)=>{
    if(err){
        return console.log('unable to connect to mongodb',err);
    }

    console.log('Connected to mongodb...');
    db.collection('ToDos')
    .insertOne({
                name: 'Abdur Rehman',
                age: 27
                }, (err,result)=>{
        if(err){
            return console.log('unable to insert document',err);
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });

    db.close();

});//MongoClient.connect end.
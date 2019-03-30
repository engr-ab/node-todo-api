const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDosApp',(err, db)=>{
    if(err){
        return console.log('unable to connect to mongodb server',err);
    }
    console.log('\n mongodb server connected');
    
    //insert one
    // db.collection('toDos')
    // .insertOne({
    //     name:'Eat lunch',
    //     completed: true
    // },(err, result)=>{
    //    if(err){
    //        return console.log('----\n cannot insert todo',err);
    //    }
    //    console.log('------\n Todo Inserted',JSON.stringify(result.ops,undefined,2));
    // });

     //insert one with promise
     db.collection('toDos')
     .insertOne({
         name:'Eat food 9',
         completed: false
     })
     .then((result)=>{
        console.log('------\n Todo Inserted',JSON.stringify(result.ops,undefined,2));

      }, (err)=>{
        console.log('----\n cannot insert todo',err);
     });
 

    //count
    db.collection('toDos')
    .find()
    .count()
    .then((count)=>{
      console.log(`-----------------\ntotal todos are ${count}`);
      }, (err)=>{
        console.log(`---------------\ncannot count todos`,err);
    
    });

     //close the server
    db.close();
});
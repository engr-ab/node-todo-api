//http://mongodb.github.io/node-mongodb-native/2.2/api/
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/testdb', (err, db)=>{
   if(err){
       return console.log('****unable to connect to mongodb', err);
   }//if(err) end
   console.log('\n***********you are connected to mongodb');

   //do some task after connection
   //add document to database
//   db.collection('users')
//    .insertOne({name :'ramzan', age:27}, (err, result)=>{ 
//        if(err){
//            return console.log('cannot insert',err);
//        }
//         console.log('****** inserted document:\n', JSON.stringify(result.ops));
    

//    });//inserOne end



    //find from database  query
   db.collection('users')
   .find({
        //    name:'ramzan'
        //_id in database is not a string  , it's and object id
        _id: ObjectID('5c9c614def08b808c8fcdc1a')
    })
   .toArray()
   .then((docs)=>{
       console.log('docs');
       console.log(docs);
      },(err)=>{
       console.log('unable to fetch',err)
    });

//count from database query
db.collection('users')
.find()
.count()
.then((count)=>{
    console.log('\ntotal docs:');
    console.log(count);
  },(err)=>{
    console.log('unable to count', err);
});
   //close connection
   db.close(()=>{
       console.log('\n*****connection closed!');
   });
});//connect end


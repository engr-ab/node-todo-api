const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDosApp',(err, db)=>{
    if(err){
        return console.log('unable to connect to mongodb server',err);
    }
    console.log('\n mongodb server connected');

    //count
    count("----- \n todos before deleting" ,db);

    //deleteMany
    // db.collection('toDos')
    // .deleteMany({name:'Eat lunch'}) //willl delete all without argument
    // .then((result)=>{
    //     console.log('----- \n todos deleted');
    //     // console.log(result);

    // },(err)=>{
    //     console.log('cannot delete todos');
    // });

    //deleteOne
    // db.collection('toDos')
    // // .deleteOne({name:'Eat food 5'}) //it will delete 1 also without argument
    // .deleteOne() //deletes in FIFO (first in first out way)
    // .then((result)=>{
    //     console.log('----- \n todos deleted');
    //     // console.log(result);

    // },(err)=>{
    //     console.log('cannot delete todos');
    // });

    //findOneAndDelete
    //it also gives data back, that is deleted by this function
    db.collection('toDos')
    .findOneAndDelete({name:'Eat food 3'})
    .then((result)=>{
        console.log(result);
    }, (err)=>{
        console.log('error, cannot delete',err);
    });

    // db.collection('toDos')
    // .findOneAndDelete({name:'Eat lucch'})
    // .then((result)=>{
    //     consolse.log('todo deleted');
    // },()=>{
    //     console.log('Error: cannot delete todo');
    // });

     //count after deletion 


     count("-----\n todos after deleting" ,db);
     //close the server
    db.close();

});


  //count todos function
const  count = (msg ,db)=>{
    db.collection('toDos')
    .find()
    .count()
    .then((count)=>{
        console.log(msg+' '+count);
    }, (err)=>{

    });
};
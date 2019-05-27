const {mongoose} = require('../server/db/mongoose');
const {ObjectID} = require('mongodb');

const {toDo} = require('../server/models/toDo');
//delete all or delete some 
// toDo.remove({}).then((result)=>{
//  console.log(result);
// },(err)=>{
//     console.log(err);
// });

// //delete one
// toDo.findOneAndRemove({_id:'5ce7965c1629ad001610ac9a'})
// .then((result)=>{
//       console.log(result);
//      },(err)=>{
//          console.log(err);
//      });

     //delete one
toDo.findByIdAndRemove('5ce7966b1629ad001610ac9b')
.then((result)=>{
      console.log(result);
     },(err)=>{
         console.log(err);
     });


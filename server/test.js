
const MongoClient = require('mongodb').MongoClient;
const uri = encodeURI("mongodb+srv://admin:admin@to-dos-api-l4qzk.mongodb.net/test?retryWrites=true");
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

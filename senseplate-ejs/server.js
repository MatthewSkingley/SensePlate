const express = require('express')
let MongoClient = require('mongodb').MongoClient;
let ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const app = express()
const port = 3000
const url = 'mongodb://senseplate:project19@127.0.0.1:27017/';

app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.set('view engine', 'ejs');

MongoClient.connect(url, function(err, client){
   if(err) throw err;
   
   let db = client.db('data');
   db.collection('foods').find().toArray(function(err, result){
     if(err) throw err;
    //  console.log(result);
     client.close();
   });
});

// app.get('/', (req, res) =>{
//     MongoClient.connect(url, function(err, client){
//         if(err) throw err;
//         let db = client.db('data');
//         db.collection("foods").find().toArray((err, result) =>{
//         if(err) throw err;
//         res.render('index.ejs', {foods: result}) //use mongoose instead
//         })
//     client.close();
//     })
// })

var Schema = mongoose.Schema;

var schema = new Schema(
{
    Timestamp: Date,
    Food: String,
    Weight: Number
});

//Using mongoose  we have pure JSON, no need to hack it in
app.get('/', (req,res) =>{
    mongoose.connect('mongodb://senseplate:project19@127.0.0.1:27017/data',{
    useNewUrlParser: true,
    useUnifiedTopology: true }
    );
    var db = mongoose.connection;
    // console.log(db);
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    var Model = mongoose.model('food', schema);
    Model.find(({}), (err, result) => {
    if (err) return handleError(err);
    console.log(result);
    res.render('index.ejs', {foods: result});
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
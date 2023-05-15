const express = require('express')
const mongoose = require('mongoose'); 
const Record = require('./models/record');

const app = express()

const dbURI = 'mongodb+srv://eric:hiphop200199@cluster0.yqpvasi.mongodb.net/playboy-go-away?retryWrites=true&w=majority'
mongoose.connect(dbURI).then(()=>app.listen(3000)).catch((err)=>console.log(err))


app.use(express.json());

app.post('/add-record',(req,res)=>{
   
    const record = new Record({
        name:req.body.name,
        score:req.body.score,
        description:req.body.description,
        date:req.body.date
    })
    record.save()
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
})

app.get('/read-records',(req,res)=>{
    Record.find().then(result=>res.send(result.json())).catch(err=>console.log(err))
})

app.use((req,res)=>{
    res.status(404).send('<h1>404</h1>');
    
})
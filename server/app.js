const express = require('express');
const mongoose = require('mongoose'); 
const Record = require('./models/Record');
const app = express();

app.use(express.json());

const dbURI = 'mongodb+srv://eric:hiphop200199@cluster0.yqpvasi.mongodb.net/playboy-go-away?retryWrites=true&w=majority';
mongoose.connect(dbURI,{
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(()=>{
    console.log('connected to mongodb successed.');
    app.listen(3001);
}).catch((err)=>console.log(err))

app.get('/',(req,res)=>{
   
    res.send('<h1>Backend running.</h1>');
})

app.post('/add-record',(req,res)=>{
  
    const record = new Record({
        name:req.body.name,
        score:req.body.score,
        description:req.body.description,
        date:req.body.date
    })
    record.save()
    .then(result=>{
        console.log(result)
      
        res.send('<h1>Post ok.</h1>');
    })
    .catch(err=>console.log(err))
})

app.get('/read-records',(req,res)=>{
  
    Record.find().then(data=>{
    
        res.json(data);
    }).catch(err=>console.log(err))
})


module.exports=app;
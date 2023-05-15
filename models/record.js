const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    score:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
});

const Record = mongoose.model('record',recordSchema);
module.exports=Record;
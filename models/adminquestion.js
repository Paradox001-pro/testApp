const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    question:{
        type: String,
    },
    opt1:{
        type: String,
    },
    opt2:{
        type: String,
    },
    opt3:{
        type: String,
    },
    opt4:{
        type: String,
    },
    answer:{
        type: String,
    },
    instruction:{
        type: String,
    },
    time:{
        type: String,
    },
    title:{
        type: String,
    },
    date:{
        type: Date,
        default:Date.now
    }
});

let AdminQuestion = module.exports = mongoose.model('AdminQuestion', AdminSchema);
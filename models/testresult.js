const mongoose = require('mongoose');

const ResultSchema = mongoose.Schema({
    testResultPercent:{
        type: String,
    },
    testResultScore:{
        type: String,
    },
    user:{
        type: String,
    },
    title:{
        type: String
    },
    name:{
        type: String
    },
    dateSubmited:{
        type: Date,
        default:Date.now()
    }
});

let TestResult = module.exports = mongoose.model('TestResult', ResultSchema);
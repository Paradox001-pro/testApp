const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname:{
        type: String,
    },
    lastname:{
        type: String,
    },
    othername:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    admincode:{
        type: String,
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    date:{
        type: Date,
        default: Date.now()
    }
});


let User = module.exports = mongoose.model('User', UserSchema)


// module.exports = { 
//     User: mongoose.model('User', UserSchema)
// };
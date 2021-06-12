const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type: String
    },
    email:{

    },
    password:{

    },
    confirmPassword:{

    }
})

module.exports = mongoose.model('User', userSchema);
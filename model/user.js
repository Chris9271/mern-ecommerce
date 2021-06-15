const mongoose = require('mongoose');
// When try to save user to mongoDB, if there have the same data store in db
// uniqueValidator will return error
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

//Apply the uniqueValidator plugin to userSchema
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
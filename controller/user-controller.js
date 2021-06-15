const {validationResult} = require('express-validator');
const User = require('../model/user');
const HttpError = require('../model/httpResponse');

exports.addUser = async(req, res, next) => {
    // return the req after being validate
    const result = validationResult(req);
    // a boolean indicate result object contain errors or not
    if(!result.isEmpty()){
        console.log(result)
    }

    const {username, email, password} = req.body;
    let newUser;
    try{
        newUser = await User.findOne({email})
    }catch(err){
        console.log(err)
    }

    if(newUser){
        return next(new HttpError(422, 'This user is already exist'))
    }

    const createUser = new User({
        username,
        email,
        password
    })

    try{
        await createUser.save();
        console.log(createUser)
    }catch(err){
        console.log(err)
    }
    res.status(201).json(createUser)
}


exports.userLogin = async(req, res, next) => {
    const {email, password} = req.body;
    console.log(req.body)
    let checkUser;
    try{
        checkUser = await User.findOne({email})
        console.log(req.session)
    }catch(err){
        return next(new HttpError(500, 'Login failed, please try again...'))
    }

    if(!checkUser || checkUser.password !== password){
        return next(new HttpError(401, 'Invalid credential'))
    }
    res.status(200).json(checkUser);
}
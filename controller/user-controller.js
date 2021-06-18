const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt'); // To safely store password 
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
    let hashPassword;
    let createUser;
    try{
        newUser = await User.findOne({email})
        if(newUser){
            return next(new HttpError(422, 'This user is already exist'))
        }
        // encrypt data with specific saltRound to generate hash data
        hashPassword = await bcrypt.hash(password, 12);
        createUser = new User({
            username,
            email,
            password: hashPassword
        })
        await createUser.save();
    }catch(err){
        console.log(err)
    }
    res.status(201).json(createUser)
}


exports.userLogin = async(req, res, next) => {
    const {email, password} = req.body;
    let checkUser;
    let hashPassword;
    try{
        checkUser = await User.findOne({email})
        if(!checkUser){
            return next(new HttpError(500, 'User is not exist'))
        }
        // compare data and hash(散列) data return boolean result
        hashPassword = await bcrypt.compare(password, checkUser.password)
            if(!hashPassword){
                return next(new HttpError(500, 'Password not match'))
                // req.session.user = checkUser
                // req.session.save();
            }
    }catch(err){
        console.log(err)
        return next(new HttpError(500, 'Login failed, please try again...'))
    }
    res.status(200).json(checkUser)
}

// exports.userLogout = (req, res, next) => {
    // console.log(req.session)
    // req.session.destroy(err => {
    //     console.log(err)
    // })
    // res.status(200).json()
// }
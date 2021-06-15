const express = require('express');
const userController = require('../controller/user-controller');
const {check} = require('express-validator');
const router = express.Router();

router.post('/sign',[
    check('username').notEmpty().withMessage('Please enter username'),
    check('email').normalizeEmail().isEmail().withMessage('Please enter valid email'),
    check('password').isLength({min: 8}).withMessage('Please check password length')
],userController.addUser)

router.post('/login', userController.userLogin)

module.exports = router;

const {User} = require('../models/models');
const {validate_email, validate_password, validate_name} = require('../util/validator');
const {addUser, getUserByEmail} = require('../services/userService')
const {generateAccessToken} = require('../util/authLib')
const {auth_cookie_key, cookie_options, STAT_400, STAT_200} = require('../util/constants')

exports.signUp = async (req, res) => {

    // get user info and verify
    let user = Object.create(User);
    let status = STAT_400
    let content = ''

    user.email = req.body.email;
    user.firstname = req.body.firstname
    user.lastname = req.body.lastname
    user.password = req.body.password
    user.registration_date = (new Date())

    firstname_is_valid = validate_name(user.firstname);
    lastname_is_valid = validate_name(user.lastname);
    email_is_valid = validate_email(user.email);
    password_is_valid = validate_password(user.password);
    
    if(firstname_is_valid && lastname_is_valid && email_is_valid && password_is_valid){

        let result = await addUser(user);
        if(result != undefined){
            let accessToken = generateAccessToken(result.id, result.email, false)
            res.cookie(auth_cookie_key, accessToken, cookie_options)
            status = STAT_200
        }
        else{
            content = "Couldn't create user profile. Please try again"
        }
    }else{
        content = "Invalid User Credentials"
    }

    res.status(status).send(content)
}

exports.login = async (req, res) => {

    //TODO: Look into third party sign ons like google...

    let status = STAT_400
    let content = ''

    emailIsValid = validate_email(req.body.email);
    passwordIsValid = validate_password(req.body.password);

    if(emailIsValid && passwordIsValid){
        let user = await getUserByEmail(req.body.email)
        if(user != undefined){
            status = STAT_200
            access_token = generateAccessToken(user.id, user.email, true);
            res.cookie(auth_cookie_key, access_token, cookie_options);
        }else{
            content = 'A user with the given email does not exist'
        }
    }else{
        content = 'Invalid email or password'
    }

    res.status(status).send(content);
}
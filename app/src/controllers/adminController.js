const admin_service = require('../services/adminService');
const {get_decoded_data, generateAccessToken} = require('../util/authLib');
const validator = require('../util/validator');
const { cookie_options, STAT_400, STAT_200, auth_cookie_key } = require('../util/constants');

exports.getAdmin = async (req, res) => {
    // TODO: Remove after development. THIS FUNCTION IS ONLY FOR TESTING PURPOSES
    admin = await admin_service.get_admin(req.body.email);
    res.status(200).send(admin);
}

/**
 * Pre-conditions:
 * - Requestbody 
 *  - Request body must contain email and password
 *  - Header must contain the csrf token(key = XSRF-TOKEN)
 *  - Email must be valid (ref: util/validator.js)
 *  - Password must be valid (ref: util/validator.js)

 * 
 * Post-conditions:
 *  - An attempt will be made to add an admin to the DB.
 *  - On success, a success response is sent and a token is sent to the user via a secure cookie(key = PASSPORT).
 *  - On failure, an error response containing information on what went wrong.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.registerAdmin = async (req, res) => {
    let content = ''
    let status = STAT_400
    let admin = undefined

    emailIsValid = validator.validate_email(req.body.email);
    passwordIsValid = validator.validate_password(req.body.password);

    if(emailIsValid && passwordIsValid){
        admin_exists = await admin_service.verify_admin_exists(req.body.email)
        if(admin_exists){
            content = 'An admin with the same email already exists'
        }
        else{
            admin = await admin_service.add_admin(req.body.email, req.body.password)
            if(admin.email == req.body.email){
                status = STAT_200
                access_token = generateAccessToken(admin.id, admin.email, true);
                res.cookie(auth_cookie_key, access_token, cookie_options);
            }else{
                content = 'Could not create admin, please try again'
            }
        }
    }else{
        content = 'Invalid email or password'
    }
 
    res.status(status).send(content);
};

/**
 * Pre-conditions:
 * - Requestbody 
 *  - Request body must contain email and password
 *  - Header must contain the csrf token(key = XSRF-TOKEN)
 *  - Email must be valid (ref: util/validator.js)
 *  - Password must be valid (ref: util/validator.js)

 * 
 * Post-conditions:
 *  - An attempt will be made to verify that the admin exists
 *  - On success, a success response is sent and a token is sent to the user via a secure cookie(key = PASSPORT).
 *  - On failure, an error response containing information on what went wrong.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.loginAdmin = async (req, res) =>{

    let status = STAT_400
    let content = ''

    emailIsValid = validator.validate_email(req.body.email);
    passwordIsValid = validator.validate_password(req.body.password);
    if(emailIsValid && passwordIsValid){
        admin = await admin_service.get_admin(req.body.email)
        if(admin.email == req.body.email){
            status = STAT_200
            access_token = generateAccessToken(admin.id, admin.email, true);
            res.cookie(auth_cookie_key, access_token, cookie_options);
        }else{
            content = 'An admin with the given email does not exist'
        }
    }else{
        content = 'Invalid email or password'
    }

    res.status(status).send(content);
}
/**
 * Pre-conditions:
 * - Requestbody 
 *   - Must contain email and password
 *   - Email must be valid. (ref: util/validator.js)
 *   - Password must be valid. (ref: util/validator.js)
 * - Header 
 *   - Must contain the csrf token. (key = 'XSRF-TOKEN')
 *   - Must contain the Authorization token
 * 
 * Post-conditions:
 *  - An attempt will be made to delete an admin
 *  - On Success, a success response is sent
 *  - On failure, an error response containing information on what went wrong
 * 
 * @param {*} req
 * @param {*} res
 */
exports.deleteAdmin = async (req, res) => {

    let status = STAT_400
    let content = ''
    const access_token = req.get('Authorization')
    console.log(access_token)

    if(access_token != undefined){

        user_info = get_decoded_data(access_token);
        console.log(user_info);
        email_is_valid = validator.validate_email(req.body.email);
        password_is_valid = validator.validate_password(req.body.password);

        if(req.body.email == user_info['email'] && email_is_valid && password_is_valid){
            isSuccess = await admin_service.delete_admin(req.body.email);
            status = isSuccess? STAT_200: STAT_400
        }else{
            status = STAT_400
            content = 'Invalid email or password'
        }
    }

    res.status(status).send();
}

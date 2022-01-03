const password_validator = require('password-validator')
const email_validator = require('email-validator')

const schema = new password_validator();

schema
.is().min(8)// Minimum length 8
.is().max(100)// Maximum length 100
.has().uppercase()// Must have uppercase letters
.has().lowercase()// Must have lowercase letters
.has().digits(2)// Must have at least 2 digits
.has().not().spaces()// Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123', 'Password']);

/**
 * 
 * @param {string} password 
 */
exports.validate_password = (password) => {
    return schema.validate(password);
}

/**
 * 
 * @param {string} email 
 */
exports.validate_email = (email) => {

    return email_validator.validate(email);
}
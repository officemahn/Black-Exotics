const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs')
const model = require('../models/models')

/**
 * 
 * @param {string} user_id 
 * @param {string} email 
 * @param {boolean} isAdmin 
 * @returns string
 */
exports.generateAccessToken = (id, email, isAdmin) => {
  let token = undefined

  if(id!=undefined || email != undefined) {

    let object = isAdmin? {'id': id, 'email': email, 'role':'admin'}: {'id': id, 'email': email, 'role':'user'}
    token = jwt.sign({'id': id, 'email': email, 'role':'admin'}, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_LIFESPAN});
  }

  return token
}

/**
 * 
 * @param {string} token 
 * @returns {JSON}
 */
exports.get_decoded_data = (token) => {

  result = undefined
  jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET, (err, payload) => {

    if(err){
      console.log(err)
    }else{
      result = payload
    }
  });

  return result
}

/**
 * 
 * @param {string} password
 * @returns {string}
 */
exports.get_hashed_password = async (password) => {
  
  return bcrypt.hash(password, 10)
}

/**
 * 
 * @param {string} password1 
 * @param {string} password2 
 * @returns {boolean}
 */
exports.isSamePassword = async (password1, password2) => {

  bcrypt.compare(password1, password2)
  .then(result => {
    return result
  })
}
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

  if(id != undefined && email != undefined && typeof isAdmin == 'boolean') {

    let object = isAdmin? {'id': id, 'email': email, 'role':'admin'}: {'id': id, 'email': email, 'role':'user'}
    token = jwt.sign(object, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_LIFESPAN});
  }

  return token
}

/**
 * 
 * @param {string} token 
 * @returns {JSON}
 */
exports.get_decoded_data = async (token) => {

  result = undefined
  if(token != undefined){
    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
      if(err){
        console.log(err)
      }else{
        result = payload
      }
    });
  }
  return result
}

/**
 * 
 * @param {string} password
 * @returns {string}
 */
exports.get_hashed_password = async (password) => {
  result = undefined
  if(password != undefined){
    result = await bcrypt.hash(password, 10)
  }

  return result
}

/**
 * 
 * @param {string} password 
 * @param {string} hash 
 * @returns {boolean}
 */
exports.isSamePassword = async (password, hash) => {
  let isMatch = false
  if(password != undefined && hash != undefined){
    if(password.length < hash.length){
      isMatch = await bcrypt.compare(password, hash)
    }
  }
  return isMatch
}
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// get config vars
dotenv.config();

// TODO: We might want to sign the jwt with an object consisting of some of the user's attributes
export function generateAccessToken(user_id: string, firstname: string, lastname: string) {

  let object = {id: user_id, name: lastname + firstname}
  return jwt.sign(object, process.env.TOKEN_SECRET, { algorithm: "HS256", expiresIn: process.env.ACCESS_TOKEN_LIFESPAN});
}

export function generateRefreshToken(user_id: string, firstname: string, lastname: string){

  let object = {id: user_id, name: lastname + firstname}
  return jwt.sign(object, process.env.TOKEN_SECRET, { algorithm: "HS256", expiresIn: process.env.REFRESH_TOKEN_LIFESPAN});
}
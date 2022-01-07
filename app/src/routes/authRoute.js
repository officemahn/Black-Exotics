const express = require('express');
const {signUp, login} = require('../controllers/auth_controller');
const router = express.Router();
const {verifyUserExists} = require('../services/userInfoService')
router.get('/', function(req, res){
    res.send('Hello from BlackXotics!');
});

router.post('/signup', signUp);
router.post('/login', login)
module.exports = router;
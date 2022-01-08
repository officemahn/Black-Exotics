const express = require('express');
const {signUp, login} = require('../controllers/authController');
const router = express.Router();
router.get('/', function(req, res){
    res.send('Hello from BlackXotics!');
});

router.post('/signup', signUp);
router.post('/login', login)
module.exports = router;
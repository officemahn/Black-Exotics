const express = require('express');
const auth_controller = require('../controllers/auth_controller');
const router = express.Router();

router.get('/', function(req, res){
    res.send('Hello from BlackXotics!');
});


module.exports = router;
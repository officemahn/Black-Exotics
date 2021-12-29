const express = require('express');
const router = express.Router();
const admin_controller = require('../controllers/admin_controller');

router.post('/', admin_controller.create_admin);
router.delete('/', admin_controller.delete_admin);
module.exports = router;


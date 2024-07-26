const express = require('express');
const { getUsers, testUserRoute } = require('../controllers/userController');

const router = express.Router();

router.get('/', testUserRoute);
router.get('/get-users', getUsers);

module.exports = router;

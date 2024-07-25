const express = require('express');
const { addUser, getUsers, testUserRoute } = require('../controllers/userController');

const router = express.Router();

router.get('/', testUserRoute);
router.post('/add-users', addUser);
router.get('/get-users', getUsers);

module.exports = router;

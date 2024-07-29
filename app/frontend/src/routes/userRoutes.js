const express = require('express');
const { getUserById, getUserProgress, getUsers, testUserRoute, updateUserById} = require('../controllers/userController');

const router = express.Router();

router.get('/', testUserRoute);

//get all users
router.get('/all-users', getUsers);

//get user by id
router.get('/:id', getUserById)

//update user by id
router.put('/:id', updateUserById)

//get user progress
router.get('/:id/progress', getUserProgress)

module.exports = router;

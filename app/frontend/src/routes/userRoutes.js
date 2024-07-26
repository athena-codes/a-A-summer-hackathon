const express = require('express');
const { getUserById, getUserProgress, updateUserProgress, getUsers, testUserRoute } = require('../controllers/userController');

const router = express.Router();

router.get('/', testUserRoute);

//get all users
router.get('/all-users', getUsers);

//get user by id
router.get('/:id', getUserById)

//get user progress
router.get('/:id/progress', getUserProgress)

//update user progress
router.put('/:id/progress', updateUserProgress)

module.exports = router;

const express = require('express');
const { getUserById, getUserProgress, getUsers, updateUserById, updateUserProgress } = require('../controllers/userController');
const { getAllQuestionsbyAI } = require('../controllers/aiController');


const router = express.Router();

//get all users
router.get('/all-users', getUsers);

//get user by id
router.get('/:id', getUserById)

//update user by id
router.put('/:id/update', updateUserById)

//get user progress
router.get('/:id/progress', getUserProgress)

//update user progress
router.put('/:id/progress/update', updateUserProgress)


//get all quetions by user id
router.get('/:userId/all-questions', getAllQuestionsbyAI);


module.exports = router;

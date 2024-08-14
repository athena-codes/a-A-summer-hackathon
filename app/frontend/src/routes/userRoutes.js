const express = require('express');
// const { getUserById, getUserProgress, getUsers, updateUserById, updateUserProgress } = require('../controllers/userController');
//const { getAllQuestionsbyAI } = require('../controllers/old-aiController');
const { getUserDecks,getUserDeckById } = require('../controllers/deckController');
const { initializeUserProgressRoute, getUserAttemptById, checkUserAttempt, updateUserAttempt,getUserById, getUserProgress, getUsers, updateUserById, updateUserProgress, getUserAttempts, addUserAttempt } = require('../controllers/userController');

const router = express.Router();

//get all users
router.get('/all-users', getUsers);

//get user by id
router.get('/:id', getUserById)

//update user by id
router.put('/:id/update', updateUserById)

//get user progress
router.get('/:id/progress', getUserProgress)

//initialize user progress
router.post('/:id/progress/initialize', initializeUserProgressRoute)

//update user progress
router.put('/:id/progress/update', updateUserProgress)

//get user decks
router.get('/:uid/decks', getUserDecks)

//get user deck by id
router.get('/:uid/decks/:deckId', getUserDeckById)

// //get all quetions by user id
// router.get('/:userId/all-questions', getAllQuestionsbyAI);

//get user attempts
router.get('/:id/attempts', getUserAttempts)

//check user attempt
router.get('/:userId/attempts/:attemptId/check', checkUserAttempt)

//view user attempt by id
router.get('/:userId/attempts/:attemptId', getUserAttemptById)

//add user attempt
router.post('/:id/attempts/new', addUserAttempt)

//update user attempt
router.put('/:userId/attempts/:attemptId/update', updateUserAttempt)

module.exports = router;

const express = require('express');
const { addCardQuestions, getAllQuestionsbyAI } = require('../controllers/aiController');
const router = express.Router();


router.post('/questions', addCardQuestions);

// router.get('/:userId/all-questions', getAllQuestionsbyAI);







module.exports = router

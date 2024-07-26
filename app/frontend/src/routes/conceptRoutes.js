const express = require('express');
const { getConcepts, addConcept } = require('../controllers/conceptController');
const router = express.Router();

router.get('/all-concepts', getConcepts);

router.post('/add-concept', addConcept);

module.exports = router

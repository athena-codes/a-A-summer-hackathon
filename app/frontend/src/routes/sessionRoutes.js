const express = require('express');
const { createSession, endSession, getSessionProgress, updateSessionProgress } = require('../controllers/sessionController');
const router = express.Router();

router.post('/new', createSession);
router.get('/:sessionId', getSessionProgress);
router.put('/update', updateSessionProgress);
router.put('/end', endSession);


module.exports = router

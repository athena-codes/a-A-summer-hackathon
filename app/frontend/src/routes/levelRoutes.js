const express = require('express');
const { getUserLevel } = require('../controllers/levelController');
const router = express.Router();

// get user level
router.get('/user/:userId', getUserLevel);

module.exports = router

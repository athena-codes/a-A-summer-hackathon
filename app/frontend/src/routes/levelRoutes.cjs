const express = require('express');
const { getUserLevel, getAllUserLevels } = require('../controllers/levelController.cjs');
const router = express.Router();

// get user level
router.get('/user/:uid', getUserLevel);

// get all user levels
router.get('/all', getAllUserLevels);

module.exports = router

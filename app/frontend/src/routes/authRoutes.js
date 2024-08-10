const express = require('express');
const { authenticateUser, registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/current', authenticateUser, (req, res) => {
    res.status(200).json({ message: 'User authenticated', user: req.currentUser });
});
module.exports = router;

const { addUserToDB, getUsersFromDB } = require('../services/userService');

// Controller to handle adding a user
const addUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const userId = await addUserToDB({ name, email });
        res.status(201).json({ message: 'User added', id: userId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    console.log('this route is hit');
    try {
        const users = await getUsersFromDB();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addUser, getUsers };

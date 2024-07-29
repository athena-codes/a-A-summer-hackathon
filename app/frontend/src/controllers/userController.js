const { getUserByIdFromDB, getUsersFromDB, getProgressFromDB, updateUserInDB, addUserToDB, addProgressToDB } = require('../services/userService');

const testUserRoute = (req, res) => {
    console.log('test user route hit');
    try {
        res.status(201).json({ message: 'test user route hit' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    console.log('get users route is hit');
    console.log('req.body: ', req.body);
    try {
        const users = await getUsersFromDB();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, native_language } = req.body;
    try {
        const updated = await updateUserInDB(id, { first_name, last_name, native_language });
        res.status(200).json({ message: 'User updated', updated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a user by user id from DB
const getUserById = async (req, res) => {
    console.log('get user by id route is hit');
    const { id } = req.params;
    try {
        const user = await getUserByIdFromDB(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user progress
const getUserProgress = async (req, res) => {
    const { id } = req.params;
    try {
        const progress = await getProgressFromDB(id);
        res.status(200).json({ progress });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get user progress', details: error.message });
    }
};



module.exports = { getUsers, testUserRoute, getUserProgress, getUserById, updateUserById };

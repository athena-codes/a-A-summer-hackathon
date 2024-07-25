const { addUserToDB, getUsersFromDB } = require('../services/userService');

const testUserRoute = (req, res) => {
    console.log('test user route hit');
    try {
        res.status(201).json({ message: 'test user route hit'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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



module.exports = { addUser, getUsers, testUserRoute };

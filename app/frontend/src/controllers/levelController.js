const { getUserLevelFromDB } = require('../services/levelService');


const getUserLevel = async (req, res) => {
    const { uid } = req.params;
    try {
        const userLevel = await getUserLevelFromDB(uid);
        res.status(200).json(userLevel);
    } catch (error) {
        res.status(500).json({ message: `Error fetching user level: ${error.message}` });
    }
};


module.exports = {
    getUserLevel
}

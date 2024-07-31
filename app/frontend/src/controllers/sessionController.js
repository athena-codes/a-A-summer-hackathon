const { createSessionToDB, endSessionInDB, getSessionProgressFromDB, updateSessionProgressInDB } = require('../services/sessionService');
const { getConceptsByLevel } = require('../services/conceptService');


const createSession = async (req, res) => {
    try {
        const userId = req.user.uid;
        const sessionId = await createSessionToDB(userId);
        res.json({ sessionId });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ error: 'Failed to create session' });
    }
};
const getSessionProgress = async (req, res) => {
    try {
        const userId = req.user.uid;
        const progress = await getSessionProgressFromDB(userId);
        res.json({ progress });
    } catch (error) {
        console.error('Error getting session progress:', error);
        res.status(500).json({ error: 'Failed to get session progress' });
    }
};

const updateSessionProgress = async (req, res) => {
    try {
        const { sessionId, conceptId, topicId, status } = req.body;
        const userId = req.user.uid;
        await updateSessionProgressInDB(sessionId, userId, conceptId, topicId, status);
        res.json({ message: 'Session progress updated successfully' });
    } catch (error) {
        console.error('Error updating session progress:', error);
        res.status(500).json({ error: 'Failed to update session progress' });
    }
}

const endSession = async (req, res) => {
    try {
        const { sessionId } = req.body;
        const userId = req.user.uid;
        await endSessionInDB(sessionId, userId);
        res.json({ message: 'Session ended successfully' });
    } catch (error) {
        console.error('Error ending session:', error);
        res.status(500).json({ error: 'Failed to end session' });
    }
};


module.exports = { createSession, endSession, getSessionProgress, updateSessionProgress };

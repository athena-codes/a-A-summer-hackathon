const { getDecksFromDB, createDeckInDB,
    addCardsToDeckInDB, removeCardFromDeckInDB,
    removeDeckFromDB, archiveDeckInDB,
    getArchivedDecksFromDB, getUserArchivedDecksFromDB
    , getDeckFromDB
 } = require('../services/deckService');


const getAllDecks = async (req, res) => {
    try {
        const decks = await getDecksFromDB();
        res.status(200).json({ decks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getDeck = async (req, res) => {
    const { deckId } = req.params;
    try {
        const deck = await getDeckFromDB(deckId);
        res.status(200).json({ deck });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createDeck = async (req, res) => {
    const { userId, topic_id, createdAt = new Date().toISOString(), archived = false } = req.body;
    try {
        const deck = await createDeckInDB({ userId, topic_id, createdAt, archived });
        await addCardsToDeckInDB(userId);
        res.status(201).json({ message: 'Deck created', deck });
    } catch (error) {
        res.status(500).json({ message: `Error creating deck: ${error.message}` });
    }
};

const removeCardFromDeck = async (req, res) => {
    const { deckId } = req.params;
    try {
        await removeCardFromDeckInDB(deckId);
        res.status(200).json({ message: 'Card removed from deck' });
    } catch (error) {
        res.status(500).json({ message: `Error removing card from deck: ${error.message}` });
    }
}


const removeDeck = async (req, res) => {
    const { deckId } = req.params;
    try {
        await removeDeckFromDB(deckId);
        res.status(200).json({ message: 'Deck removed' });
    } catch (error) {
        res.status(500).json({ message: `Error removing deck: ${error.message}` });
    }
}


const archiveDeck = async (req, res) => {
    //const { deckId, uid } = req.params;
    const { deckId, uid } = req.body;

    if (!deckId || !uid) {
        return res.status(400).json({ message: 'Missing deckId or uid' });
    }

    try {
        await archiveDeckInDB(deckId, uid);
        res.status(200).json({ message: 'Deck archived'});
    } catch (error) {
        res.status(500).json({ message: `Error archiving deck: ${error.message}` });
    }
}


const getArchivedDecks = async (req, res) => {
    try {
        const decks = await getArchivedDecksFromDB();
        res.status(200).json({ decks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserArchivedDecks = async (req, res) => {
    const { uid } = req.params;
    try {
        const decks = await getUserArchivedDecksFromDB(uid);
        res.status(200).json({ decks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllDecks, getDeck, createDeck, removeCardFromDeck, removeDeck, archiveDeck, getArchivedDecks, getUserArchivedDecks };

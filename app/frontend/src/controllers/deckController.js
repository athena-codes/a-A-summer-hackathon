const { getDecksFromDB, createDeckInDB, addCardToDeckInDB, removeCardFromDeckInDB, removeDeckFromDB, archiveDeckInDB, getArchivedDecksFromDB } = require('../services/deckService');


const getDecks = async (req, res) => {
    try {
        const decks = await getDecksFromDB();
        res.status(200).json({ decks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const createDeck = async (req, res) => {
    const { topic_id, createdAt, archived } = req.body;
    try {
        const deck = await createDeckInDB({ topic_id, createdAt, archived });
        res.status(201).json({ message: 'Deck created', deck });
    } catch (error) {
        res.status(500).json({ message: `Error creating deck: ${error.message}` });
    }
}


const addCardToDeck = async (req, res) => {
    const { deckId } = req.params;
    //generated card => from ai_request
    try {
        await addCardToDeckInDB(deckId);
        res.status(200).json({ message: 'Card added to deck' });
    } catch (error) {
        res.status(500).json({ message: `Error adding card to deck: ${error.message}` });
    }
}


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
    const { deckId } = req.params;
    try {
        await archiveDeckInDB(deckId);
        res.status(200).json({ message: 'Deck archived' });
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

module.exports = { getDecks, createDeck, addCardToDeck, removeCardFromDeck, removeDeck, archiveDeck, getArchivedDecks };

const express = require('express');
const { getDecks, createDeck, addCardToDeck, removeCardFromDeck, removeDeck, archiveDeck, getArchivedDecks } = require('../controllers/deckController');
const router = express.Router();

router.get('/all', getDecks);

router.get('/archive', getArchivedDecks);

router.get('/archive/:deckId', archiveDeck);

router.post('/new', createDeck);

router.delete('/remove/:deckId', removeDeck);

router.put('/update/:deckId', archiveDeck);



module.exports = router

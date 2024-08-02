const express = require('express');
const { createDeck, addCardToDeck, removeCardFromDeck, removeDeck, archiveDeck, getArchivedDecks, getUserArchivedDecks } = require('../controllers/deckController');
const router = express.Router();

// router.get('/all', getDecks);

router.get('/archive', getArchivedDecks);

router.get('/user-archive/:uid', getUserArchivedDecks);

// router.post('/archive/:deckId/:uid', archiveDeck);
router.post('/add-to-archive', archiveDeck);

router.post('/new', createDeck);

router.delete('/remove/:deckId', removeDeck);

router.put('/update/:deckId', archiveDeck);



module.exports = router

const express = require('express');
<<<<<<< HEAD
const { getAllDecks, getDeck, createDeck, addCardToDeck, removeCardFromDeck, removeDeck, archiveDeck, getArchivedDecks, getUserArchivedDecks } = require('../controllers/deckController');
const router = express.Router();

router.get('/all', getAllDecks);

router.get('/:deckId', getDeck);
=======
const { createDeck, addCardToDeck, removeCardFromDeck, removeDeck, archiveDeck, getArchivedDecks, getUserArchivedDecks } = require('../controllers/deckController');
const router = express.Router();

// router.get('/all', getDecks);
>>>>>>> ai

router.get('/archive', getArchivedDecks);

router.get('/user-archive/:uid', getUserArchivedDecks);

router.post('/add-to-archive', archiveDeck);

router.post('/new', createDeck);

router.delete('/remove/:deckId', removeDeck);

router.put('/update/:deckId', archiveDeck);



module.exports = router

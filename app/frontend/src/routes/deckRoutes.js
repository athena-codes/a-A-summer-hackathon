const express = require('express');
const { checkDeckProgress, getAttemptbyDeck, getAllDecks, getDeck, createDeck, addCardsToDeck, removeCardFromDeck, removeDeck, archiveDeck, getArchivedDecks, getUserArchivedDecks } = require('../controllers/deckController');
const router = express.Router();

router.get('/all', getAllDecks);

router.get('/:deckId', getDeck);

router.get('/archive', getArchivedDecks);

router.get('/user-archive/:uid', getUserArchivedDecks);


router.get('/:deckId/status', checkDeckProgress);

router.get('/:deckId/attempt', getAttemptbyDeck);

router.post('/add-to-archive', archiveDeck);

router.post('/new', createDeck);

router.delete('/remove/:deckId', removeDeck);

router.put('/update/:deckId', archiveDeck);



module.exports = router

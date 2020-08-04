const express = require('express')
const router = express.Router()
const suggestionController = require('../controller/suggestionController')

router.get('/', suggestionController.getAllSuggestions)
router.get('/search', suggestionController.findSuggestions)
router.get('/:suggestionId', suggestionController.getSuggestionById)
router.put('/:suggestionId', suggestionController.updateSuggestionById)
router.post('/', suggestionController.addNewSuggestion)
router.delete('/:suggestionId', suggestionController.deleteSuggestion)
module.exports = router

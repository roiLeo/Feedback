let mongoose = require('mongoose')
const Suggestion = require('../model/Suggestion')

exports.getAllSuggestions = async (req, res) => {
	try {
		let suggestion = await Suggestion.find()
		res.status(200).json(suggestion)
	} catch (err) {
		res.status(500).json(err)
	}
}

exports.getSuggestionById = async (req, res) => {
	try {
		const id = req.params.suggestionId
		let result = await Suggestion.findById({ _id: id })
		res.status(200).json(result)
	} catch (err) {
		res.status(500).json(err)
	}
}

exports.addNewSuggestion = async (req, res) => {
	try {
		const suggestion = new Suggestion({
			title: req.body.title,
			content: req.body.content,
		})

		let newSuggestion = await suggestion.save()
		res.status(201).json({ data: newSuggestion })
	} catch (err) {
		res.status(500).json({ error: err })
	}
}

exports.updateSuggestionById = async (req, res) => {
	try {
		const id = req.params.suggestionId
		let result = await Suggestion.findOneAndUpdate({ _id: id }, req.body, {new: true})

		res.status(200).json(result)
	} catch (err) {
		res.status(500).json({ error: err })
	}
}

exports.deleteSuggestion = async (req, res) => {
	try {
		const id = req.params.suggestionId
		let result = await Suggestion.remove({ _id: id })
		res.status(200).json(result)
	} catch (err) {
		res.status(500).json(err)
	}
}

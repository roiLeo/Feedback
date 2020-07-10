let mongoose = require('mongoose')
let suggestionSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	url: {
		type: String,
	},
	author: {
		type: String,
		required: true,
		default: "Not Leo"
	},
	avatar: {
		type: String,
	},
	votes: {
		type: Number,
		default: 0
	},
	status: {
		type: Number,
		default: 1
	},
	commentStatus: {
		type: Boolean,
		default: 1
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	creationDate: {
		type: Date,
		default: Date.now(),
	},
	tags: {
		type: Array,
		default: [],
	},
})
let Suggestion = mongoose.model('Suggestion', suggestionSchema)
module.exports = Suggestion

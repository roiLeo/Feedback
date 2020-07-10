import SuggestionsService from "@/services/api/SuggestionsService"

export const state = () => ({
	list: []
})

export const mutations = {
	ADD_SUGGESTION (state, suggestion) {
		state.list.push(suggestion)
	},
	SET_SUGGESTION (state, suggestion) {
		state.list = suggestion
	},
	SET_SUGGESTION (state, suggestions) {
		if (state.list.length > 1) {
			state.list = [
				...state.list.map(s => 
					s._id !== suggestions._id ? s : suggestions
				)
			]
		} else {
			state.list = suggestions
		}
	},
	// remove (state, { todo }) {
	// 	state.list.splice(state.list.indexOf(todo), 1)
	// },
}

export const actions = {
	async loadSuggestion({commit}, id) {
		let response = await SuggestionsService.getSuggestion(id)
		commit('SET_SUGGESTION', response)
	},
	async updateSuggestion({commit}, suggestion) {
		let response = await SuggestionsService.updateSuggestion(suggestion)
		commit('SET_SUGGESTION', response)
	},
	async loadSuggestions({commit}) {
		let response = await SuggestionsService.getSuggestions()
		commit('SET_SUGGESTION', response)
	},
	async addSuggestion({commit}, suggestion) {
		let response = await SuggestionsService.addSuggestion(suggestion)
		commit('ADD_SUGGESTION', response)
	}
}

export const getters = {
	suggestions: state => state.list,
} 
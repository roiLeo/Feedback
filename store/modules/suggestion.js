import SuggestionsService from "@/services/api/SuggestionsService"

export const state = () => ({
	list: []
})

export const mutations = {
	ADD_SUGGESTION (state, suggestion) {
		state.list.push(suggestion)
	},
	SET_SUGGESTIONS (state, suggestions) {
		state.list = suggestions
	},
	// remove (state, { todo }) {
	// 	state.list.splice(state.list.indexOf(todo), 1)
	// },
	// toggle (state, todo) {
	// 	todo.done = !todo.done
	// }
}

export const actions = {
	async loadSuggestions({commit}) {
		let response = await SuggestionsService.getSuggestions()
		commit('SET_SUGGESTIONS', response)
	}
}

export const getters = {
	suggestions: state => state.list
} 
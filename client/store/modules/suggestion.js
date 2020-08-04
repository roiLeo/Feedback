import SuggestionsService from '@/services/api/SuggestionsService'
import * as Filters from '~/helpers/filters'

export const state = () => ({
	list: [],
	filteredSuggestion: [],
	filter: {
		search: '',
		status: 'all',
		order: 'createdAt'
	}
})

export const mutations = {
	ADD_SUGGESTION (state, suggestion) {
		state.list.push(suggestion)
	},
	SET_SINGLE_SUGGESTION (state, suggestion) {
		state.list = suggestion
	},
	SET_SUGGESTION (state, suggestions) {
		state.list = suggestions

		/*
		 * if (state.list.length) {
		 * 	state.list = [
		 * 		...state.list.map(s => s._id !== suggestions._id ? s : suggestions)
		 * 	]
		 * } else {
		 * 	state.list = suggestions
		 * }
		 */
	},
	SET_FILTER_SEARCH (state, search) { state.filter.search = search },

	setFilterStatus (state, status) { state.filter.status = status },

	setOrder (state, order) { state.filter.order = order },

	filterSuggestions (state) {
		const suggestions = [...state.list]
		// state.list = suggestions
		// console.log(state.filter)
		// state.list = Filters.filterSuggestions(state.filter, suggestions)
	},
	// orderLeads (state) {
	// 	const leads = [...state.filteredLeads]
	// 	state.filteredLeads = Filters.orderLeads(state.filter.order, leads)
	// }
}

export const actions = {
	async loadSuggestion ({commit}, id) {
		const response = await SuggestionsService.getSuggestion(id)
		commit('SET_SINGLE_SUGGESTION', response)
	},
	async updateSuggestion ({commit}, suggestion) {
		const response = await SuggestionsService.updateSuggestion(suggestion)
		commit('SET_SUGGESTION', response)
	},
	async loadSuggestions ({commit}) {
		const response = await SuggestionsService.getSuggestions()
		commit('SET_SUGGESTION', response)
	},
	async addSuggestion ({commit}, suggestion) {
		const response = await SuggestionsService.addSuggestion(suggestion)
		commit('ADD_SUGGESTION', response)
	},
	async filterSearch ({commit, dispatch}, search) {
		await commit('SET_FILTER_SEARCH', search)
		dispatch('filterSuggestions')
	},
	async filterSuggestions ({commit, state}) {
		await commit('filterSuggestions')
		// await commit('orderLeads')
		const response = await SuggestionsService.findSuggestions(state.filter)
		commit('SET_SUGGESTION', response)
	}
}

export const getters = {
	suggestions: state => state.list
}

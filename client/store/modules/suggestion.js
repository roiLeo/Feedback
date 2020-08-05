import SuggestionsService from '@/services/api/SuggestionsService'
import * as Filters from '~/helpers/filters'
import Vue from 'vue'

export const state = () => ({
	list: [],
	filteredSuggestion: [],
	filter: {
		search: '',
		status: 'all',
		order: 'top'
	}
})

export const mutations = {
	ADD_SUGGESTION (state, suggestion) {
		state.list.push(suggestion)
	},
	SET_SINGLE_SUGGESTION (state, suggestion) {
		if (state.list.length) {
			state.list = [
				...state.list.map(s => s._id !== suggestion._id ? s : suggestion)
			]
		} else {
			state.list = suggestion
		}
	},
	SET_SUGGESTION (state, suggestions) {
		state.list = suggestions
	},
	SET_FILTER_SEARCH (state, search) {
		state.filter.search = search
	},
	SET_FILTER_ORDER (state, order) {
		state.filter.order = order
	}
}

export const actions = {
	async loadSuggestion ({commit}, id) {
		const response = await SuggestionsService.getSuggestion(id)
		commit('SET_SUGGESTION', response)
	},
	async updateSuggestion ({commit}, suggestion) {
		console.log(suggestion)
		const response = await SuggestionsService.updateSuggestion(suggestion)
		commit('SET_SINGLE_SUGGESTION', response)
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
	async orderSearch ({commit, dispatch}, order) {
		await commit('SET_FILTER_ORDER', order)
		dispatch('filterSuggestions')
	},
	async filterSuggestions ({commit, state}) {
		const response = await SuggestionsService.findSuggestions(state.filter)
		commit('SET_SUGGESTION', response)
	}
}

export const getters = {
	suggestions: state => state.list,
	order: state => state.filter.order
}

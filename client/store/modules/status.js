import StatusService from '@/services/api/StatusService'

export const state = () => ({
	list: []
})

export const mutations = {
	ADD_STATUS (state, status) {
		state.list.push(status)
	},
	SET_STATUS (state, status) {
		state.list = status
	}
}

export const actions = {
	async loadStatu ({commit}, id) {
		const response = await StatusService.getStatus(id)
		commit('SET_STATUS', response)
	},
	async loadStatus ({commit}) {
		const response = await StatusService.getStatus()
		commit('SET_STATUS', response)
	}
}

export const getters = {
	status: state => state.list
}

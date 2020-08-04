import axios from 'axios'
// import seed from '@/seed.json'

export default {
    async getSuggestions () {
		const response = await axios.get(process.env.VUE_APP_BASEURL + '/suggestion')
		return response.data
	},
	async getSuggestion (id) {
		const response = await axios.get(process.env.VUE_APP_BASEURL + '/suggestion/' + id)
		return response.data
	},
	async findSuggestions (filter) {
		const params = {
			title: filter.search
		}
		const response = await axios.get(process.env.VUE_APP_BASEURL + '/suggestion/search', {params})
		return response.data
	},
	async updateSuggestion (suggestion) {
		try {
			const response = await axios.put(process.env.VUE_APP_BASEURL + '/suggestion/' + suggestion.id, suggestion.data)
			return response.data
		} catch (error) {
			return console.log(error)
		}
	},
	async addSuggestion (suggestion) {
		try {
			await axios.post(process.env.VUE_APP_BASEURL + '/suggestion',  suggestion)
			return console.log('Suggestion Added')
		} catch (error) {
			return console.log(error)
		}
	}
}

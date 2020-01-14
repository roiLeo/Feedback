import axios from 'axios'

export default {
    async getSuggestions () {
		const response = await axios.get('https://jsonplaceholder.typicode.com' + '/posts')
		return response.data
	},
	async getSuggestion (id) {
		const response = await axios.get('https://jsonplaceholder.typicode.com' + '/posts/' + id)
		return response.data
	},
}

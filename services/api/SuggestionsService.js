import axios from 'axios'
import seed from '@/seed.json'

export default {
    async getSuggestions () {
		// const response = await axios.get('https://jsonplaceholder.typicode.com' + '/posts')
		// return response.data
		return seed.posts
	},
	async getSuggestion (id) {
		// const response = await axios.get('https://jsonplaceholder.typicode.com' + '/posts/' + id)
		// return response.data
		return seed.posts.find(s => s.id === id)
	},
}

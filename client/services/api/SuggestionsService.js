import axios from 'axios'
import seed from '@/seed.json'

export default {
    async getSuggestions () {
		const response = await axios.get(process.env.VUE_APP_BASEURL + '/suggestion')
		// const response = await axios.get('http://localhost:4000/suggestion')
		return response.data
		// return seed.posts
	},
	async getSuggestion (id) {
		// const response = await axios.get('https://jsonplaceholder.typicode.com' + '/posts/' + id)
		// return response.data
		return seed.posts.find(s => s.id === id)
	},
	async addSuggestion (suggestion) {
		//push in json seed
		window.console.log(suggestion)

		try {
			await axios.post(process.env.VUE_APP_BASEURL + '/suggestion',  data)
			return console.log('Suggestuib Added')
			// return toast.success('Campagne mis à jour')
		}
		catch (error) {
			return console.log(error)
			// return toast.error(error.response.data.message)
		}
	}
}

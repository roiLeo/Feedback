import axios from 'axios'

export default {
    async getSuggestions () {
		const response = await axios.get('https://jsonplaceholder.typicode.com' + '/posts')
		// promise
		return response.data
    },
}

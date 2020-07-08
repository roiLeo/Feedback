import axios from 'axios'
import seed from '@/seed.json'

export default {
    async getStatus () {
		// const response = await axios.get('https://jsonplaceholder.typicode.com' + '/posts')
		// return response.data
		return seed.status
	},
}

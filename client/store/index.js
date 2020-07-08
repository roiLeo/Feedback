import Vuex from 'vuex'
import * as suggestion from '@/store/modules/suggestion.js'
import * as status from '@/store/modules/status.js'

const createStore = () => {
	return new Vuex.Store({
		modules: {
			suggestion,
			status
		}
	})
}
export default createStore
import Vuex from 'vuex'
import * as status from '@/store/modules/status.js'
import * as suggestion from '@/store/modules/suggestion.js'

const createStore = () => new Vuex.Store({
	modules: {
		suggestion,
		status
	}
})
export default createStore

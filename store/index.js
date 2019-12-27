import Vuex from 'vuex'
import * as suggestion from '@/store/modules/suggestion.js'

const createStore = () => {
	return new Vuex.Store({
		modules: {
			suggestion
		}
	})
}
export default createStore
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

Vue.use(Vuex)

export interface RootStore {
  loading: boolean;
}

const store: StoreOptions<RootStore> = {
  state: {
    loading: false
  },
  mutations: {
    setLoading: function(state, isShow:boolean) {
      state.loading = isShow;
    }
  } 
} 

export default new Vuex.Store(store);
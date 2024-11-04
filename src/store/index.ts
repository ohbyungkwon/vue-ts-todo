import Axios from '@/utils/Axois';
import LocalStorageUtil from '@/utils/LocalStorageUtil';
import { ResponseVo } from '@/vo/ResponseVo';
import { TodoVo } from '@/vo/TodoVo';
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

Vue.use(Vuex)

export interface RootStore {
  storedTodoList: Array<TodoVo>;
  loading: boolean;
}

const store: StoreOptions<RootStore> = {
  state: {
    storedTodoList: [],
    loading: false
  },
  mutations: {
    setLoading: function(state, isShow:boolean) {
      state.loading = isShow;
    },
    addTodoItem: function(state, todoItem:TodoVo) {
      state.storedTodoList.push(todoItem);
    },
    toggleCompleteTodoItem: function(state, idx:number) {
      state.storedTodoList[idx].done = !state.storedTodoList[idx].done

      LocalStorageUtil.changeItem(idx, state.storedTodoList[idx]);
    },
    delTodoItem: function(state, idx:number) {
      state.storedTodoList.splice(idx, 1);
    },
    delTodoList: function(state) {
      state.storedTodoList = [];
    }
  },
  actions: {
    // API 사용시 setTimeout -> axios로 변경
    addTodoItemAct: function({commit}, todoItem:TodoVo){
      commit('setLoading', true);

      setTimeout(() => {
        LocalStorageUtil.setItem(LocalStorageUtil.getAutoKey(), todoItem);
        commit('addTodoItem', todoItem);

        commit('setLoading', false);
      }, 1000);
    },
    delTodoItemAct: function({commit}, idx:number){
      commit('setLoading', true);

      setTimeout(() => {
        LocalStorageUtil.removeItem(idx);
        commit('delTodoItem', idx);

        commit('setLoading', false);
      }, 1000);
    },
    delTodoListAct: function({commit}){
      commit('setLoading', true);

      setTimeout(() => {
        LocalStorageUtil.clear();
        commit('delTodoList');

        commit('setLoading', false);
      }, 1000);
    },
    searchTodoListAct: function({commit}) {
      commit('setLoading', true);

      commit('delTodoList'); // 기존 리스트 비움
      setTimeout(() => {
        const todoList = LocalStorageUtil.searchAll();
        todoList.forEach(item => commit('addTodoItem', item))

        commit('setLoading', false);
      }, 500);

    },
    addTodoApiTest: async function({commit}, reqBody) {
      commit('setLoading', true);

      let result = undefined;
      try{
        const response = await Axios.getInstance().post('/todo', reqBody);
        commit('addTodoItem', response.data);   

        result = response.data;
      } catch(error:any) {
        if(error.response) {
          result = error.response.data;
        } else {
          result = { status: '오류', message: error.message, code: 500 };     
        }
      } finally {
        commit('setLoading', false);
      }

      return new ResponseVo(result);
    }
  },
  getters: {
    getTodoItemIdx: function(state) {
      return function(text:string) {
        return state.storedTodoList.findIndex(x => x.text === text);
      };
    }
  }
} 

export default new Vuex.Store(store);
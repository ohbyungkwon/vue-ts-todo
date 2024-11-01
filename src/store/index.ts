import LocalStorageUtil from '@/utils/LocalStorageUtil';
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
    initTodoItem: function(state, todoItemStr:string) {
      state.storedTodoList.push(JSON.parse(todoItemStr));
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
    addTodoItemAct: function({commit}, todoItem:TodoVo){
      commit('setLoading', true);

      setTimeout(() => {
        LocalStorageUtil.setItem(LocalStorageUtil.autoKey, todoItem);
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
    searchTodoList: function({commit}) {
      commit('setLoading', true);

      commit('delTodoList'); // 기존 리스트 비움
      setTimeout(() => {
        const todoList = LocalStorageUtil.searchAll();
        todoList.forEach(item => commit('addTodoItem', item))

        commit('setLoading', false);
      }, 500);
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
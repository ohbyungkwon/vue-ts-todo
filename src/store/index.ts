import LocalStorageUtil from '@/utils/LocalStorageUtil';
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

Vue.use(Vuex)

export class TodoVo {
  public text:string = "";
  public done:Boolean = false;

  constructor(data:any) {
    this.text = data.text;
    this.done = data.done;
  }
}

export interface RootStore {
  storedTodoList: Array<TodoVo>;
}

const store: StoreOptions<RootStore> = {
  state: {
    storedTodoList: []    
  },
  mutations: {
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
      setTimeout(() => {
        LocalStorageUtil.setItem(LocalStorageUtil.autoKey, todoItem);
        commit('addTodoItem', todoItem);
      }, 1000);
    },
    delTodoItemAct: function({commit}, idx:number){
      setTimeout(() => {
        LocalStorageUtil.removeItem(idx);
        commit('delTodoItem', idx);
      }, 1000);
    },
    delTodoListAct: function({commit}){
      setTimeout(() => {
        LocalStorageUtil.clear();
        commit('delTodoList');
      }, 1000);
    },
    searchTodoList: function({commit}) {
      commit('delTodoList'); // 기존 리스트 비움
      const todoList = LocalStorageUtil.searchAll();
      todoList.forEach(item => commit('addTodoItem', item))
    }
  },
  getters: {
    getTodoItemIdx: function(state) {
      return function(text:String) {
        return state.storedTodoList.findIndex(x => x.text === text);
      };
    }
  }
} 

export default new Vuex.Store(store);
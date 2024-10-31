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
      //api 탄다면 불필요
      const idxStr = state.storedTodoList.length.toString();
      localStorage.setItem(idxStr, JSON.stringify(todoItem));

      state.storedTodoList.push(todoItem);
    },
    toggleCompleteTodoItem: function(state, idx:number) {
      state.storedTodoList[idx].done = !state.storedTodoList[idx].done

      //api 탄다면 불필요
      const idxStr = idx.toString();
      localStorage.removeItem(idxStr);

      const changedItem = JSON.stringify(state.storedTodoList[idx]);
      localStorage.setItem(idxStr, changedItem);
    },
    delTodoItem: function(state, idx:number) {
      state.storedTodoList.splice(idx, 1);

      //api 탄다면 불필요
      const idxStr = idx.toString();
      localStorage.removeItem(idxStr);
    },
    delTodoList: function(state) {
      state.storedTodoList = [];

      //api 탄다면 불필요
      localStorage.clear();
    }
  },
  actions: {
    addTodoItemAct: function({commit}, todoItem:TodoVo){
      setTimeout(() => {
        console.log(todoItem);
        commit('addTodoItem', todoItem);
      }, 1000);
    },
    delTodoItemAct: function({commit}, idx:number){
      setTimeout(() => {
        commit('delTodoItem', idx);
      }, 1000);
    },
    delTodoListAct: function({commit}){
      setTimeout(() => {
        commit('delTodoList');
      }, 1000);
    },
    searchTodoList: function({commit}) {
      const size = localStorage.length;
      for(let i = 0; i < size; i++) {
        const key = localStorage.key(i);
        if(key === null) break;

        const item = localStorage.getItem(key);
        commit('initTodoItem', item);
      }
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
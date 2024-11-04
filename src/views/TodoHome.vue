<template>
  <div>
    <loading :isShowLoading="loading"></loading>
    <todo-input @addTodoItem=addTodoItem></todo-input>
    <todo-list 
      :lists="storedTodoList"
      @toogleComplete="toogleComplete"
      @deleteTodo="deleteTodo"
    ></todo-list>
  </div>
</template>

<script lang="ts">
import Loading from '@/components/common/Loading.vue';
import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';
import { TodoVo } from '@/vo/TodoVo';
import Vue from 'vue';
import Component from 'vue-class-component'
import { State, Action, Mutation } from 'vuex-class';

@Component({
    name: 'TodoHome',
    components: {
        TodoInput,
        TodoList,
        Loading
    }
})
export default class TodoHome extends Vue {
  @State('storedTodoList') private storedTodoList!:TodoVo[];
  @State('loading') private loading!:boolean;

  @Mutation('toggleCompleteTodoItem') private toggleCompleteTodoItem!:(idx:number) => void
  @Action('addTodoItemAct') private addTodoItemAct!: (todoItem: TodoVo) => void
  @Action('delTodoItemAct') private delTodoItemAct!: (idx:number) => void
  @Action('searchTodoListAct') private searchTodoListAct!: () => void

  created() {
    this.searchTodoListAct();
  }

  private addTodoItem(todoItem: TodoVo) {
    this.addTodoItemAct(todoItem);
  }

  private toogleComplete(idx: number) {
    this.toggleCompleteTodoItem(idx);
  }

  private deleteTodo(idx: number) {
    this.delTodoItemAct(idx);
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6F8;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
}
</style>
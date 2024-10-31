<template>
  <div>
    <todo-input @addTodoItem=addTodoItem></todo-input>
    <todo-list 
      :lists="storedTodoList"
      @toogleComplete="toogleComplete"
      @deleteTodo="deleteTodo"
    ></todo-list>
  </div>
</template>

<script lang="ts">
import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';
import { TodoVo } from '../store';
import Vue from 'vue';
import Component from 'vue-class-component'
import { State, Action, Mutation } from 'vuex-class';

@Component({
    name: 'TodoHome',
    components: {
        TodoInput,
        TodoList
    }
})
export default class TodoHome extends Vue {
  @State('storedTodoList') private storedTodoList!:TodoVo[];

  @Mutation('toggleCompleteTodoItem') private toggleCompleteTodoItem!:(idx:number) => void
  @Action('addTodoItemAct') private addTodoItemAct!: (todoItem: TodoVo) => void
  @Action('delTodoItemAct') private delTodoItemAct!: (idx:number) => void
  @Action('searchTodoList') private searchTodoList!: () => void

  created() {
    this.searchTodoList();
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
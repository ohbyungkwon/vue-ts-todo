<template>
  <div>
    <loading></loading>
    <todo-input></todo-input>
    <todo-list></todo-list>
  </div>
</template>

<script lang="ts">
import Loading from '@/components/common/Loading.vue';
import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';
import Vue from 'vue';
import Component from 'vue-class-component'
import { Action } from 'vuex-class';

@Component({
    name: 'TodoHome',
    components: {
        TodoInput,
        TodoList,
        Loading
    }
})
export default class TodoHome extends Vue {
  @Action('searchTodoListAct') private searchTodoListAct!: () => void

  created() {
    this.searchTodoListAct();
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
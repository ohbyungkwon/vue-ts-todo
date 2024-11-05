<template>
  <div>
    <loading></loading>
    <todo-input></todo-input>
    <todo-list></todo-list>
  </div>
</template>

<script lang="ts">
import Loading from '@/components/common/Loading.vue';
import TodoInput from '@/components/todo/TodoInput.vue';
import TodoList from '@/components/todo/TodoList.vue';
import Component from 'vue-class-component'
import TodoBase from './common/TodoBase';

@Component({
    name: 'TodoHome',
    components: {
        TodoInput,
        TodoList,
        Loading
    }
})
export default class TodoHome extends TodoBase {

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
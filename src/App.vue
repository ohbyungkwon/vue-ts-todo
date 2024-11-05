<template>
  <div id="app">
    <todo-header></todo-header>
    <router-view></router-view>
    <todo-footer></todo-footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TodoHeader from './components/common/Header.vue';
import TodoFooter from './components/todo/TodoFooter.vue';

@Component({
  name: 'App',
  components: {
    TodoHeader,
    TodoFooter
  }
})
export default class App extends Vue {

}
</script>

<style>
</style>

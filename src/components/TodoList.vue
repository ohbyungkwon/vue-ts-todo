<template>
    <section>
        <ul>
        <li v-for="(todoItem, index) in lists" class="shadow" :key="index">
            <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todoItem.done}" @click="toggleComplete(index)"></i>
            <span v-bind:class="{textCompleted: todoItem.done}">{{ todoItem.text }}</span>
            <span class="removeBtn" @click="deleteTodo(index)">
            <i class="removeBtn fas fa-trash-alt"></i>
            </span>
        </li>
        </ul>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { TodoVo } from '../store';

@Component({
    name: 'TodoList'
})
export default class TodoList extends Vue {
    @Prop({ type: Array, required: true }) private readonly lists!:TodoVo[];

    private toggleComplete(index:number) {
        this.$emit('toogleComplete', index);
    }

    private deleteTodo(index:number) {
        this.$emit('deleteTodo', index);        
    }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
</style>
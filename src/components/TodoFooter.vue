<template>
    <div v-if="isBtnShow" class="clearAllContainer">
        <span class="clearAllBtn" @click="delTodoList">Clear All</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'TodoFooter'
})
export default class TodoFooter extends Vue {
    get isBtnShow() {
        return ['/todo', '/'].includes(this.$route.fullPath)
    }

    private delTodoList() {
        this.$emit('delTodoList');
    }
}
</script>

<style scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
}
.clearAllBtn {
  color: #e20303;
  display: block;
}
</style>
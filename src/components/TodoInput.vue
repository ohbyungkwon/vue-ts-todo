<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItemForm.text" @keyup.enter="addTodo">
    <span class="addContainer" @click="addTodo">
      <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span>
    <status-modal ref="modalRef" :vo="modal" @close="clearInput"></status-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { TodoVo } from '@/vo/TodoVo';
import Component from 'vue-class-component';
import _ from 'lodash';
import { Getter } from 'vuex-class';
import StatusModal from './common/StatusModal.vue';
import { ModalVo } from '@/vo/ModalVo';

@Component({
    name: 'TodoInput',
    components: {
      StatusModal
    }
})
export default class TodoInput extends Vue {
  @Getter('getTodoItemIdx') private getTodoItemIdx!:(text:string) => number;

  private newTodoItemForm:TodoVo = new TodoVo({ text: '', done: false });
  private modal:ModalVo = new ModalVo({});

  private addTodo() {
    let text = this.newTodoItemForm.text;
    if(text === '') {
      this.modal = new ModalVo({ status: 'warning', title: '경고', content: '빈 값은 입력할 수 없습니다.'});
      (this.$refs.modalRef as any).open();
      return;
    }
    
    const idx = this.getTodoItemIdx(text);
    if(idx >= 0) {
      this.modal = new ModalVo({ status: 'error', title: '오류', content: '이미 존재하는 값입니다.'});
      (this.$refs.modalRef as any).open();
      return;
    }
    
    const newTodoItem = _.cloneDeep(this.newTodoItemForm);
    console.log("Add TodoItem: ", newTodoItem);

    this.$emit('addTodoItem', newTodoItem);
    this.clearInput();
  }

  private clearInput() {
    this.newTodoItemForm.text = '';
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  margin-top: 0.5rem;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
  width: 80%;
  height: 90%s;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
</style>
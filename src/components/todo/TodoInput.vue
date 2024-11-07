<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItemForm.text" @keyup.enter="addTodo">
    <span class="addContainer" @click="addTodo">
      <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span>
  </div>
</template>

<script lang="ts">
import { TodoVo } from '@/vo/TodoVo';
import Component from 'vue-class-component';
import _ from 'lodash';
import { ResponseVo } from '@/vo/ResponseVo';
import TodoBase from '@/views/common/TodoBase';
import eventBus from '@/EventBus';

@Component({
    name: 'TodoInput',
})
export default class TodoInput extends TodoBase {

  private newTodoItemForm:TodoVo = new TodoVo({ text: '', done: false });

  private addTodo() {

    let text = this.newTodoItemForm.text;
    if(text === '') {
      eventBus.emit('modalEvent', { status: 'warning', content: '빈 값은 입력할 수 없습니다.'});
      return
    }
    
    const idx = this.getTodoItemIdx(text);
    if(idx >= 0) {
      eventBus.emit('modalEvent', { status: 'error', content: '이미 존재하는 값입니다.'});
      return
    }
    
    const newTodoItem = _.cloneDeep(this.newTodoItemForm);
    this.addTodoItemAct(newTodoItem);

    this.clearInput();
  }

  // API 사용 예시
  private async addTodoUsingApi() {
    let text = this.newTodoItemForm.text;
    if(text === '') {
      eventBus.emit('modalEvent', { status: 'warning', content: '빈 값은 입력할 수 없습니다.'});
      return;
    }
    
    const idx = this.getTodoItemIdx(text);
    if(idx >= 0) {
      eventBus.emit('modalEvent', { status: 'error', content: '이미 존재하는 값입니다.'});
      return;
    } 

    const newTodoItem = _.cloneDeep(this.newTodoItemForm);
    const result:ResponseVo = await this.addTodoApiTest(newTodoItem);
    const handleModalCallback = async () => {
      if (result.code === 200) await this.searchTodoApiTest();
      this.clearInput();
    };
  
    eventBus.emit('modalEvent', { 
      code: result.code, 
      content: result.resultMsg, 
      callback: handleModalCallback 
    });    
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
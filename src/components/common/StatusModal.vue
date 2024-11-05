<template>
    <!-- 모달 배경 -->
    <div v-if="isModalShow" class="modal-background">
        <!-- 모달 본문 -->
        <div :class="['modal', statusClass]">
            <span class="close-btn" @click="close">&times;</span>
            <h2>{{ title }}</h2>
            <p>{{ vo.content }}</p>
            <button @click="close">{{ vo.btnMsg }}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { ModalVo } from '@/vo/ModalVo';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'StatusModal'
})
export default class StatusModal extends Vue {
    @Prop({ type: ModalVo, required: true }) private readonly vo!:ModalVo;

    private isModalShow:boolean = false;

    get statusClass() {
        switch (this.vo.status) {
        case 'error':
            return 'modal-error';
        case 'warning':
            return 'modal-warning';
        default:
            return 'modal-default';
        }
    }

    get title() {
        switch (this.vo.status) {
        case 'error':
            return '오류';
        case 'warning':
            return '경고';
        default:
            return '알림';
        }
    }

    public open() {
        console.log('open modal ', this.vo);
        this.isModalShow = true;
    }

    public close() {
        this.isModalShow = false;
        if(this.vo.callback)
          this.vo.callback();
        
        this.vo.callback = undefined;
        this.$emit('close')
    }
}
</script>

<style scoped>
/* 모달 배경 */
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* 모달 기본 스타일 */
.modal {
  position: relative;
  background-color: #fff;
  padding: 20px;
  width: 320px;
  max-width: 90%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

/* 닫기 버튼 */
.close-btn {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #888;
  cursor: pointer;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #555;
}

/* 상태에 따른 모달 스타일 */
.modal-error {
  border-left: 5px solid #f44336; /* 빨간색 계열 */
  background-color: #fdecea;
}

.modal-warning {
  border-left: 5px solid #ffeb3b; /* 노란색 계열 */
  background-color: #fff9e6;
}

.modal-default {
  border-left: 5px solid #2196f3; /* 파란색 계열 */
  background-color: #e8f4ff;
}

/* 버튼 스타일 */
button {
  background-color: #6478fb;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #505dc5;
}

/* 상태에 따른 버튼 스타일 */
.modal-error button {
  background-color: #f44336;
}

.modal-warning button {
  background-color: #ffeb3b;
  color: #333;
}

.modal-default button {
  background-color: #2196f3;
}
</style>
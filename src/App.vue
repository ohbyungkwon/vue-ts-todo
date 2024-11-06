<template>
  <div id="app">
    <todo-header v-if="isShowHeader"></todo-header>
    <router-view></router-view>
    <todo-footer v-if="isShowFooter"></todo-footer>
    <status-modal ref="globalModal" :vo="modal"></status-modal>
 </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TodoHeader from './components/common/Header.vue';
import TodoFooter from './components/todo/TodoFooter.vue';
import eventBus from './EventBus';
import StatusModal from './components/common/StatusModal.vue';
import { ModalVo } from './vo/ModalVo';

@Component({
  name: 'App',
  components: {
    TodoHeader,
    TodoFooter,
    StatusModal
  }
})
export default class App extends Vue {
  private isShowHeader:boolean = false;
  private isShowFooter:boolean = false;
  private modal:ModalVo = new ModalVo({});

  mounted() {
    eventBus.on('headerEvent', this.globalHeaderHandler);
    eventBus.on('footerEvent', this.globalFooterHandler);
    eventBus.on('modalEvent', this.globalModalHandler);
  }
  
  private globalHeaderHandler(isShow: any) {
    this.isShowHeader = isShow;
  }

  private globalFooterHandler(isShow: any) {
    this.isShowFooter = isShow;
  }

  private globalModalHandler(data: any) {
    this.modal = data;
    (this.$refs.globalModal as any).open();
  }

  beforeDestroy() {
    eventBus.off('headerEvent', this.globalHeaderHandler);
    eventBus.off('footerEvent', this.globalFooterHandler);
    eventBus.off('modalEvent', this.globalModalHandler);
  }
}
</script>

<style>
</style>

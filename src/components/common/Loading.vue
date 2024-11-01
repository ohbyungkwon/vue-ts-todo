<template>
    <div v-if="isShowLoading" class="loading-overlay">
        <div class="spinner"></div>
    </div>

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
    name: 'Loading'
})
export default class Loading extends Vue {
    @Prop() private readonly isShowLoading!:boolean;
}
</script>

<style scoped>
/* 전체 페이지 중앙에 로딩 스피너 표시 */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

/* 로딩 스피너 스타일 */
.spinner {
    width: 50px;
    height: 50px;
    border: 6px solid #ccc;
    border-top: 6px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* 스피너 애니메이션 */
@keyframes spin {
    0% {
    transform: rotate(0deg);
    }
    100% {
    transform: rotate(360deg);
    }
}
</style>
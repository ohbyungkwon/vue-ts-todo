<template>
  <div class="login-container">
    <h2>로그인</h2>
    <div class="form-group">
        <label for="userId">아이디</label>
        <input
        type="text"
        id="userId"
        v-model="userId"
        placeholder="아이디를 입력하세요"
        required
        />
    </div>
    <div class="form-group">
        <label for="password">비밀번호</label>
        <input
        type="password"
        id="password"
        v-model="password"
        placeholder="비밀번호를 입력하세요"
        required
        />
    </div>
    <button @click="loginClick">로그인</button>
  </div>
</template>

<script lang="ts">
import eventBus from '@/EventBus';
import RootBase from '@/views/common/RootBase';
import { ResponseVo } from '@/vo/ResponseVo';
import { UserInfoVo } from '@/vo/UserInfoVo';
import Component from 'vue-class-component';

@Component({
    name: 'Login',
})
export default class Login extends RootBase {
  private userId:string = "";
  private password:string = "";
  
  private async loginClick() {
    const response:ResponseVo<UserInfoVo> = await this.doLogin({userId: this.userId, password: this.password})
    
    const handleModalCallback = () => { 
      if(response.code === 200) {
        const nextPage = this.$route.query.beforePage ?? '/todo';
        this.$router.push(nextPage.toString());
      } else {
        this.userId = '';
        this.password = '';
      }
    };

    eventBus.emit('modalEvent', { code: response.code, content: response.resultMsg, callback: handleModalCallback});
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1em;
}

input {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.05);
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0px 0px 4px rgba(76, 175, 80, 0.3);
}

button {
  width: 100%;
  padding: 0.75em;
  border: none;
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}
</style>
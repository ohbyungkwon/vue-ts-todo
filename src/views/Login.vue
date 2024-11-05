<template>
    <div class="login-container">
    <h2>로그인</h2>
        <form @submit.prevent="doLogin">
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
            <button type="submit">로그인</button>
        </form>
    </div>
</template>

<script lang="ts">
import RootBase from '@/views/common/RootBase';
import Component from 'vue-class-component';

@Component({
    name: 'Login'
})
export default class Login extends RootBase {
  private userId:string = "";
  private password:string = "";


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

button {
  width: 100%;
  padding: 0.75em;
  border: none;
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
}
</style>
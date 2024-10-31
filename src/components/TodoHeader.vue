<template>
    <header class="navbar">
    <ul>
        <li 
            v-for="(menu, index) in menus" 
            :key="index"
            @click="clickMenu(menu)"> 
            <a>{{ menu }}</a>
        </li>
    </ul>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default class TodoHeader extends Vue {
    private menus:string[] = ['TODO', 'HOME', 'ABOUT'];

    private clickMenu(menu:string) {
        const menuNameLower = menu.toLowerCase();
        const isSameMove = this.$route.fullPath === '/' + menuNameLower;
        if(!isSameMove)
            this.$emit('clickMenu', menuNameLower);
    }
}
</script>

<style scoped>
h1{
    color : #2f3852;
    font-weight : 900;
    margin:2.5rem 0 1.5rem;

}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
}

/* 메뉴바 스타일 */
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #333;
    padding: 1rem 2rem;
}

/* 로고 스타일 */
.navbar .logo {
    font-size: 1.5rem;
    color: #fff;
    font-weight: bold;
    text-decoration: none;
}

/* 메뉴 스타일 */
.navbar ul {
    list-style-type: none;
    display: flex;
}

.navbar ul li {
    margin-left: 2rem;
}

.navbar ul li a {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s;
}

/* 메뉴 항목 hover 효과 */
.navbar ul li a:hover {
    background-color: #555;
    border-radius: 5px;
}
</style>
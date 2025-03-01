<template>
  <div>
    <nav>
      <router-link to="/">首頁</router-link>
      <router-link to="/wallet">錢包</router-link>
      <router-link to="/tasks">任務</router-link>
    </nav>
    <router-view />
  </div>
 
</template>

<script setup>
</script>

<style>
nav {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #f4f4f4;
}
</style>

<!-- App.vue -->
<template>

  <v-app id="inspire">
    <!-- App Bar -->
    <v-app-bar class="px-3" density="compact" flat>
      <!-- 顯示選單的按鈕 -->
      <v-avatar class="hidden-md-and-up" color="grey-darken-1" size="32"></v-avatar>
      <v-spacer></v-spacer>

      <!-- 使用 Vuetify 的 Tabs 來顯示導航 -->
        <v-tabs align-tabs="center" color="grey-darken-2">

          <router-link to="/" class="tab-link"><v-tab>首頁</v-tab></router-link>

          <router-link to="/wallet" class="tab-link"><v-tab>錢包</v-tab></router-link>

          <router-link to="/tasks" class="tab-link"><v-tab>任務</v-tab></router-link>

          <router-link to="/store" class="tab-link"><v-tab>商店</v-tab></router-link>
         </v-tabs>

      <v-spacer></v-spacer>
      
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="bg-grey-lighten-3">
      <v-container>
        

          <!-- Main Content Area -->
          <router-view /> 
          


        
      </v-container>
      <UserRoleSelector />

    </v-main>
  </v-app>
</template>


<!-- App.vue -->
<script setup>
import { onMounted } from 'vue'
import { useWalletStore } from '@/store/walletStore'
import UserRoleSelector from './components/UserRoleSelector.vue'

const walletStore = useWalletStore()

onMounted(() => {
  walletStore.connectWallet()
})
</script>

<!-- App.vue -->
<template>

  <v-app id="inspire">
    <!-- App Bar -->
    <v-app-bar class="px-3" density="compact" flat>
      <!-- 顯示選單的按鈕 -->
      <v-avatar class="hidden-md-and-up" color="grey-darken-1" size="32"></v-avatar>
      <v-spacer></v-spacer>

      <!-- 顯示目前身分 -->
      <div v-if="walletStore.currentRole !== null" class="me-4 text-subtitle-1" >
        <v-icon icon="mdi-account-badge" class="me-1"/>
        <span>目前身分：</span>
        <span v-if="walletStore.currentRole === 1">學生</span>
        <span v-else-if="walletStore.currentRole === 2">商家</span>
        <span v-else-if="walletStore.currentRole === 3">管理員</span>
        <span v-else>未知</span>
      </div>

      <!-- 使用 Vuetify 的 Tabs 來顯示導航 -->
        <v-tabs align-tabs="center" color="grey-darken-2">

          <router-link to="/" class="tab-link"><v-tab>首頁</v-tab></router-link>

          <router-link to="/wallet" class="tab-link"><v-tab>錢包</v-tab></router-link>

          <router-link to="/tasks" class="tab-link"><v-tab>任務</v-tab></router-link>

          <router-link to="/store" class="tab-link"><v-tab>商店</v-tab></router-link>
         
          <router-link to="/task-publish" class="tab-link" v-if="[2,3].includes(walletStore.currentRole)">
            <v-tab>發布任務</v-tab>
          </router-link>
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
        <v-footer class="text-center d-flex flex-column ga-2 py-4" color="indigo-lighten-1">
    <div class="d-flex ga-3">
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        density="comfortable"
        variant="text"
      ></v-btn>
    </div>

    <v-divider class="my-2" thickness="2" width="50"></v-divider>

    <div class="text-caption font-weight-regular opacity-60">
本系統使用 MetaMask 作為區塊鏈互動介面，僅用於身份驗證與任務獎勵代幣接收。所有代幣不可兌換現金，僅限於校內封閉平台中兌換指定商品券或虛擬資產（如 NFT）。本系統不涉及任何金融交易或匯兌行為，完全符合法律規範。    </div>
    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </div>
  </v-footer>
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

<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title>選擇你的角色</v-card-title>
      <v-card-text>請選擇你在平台上的角色（此動作只能做一次）</v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-btn color="primary" block @click="selectRole('user')">我是使用者</v-btn>
        <v-btn color="success" block @click="selectRole('merchant')">我是商家</v-btn>
        <v-btn color="warning" block @click="selectRole('admin')">我是管理員</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const dialog = ref(false)
const walletAddress = ref('')

// 假設你已有透過 MetaMask 取得的地址
onMounted(async () => {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  walletAddress.value = accounts[0]
  const stored = localStorage.getItem(`role_${walletAddress.value}`)
  if (!stored) {
    dialog.value = true
  }
})

function selectRole(role) {
  localStorage.setItem(`role_${walletAddress.value}`, role)
  dialog.value = false
  alert(`角色「${role}」已儲存！`)
}
</script>

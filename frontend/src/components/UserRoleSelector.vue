<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title>選擇你的角色</v-card-title>
      <v-card-text>請選擇你在平台上的角色（此動作只能做一次）</v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-btn color="primary" block @click="selectRole('Student')">我是使用者</v-btn>
        <v-btn color="success" block @click="selectRole('Merchant')">我是商家</v-btn>
        <v-btn color="warning" block @click="selectRole('Admin')">我是管理員</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ethers } from 'ethers' // ethers v6 匯入方式一樣
import { CONTRACT_ADDRESSES } from '@/contracts/addresses'

const dialog = ref(false)
const walletAddress = ref('')
const roleMap = { Student: 1, Merchant: 2, Admin: 3 }

// 替換為你的部署合約資料
const contractAddress = CONTRACT_ADDRESSES.userRole
const userRoleABI = [
  'function setRole(address user, uint8 role) public',
  'function getRole(address user) public view returns (uint8)'
]

onMounted(async () => {
  try {
    if (!window.ethereum) {
      alert("請安裝 MetaMask")
      return
    }

    const provider = new ethers.BrowserProvider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", [])
    walletAddress.value = accounts[0]

    const contract = new ethers.Contract(contractAddress, userRoleABI, provider)
    const role = await contract.getRole(walletAddress.value)

    // 如果是管理員(3)或商家(2)或學生(1)，都不跳出選擇器
    // 只有角色為0(未設定)才跳出
    if (Number(role) === 0) {
      dialog.value = true
    } else {
      dialog.value = false
    }
  } catch (err) {
    console.error('初始化角色選擇器時發生錯誤：', err)
    alert("無法讀取角色資訊，請稍後再試或檢查合約設定")
  }
})


async function selectRole(roleName) {
  const roleValue = roleMap[roleName]

  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const contract = new ethers.Contract(contractAddress, userRoleABI, signer)

  try {
    const tx = await contract.setRole(walletAddress.value, roleValue)
    await tx.wait()

    dialog.value = false
    localStorage.setItem(`role_${walletAddress.value}`, roleName)
    alert(`角色「${roleName}」已成功寫入區塊鏈！`)
  } catch (err) {
    console.error('設置角色失敗', err)
    alert("設置角色失敗：" + (err?.shortMessage || err.message))
  }
}
</script>

<template>
  <v-container>
    <v-card class="pa-4" elevation="2" max-width="500" mx="auto">
      <v-card-title>發布新任務</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="publishTask">
          <v-text-field v-model="taskName" label="任務名稱" required></v-text-field>
          <v-radio-group v-model="taskType" label="任務類型" row>
            <v-radio label="消費" value="消費"></v-radio>
            <v-radio label="問卷填寫" value="問卷填寫"></v-radio>
            <v-radio label="參與活動" value="參與活動"></v-radio>
          </v-radio-group>
          <v-text-field v-if="taskType === '消費'" v-model.number="targetAmount" label="消費目標金額 (MTK)" type="number" min="1" required></v-text-field>
          <v-text-field v-model="desc" :label="taskType === '消費' ? '任務內容（可補充說明）' : '任務內容'" required></v-text-field>
          <v-text-field v-model.number="reward" label="獎勵金額 (MTK)" type="number" min="1" required></v-text-field>
          <v-text-field v-model.number="maxClaims" label="可領取人數" type="number" min="1" required></v-text-field>
          <v-btn type="submit" color="primary" :loading="loading">發布任務</v-btn>
        </v-form>
        <v-alert v-if="successMsg" type="success" class="mt-2">{{ successMsg }}</v-alert>
        <v-alert v-if="errorMsg" type="error" class="mt-2">{{ errorMsg }}</v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESSES } from '@/contracts/addresses'
import taskRewardABI from '@/abi/TaskReward.json'

const taskName = ref('')
const taskType = ref('消費')
const desc = ref('')
const targetAmount = ref(0)
const reward = ref(1)
const maxClaims = ref(1)
const loading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

async function publishTask() {
  loading.value = true
  successMsg.value = ''
  errorMsg.value = ''
  try {
    if (!window.ethereum) throw new Error('請安裝 MetaMask')
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(CONTRACT_ADDRESSES.taskReward, taskRewardABI.abi, signer)
    // reward 單位為 MTK，需轉成最小單位
    const decimals = 18
    // 將任務名稱、類型、內容合併為 description
    let fullDesc = `[${taskName.value}] [${taskType.value}] `
    if (taskType.value === '消費') {
      fullDesc += `消費滿 ${targetAmount.value} MTK 即可領取獎勵。`
      if (desc.value) fullDesc += ' ' + desc.value
    } else {
      fullDesc += desc.value
    }
    const tx = await contract.createTask(fullDesc, ethers.parseUnits(reward.value.toString(), decimals), maxClaims.value)
    await tx.wait()
    successMsg.value = '✅ 任務已成功發布！'
    taskName.value = ''
    taskType.value = '消費'
    desc.value = ''
    reward.value = 1
    maxClaims.value = 1
    targetAmount.value = 0
  } catch (err) {
    errorMsg.value = '❌ 發布失敗：' + (err?.shortMessage || err.message)
  } finally {
    loading.value = false
  }
}
</script>

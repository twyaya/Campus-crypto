<template>
  <v-container>
    <v-card class="pa-4" elevation="2">
      <v-card-title>任務列表</v-card-title>
      <v-data-table
        :headers="headers"
        :items="tasks"
        item-value="taskId"
        class="elevation-1"
      >
        <template #item.description="{ item }">
          <div>
            <v-chip color="primary" size="small" class="ma-1" v-if="parseDesc(item.description).name">
              {{ parseDesc(item.description).name }}
            </v-chip>
            <v-chip color="info" size="small" class="ma-1" v-if="parseDesc(item.description).type">
              {{ parseDesc(item.description).type }}
            </v-chip>
            <span>{{ parseDesc(item.description).content }}</span>
          </div>
        </template>
        <template #item.completed="{ item }">
          <v-chip :color="item.completed ? 'green' : 'grey'" class="text-white" size="small">
            {{ item.completed ? '已完成' : '未完成' }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESSES } from '@/contracts/addresses'
import taskRewardABI from '@/abi/TaskReward.json'

const headers = ref([
  { title: '任務編號', key: 'taskId' },
  { title: '任務名稱/類型/內容', key: 'description' },
  { title: '獎勵', key: 'reward' },
  { title: '完成狀態', key: 'completed' },
  { title: '指派對象', key: 'assignedTo' },
])

const tasks = ref([])

const contractAddress = CONTRACT_ADDRESSES.taskReward

function parseDesc(desc) {
  // 格式: [名稱] [類型] 內容
  const match = desc.match(/^\[(.*?)\]\s*\[(.*?)\]\s*(.*)$/)
  if (match) {
    return { name: match[1], type: match[2], content: match[3] }
  }
  return { name: '', type: '', content: desc }
}

const loadTasks = async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, taskRewardABI, provider)
    const nextId = await contract.nextTaskId()
    const taskList = []
    for (let i = 0; i < nextId; i++) {
      const task = await contract.getTask(i)
      taskList.push({
        taskId: i,
        description: task[0],
        reward: Number(task[1]),
        maxClaims: Number(task[2]),
        currentClaims: Number(task[3]),
        assignedTo: task[4],
        completed: false // 可根據 hasUserClaimed 查詢
      })
    }
    tasks.value = taskList
  } catch (err) {
    console.error('任務讀取失敗:', err)
  }
}

onMounted(loadTasks)
</script>

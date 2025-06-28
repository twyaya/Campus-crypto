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
import taskRewardABI from '@/abi/TaskReward.json' // 請確保 ABI 已放到 src/abi 目錄

const headers = ref([
  { title: '任務編號', key: 'taskId' },
  { title: '內容', key: 'description' },
  { title: '獎勵', key: 'reward' },
  { title: '完成狀態', key: 'completed' },
  { title: '指派對象', key: 'assignedTo' },
])

const tasks = ref([])

const contractAddress = CONTRACT_ADDRESSES.taskReward

const loadTasks = async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, taskRewardABI, provider)
    const nextId = await contract.nextTaskId()
    const taskList = []
    for (let i = 0; i < nextId; i++) {
      const task = await contract.tasks(i)
      taskList.push({
        taskId: i,
        description: task.description,
        reward: Number(task.reward),
        completed: task.completed,
        assignedTo: task.assignedTo,
      })
    }
    tasks.value = taskList
  } catch (err) {
    console.error('任務讀取失敗:', err)
  }
}

onMounted(loadTasks)
</script>

<template>
  <v-container>
    <v-card class="pa-4" elevation="2">
      <v-card-title>任務列表</v-card-title>

      <v-data-table
        :headers="headers"
        :items="tasks"
        item-value="name"
        class="elevation-1"
      >
        <template #item.difficulty="{ item }">
          <v-chip :color="difficultyColor(item.difficulty)" class="text-white" size="small">
            {{ item.difficulty }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const headers = ref([
  { title: '任務名稱', key: 'name' },
  { title: '獎勵貨幣數量', key: 'reward' },
  { title: '任務難度', key: 'difficulty' }
])

const tasks = ref([
  { name: '完成問卷填寫', reward: 5, difficulty: '簡易' },
  { name: '參加商家互動活動', reward: 10, difficulty: '普通' },
  { name: '完成一週內消費任務', reward: 20, difficulty: '困難' }
])

const difficultyColor = (difficulty) => {
  switch (difficulty) {
    case '簡易': return 'green'
    case '普通': return 'orange'
    case '困難': return 'red'
    default: return 'grey'
  }
}
</script>

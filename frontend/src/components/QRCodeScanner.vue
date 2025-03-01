<template>
    <div>
      <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
      <p v-if="scannedData">掃描結果: {{ scannedData }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { QrcodeStream } from 'vue-qrcode-reader'
  
  const scannedData = ref(null)
  
  function onDecode(data) {
    scannedData.value = data
    alert(`掃描成功: ${data}`)
    // 這裡可以發送交易邏輯
  }
  
  function onInit(promise) {
    promise.catch(error => console.error('相機初始化失敗', error))
  }
  </script>
  
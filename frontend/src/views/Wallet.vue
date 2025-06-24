<template>
  <div>
    <h1>我的錢包</h1>
    <v-btn @click="connectWallet"  color="success">
      連接 MetaMask
    </v-btn>
    <p v-if="walletStore.account">帳戶: {{ walletStore.account }}</p>
    <p v-if="walletStore.balance">手續費餘額: {{ walletStore.balance }} ETH</p>

    <h2>掃描 QR Code 付款</h2>
    <QRCodeScanner />
  </div>
</template>

<script setup>
import { useWalletStore } from '@/store/walletStore'
import QRCodeScanner from '@/components/QRCodeScanner.vue'

const walletStore = useWalletStore()

function connectWallet() {
  walletStore.connectWallet()
}
</script>

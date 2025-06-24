<!-- frontend/src/views/Home.vue -->
<template>
    <div>
      <v-img
      :src="banner">
      </v-img>
      <br/>
      <v-row>

        <v-col cols="12" md="4">
                <v-card
              class="mx-auto"
              max-width="344"
              hover
            >

                <v-card-item>
                  <v-card-title>
                    <v-icon icon="mdi-ethereum"></v-icon>
                    <span v-if="walletStore.balance">餘額: {{ walletStore.balance }} ETH</span>
                </v-card-title>

                <v-card-subtitle>
                  你持有的ETH將用於支付手續費
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                <p v-if="walletStore.account">帳戶: {{ walletStore.account }}</p>
                
              </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" md="4">
                <v-card
              class="mx-auto"
              max-width="344"
              hover
            >

                <v-card-item>
                  <v-card-title>
                    <v-icon icon="mdi-ethereum"></v-icon>
                    <span>ETH花費總額: {{ walletStore.getTotalSpent() }} ETH</span>
                </v-card-title>

                <v-card-subtitle>
                  自連結錢包以來的花費的手續費總額
                </v-card-subtitle>
              </v-card-item>

            </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="mx-auto" max-width="344" hover>
            <v-card-item>
              <v-card-title>
                <v-icon icon="mdi-history"></v-icon>
                <span v-if="walletStore.balance">交易紀錄</span>
              </v-card-title>

              <v-card-subtitle>
                自連結錢包以來的交易紀錄
              </v-card-subtitle>
            </v-card-item>

            <v-card-text>
              <div v-if="transactions.length === 0">暫無交易紀錄</div>
              <div v-else>
                <div v-for="(tx, index) in transactions" :key="index">
                  <p>From: {{ tx.from }}</p>
                  <p>To: {{ tx.to }}</p>
                  <p>Value: {{ tx.value }} ETH</p>
                  <hr />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>



    </div>
  </template>
  <script setup>
    import { onMounted, ref, watch } from 'vue'
    import { useWalletStore } from '@/store/walletStore'
    import banner from '@/assets/banner.png'


    const walletStore = useWalletStore()
    const transactions = ref([])

    onMounted(async () => {
      await walletStore.connectWallet()
      transactions.value = await walletStore.getTransactionHistory()
    })

    const review = ref("10%")

</script>

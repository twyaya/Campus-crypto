<!-- frontend/src/views/Home.vue -->
<template>
    <div>
      <v-img
      :src="banner">
      </v-img>
      <v-row>

        <v-col cols="12" md="3">
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
                  錢包內持有的ETH數量
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                <p v-if="walletStore.account">帳戶: {{ walletStore.account }}</p>
                
              </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" md="3">
                <v-card
              class="mx-auto"
              max-width="344"
              hover
            >

                <v-card-item>
                  <v-card-title>
                    <v-icon icon="mdi-ethereum"></v-icon>
                    <span>花費總額: {{ walletStore.getTotalSpent() }} ETH</span>
                </v-card-title>

                <v-card-subtitle>
                  自連結錢包以來的花費總額
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

    <v-card>
      <v-card-title class="text-overline">
        進度

        <div class="text-green-darken-3 text-h3 font-weight-bold">90%</div>

        <div class="text-h6 text-medium-emphasis font-weight-regular">
          $2,938.00 remaining
        </div>
      </v-card-title>
      <v-card-text>

        <v-progress-linear
          color="green-darken-3"
          height="22"
          model-value="90"
          rounded="lg"
        >

        </v-progress-linear>

        <div class="d-flex justify-space-between py-3">
          <span class="text-green-darken-3 font-weight-medium">
            $26,442.00 remitted
          </span>

          <span class="text-medium-emphasis"> $29,380.00 total </span>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-list-item
        append-icon="mdi-chevron-right"
        lines="two"
        subtitle="Details and agreement"
        link
      ></v-list-item>
    </v-card>




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

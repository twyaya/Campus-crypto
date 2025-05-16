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
                    <p v-if="walletStore.balance">餘額: {{ walletStore.balance }} ETH</p>
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
                    <p v-if="walletStore.balance">花費總額: ??? ETH</p>
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
                <p v-if="walletStore.balance">交易紀錄</p>
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

      <v-row>
          <v-col md="6">
        `      <v-card
                class="mx-auto text-center"
                color="green"
                max-width="600"
                dark
              >
            <v-card-text>
              <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline
                  :model-value="[0, 446, 675, 510, 590, 610, 760]"
                  color="rgba(255, 255, 255, .7)"
                  height="100"
                  padding="24"
                  stroke-linecap="round"
                  smooth
                >
                  <template v-slot:label="item">
                    ${{ item.value }}
                  </template>
                </v-sparkline>
              </v-sheet>
            </v-card-text>

            <v-card-text>
              <div class="text-h4 font-weight-thin">
                餘額變化
              </div>
            </v-card-text>

            <v-divider></v-divider>
          </v-card>
        </v-col>
      </v-row>`




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
</script>

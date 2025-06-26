<!-- frontend/src/views/Home.vue -->
<template>
    <div>
      <v-img
      :src="banner">
      </v-img>
      <br/>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="368">
            <v-card-item title="持有的MTK">
              <template v-slot:subtitle> 可用於商店交易 </template>
            </v-card-item>

            <v-card-text class="py-0">
              <v-row align="center" no-gutters>
                <v-icon color="error" icon="mdi-ethereum" size="60"></v-icon>
                <v-col class="text-h2" cols="6"> 64 </v-col>
              </v-row>
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
        <v-col cols="12" md="4">  
          <v-card
            class="mx-auto text-white"
            color="#26c6da"
            max-width="400"
            prepend-icon="mdi-twitter"
            title="來自開發者的提醒"
          >
            <v-card-text class="text-h6 py-2">
              "MTK用於商店交易而ETH則用於手續費"
            </v-card-text>

            <v-card-actions>
              <v-list-item class="w-100">
                <template v-slot:prepend>
                  <v-avatar
                    color="grey-darken-3"
                    image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-avatar>
                </template>

                <v-list-item-title>HAOWEI</v-list-item-title>

                <v-list-item-subtitle>開發者</v-list-item-subtitle>

                <template v-slot:append>
                  <div class="justify-self-end">
                    <v-icon class="me-1" icon="mdi-heart"></v-icon>
                    <span class="subheading me-2">780</span>
                    <span class="me-1">·</span>
                    <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
                    <span class="subheading">89</span>
                  </div>
                </template>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
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

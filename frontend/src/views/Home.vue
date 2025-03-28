<!-- frontend/src/views/Home.vue -->
<template>
    <div>
      <h2>歡迎來到 Campus Crypto</h2>
      <p>這是一個加密貨幣平台。</p>

      <v-row>
        <v-col col="12" md="3">
          <v-card
            class="mx-auto"
            title="花費總額"
          >
          <template v-slot:prepend>
            <v-avatar color="blue-darken-2">
              <v-icon icon="mdi-currency-usd"></v-icon>
            </v-avatar>
          </template>
          <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text>
        </v-card>
        </v-col>
        <v-col col="12" md="3">
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
                  Card subtitle secondary text
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                <p v-if="walletStore.account">帳戶: {{ walletStore.account }}</p>
                
              </v-card-text>
            </v-card>
        </v-col>
        <v-col col="12" md="3">
              <v-card
            class="mx-auto"
            max-width="344"
            hover
          >
            <v-card-item>
              <v-card-title>
                <v-icon color="success" icon="mdi-antenna"></v-icon>

                花費總額
              </v-card-title>

              <v-card-subtitle>
                Card subtitle secondary text
              </v-card-subtitle>
            </v-card-item>

            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
  import { useWalletStore } from '@/store/walletStore'
  
  const walletStore = useWalletStore()
  
  function connectWallet() {
    walletStore.connectWallet()
  }

  
  </script>
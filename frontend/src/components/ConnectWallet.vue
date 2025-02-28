<template>
    <div>
      <button @click="connectWallet" v-if="!userAddress">
        連接 MetaMask
      </button>
      <div v-else>
        已連接: {{ userAddress }}
      </div>
    </div>
</template>
  
  <script>
  import { ref } from "vue";
  import { ethers } from "ethers";
  
  export default {
    setup() {
      const userAddress = ref("");
  
      const connectWallet = async () => {
        if (window.ethereum) {
          try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            userAddress.value = accounts[0];
            console.log("連接成功", accounts[0]);
          } catch (error) {
            console.error("連接失敗", error);
          }
        } else {
          alert("請安裝 MetaMask 錢包！");
        }
      };
  
      return {
        userAddress,
        connectWallet,
      };
    },
  };
  </script>
  
  <style scoped>
  button {
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  </style>
  
import { defineStore } from 'pinia'
import { ethers } from 'ethers'

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    account: null,
    balance: '0'
  }),
  actions: {
    async connectWallet() {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send('eth_requestAccounts', [])
        this.account = accounts[0]
        this.getBalance()
      } else {
        alert('請安裝 MetaMask')
      }
    },
    async getBalance() {
      if (this.account) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const balance = await provider.getBalance(this.account)
        this.balance = ethers.formatEther(balance)
      }
    }
  }
})

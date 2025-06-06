//wallet.Store.js
import { defineStore } from 'pinia'
import { ethers } from 'ethers'

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    account: null,
    balance: '0',
    transactionHistory: []
  }),
  actions: {
    async connectWallet() {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send('eth_requestAccounts', [])
        this.account = accounts[0]
        await this.getBalance()
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
    },
    async getTransactionHistory() {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const latestBlock = await provider.getBlockNumber()
      const START_BLOCK = Math.max(0, latestBlock - 100)
      const history = []

      for (let i = latestBlock; i >= START_BLOCK; i--) {
        const block = await provider.send("eth_getBlockByNumber", [
          ethers.toBeHex(i),  // e.g., "0x1a"
          true
        ])

        if (!block || !block.transactions) continue

        for (const tx of block.transactions) {
          if (
            tx.from?.toLowerCase() === this.account.toLowerCase() ||
            tx.to?.toLowerCase() === this.account.toLowerCase()
          ) {
            history.push({
              hash: tx.hash,
              from: tx.from,
              to: tx.to,
              value: ethers.formatEther(tx.value),
              blockNumber: parseInt(block.number)
            })
          }
        }
      }

      this.transactionHistory = history
      return history


    },
    getTotalSpent() {
      return this.transactionHistory
        ?.filter(tx => tx.from?.toLowerCase() === this.account.toLowerCase())
        ?.reduce((sum, tx) => sum + parseFloat(tx.value), 0)
        ?.toFixed(4) || '0'
    }



  }
})

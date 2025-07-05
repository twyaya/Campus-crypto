//wallet.Store.js
import { defineStore } from 'pinia'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESSES } from '@/contracts/addresses'

const MTK_ADDRESS = CONTRACT_ADDRESSES.token
const MTK_ABI = [   // MTK 合約的 ABI
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)"
]

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    account: null,
    balance: '0',
    transactionHistory: [],
    mtkTransfers: []
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
      const START_BLOCK = Math.max(0, latestBlock - 100) // 取得最近100個區塊的交易歷史
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
    async getMTKTransfers() {
      if (!this.account) return [];
      const provider = new ethers.BrowserProvider(window.ethereum);
      const token = new ethers.Contract(MTK_ADDRESS, MTK_ABI, provider);
      const decimals = await token.decimals();
      const filter = token.filters.Transfer(this.account, null);
      const logs = await token.queryFilter(filter, -10000); // 查詢最近10000個轉帳事件
      const transfers = logs.map(log => ({
        from: log.args.from,
        to: log.args.to,
        value: ethers.formatUnits(log.args.value, decimals)
      }));
      this.mtkTransfers = transfers;
      return transfers;
    },
    getTotalMTKSpent() {
      return this.mtkTransfers
        ?.reduce((sum, tx) => sum + parseFloat(tx.value), 0)
        ?.toFixed(4) || '0';
    },
    async getMTKBalance() {
      if (!this.account) return "0";
      const provider = new ethers.BrowserProvider(window.ethereum);
      const token = new ethers.Contract(MTK_ADDRESS, MTK_ABI, provider); // MTK 合約地址
      const decimals = await token.decimals();
      const balance = await token.balanceOf(this.account);
      return ethers.formatUnits(balance, decimals);
    },
    getTotalSpent() {
      return this.transactionHistory
        ?.filter(tx => tx.from?.toLowerCase() === this.account.toLowerCase())
        ?.reduce((sum, tx) => sum + parseFloat(tx.value), 0)
        ?.toFixed(4) || '0'
    }



  }
})

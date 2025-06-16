require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20", // 設定合約的 Solidity 版本
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache 的本地鏈路
      accounts: [
        'f2b509f11db86b69d9bfd021ae4ff92fe01c97ed7ee4152ed9a1a93cf4ebeeb8',
      ]
    }
  }
};

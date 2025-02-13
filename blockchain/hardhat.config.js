require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.9", // 設定合約的 Solidity 版本
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache 的本地鏈路
      accounts: [
        '0xfe9f7b3731859e252bf1530e1aa7796b8db6c823a424f2e08b971bc0993191e0',
      ]
    }
  }
};

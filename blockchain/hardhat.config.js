require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.9", // 設定合約的 Solidity 版本
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache 的本地鏈路
      accounts: [
        '0x4637ebc06e9e4c7b16e0f7c43dbd13724dabba126ece4bfc75be9ac49d3ee8f6',
      ]
    }
  }
};

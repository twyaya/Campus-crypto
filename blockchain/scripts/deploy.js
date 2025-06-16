const { ethers } = require("hardhat");

async function main() {
  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy(); // 這邊 deploy() 會送出交易
  await token.deployed();             // ✅ 等待部署完成（這是正確的）

  console.log("Token deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

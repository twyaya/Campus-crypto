const { ethers } = require("hardhat");

async function main() {
  const initialSupply = 100000;
  // 部署 MyToken 合約
  // ethers.getContractFactory() 會回傳一個合約工廠，這個工廠可以用來部署合約 
  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy(initialSupply); // 這邊 deploy() 會送出交易
  await token.deployed();             // 等待部署完成

  console.log("Token deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

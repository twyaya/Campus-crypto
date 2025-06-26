const { ethers } = require("hardhat");

async function main() {
  const initialSupply = 100000;

  // 1. 部署 MyToken
  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy(initialSupply);
  await token.deployed();
  console.log("MyToken 部署完成:", token.address);

  // 2. 部署 UserRole
  const UserRole = await ethers.getContractFactory("UserRole");
  const userRole = await UserRole.deploy();
  await userRole.deployed();
  console.log("UserRole 部署完成:", userRole.address);

  // 3. 部署 TaskReward（傳入 token, userRole）
  const TaskReward = await ethers.getContractFactory("TaskReward");
  const taskReward = await TaskReward.deploy(token.address, userRole.address);
  await taskReward.deployed();
  console.log("TaskReward 部署完成:", taskReward.address);

  // 4. 部署 Payment（可選）
  const Payment = await ethers.getContractFactory("Payment");
  const payment = await Payment.deploy(token.address, userRole.address);
  await payment.deployed();
  console.log("Payment 部署完成:", payment.address);

  // 5. 儲存地址供前端或後續腳本使用
  const fs = require("fs");
  fs.writeFileSync("deployed-addresses.json", JSON.stringify({
    token: token.address,
    userRole: userRole.address,
    taskReward: taskReward.address,
    payment: payment.address
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

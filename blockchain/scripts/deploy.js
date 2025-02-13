const { ethers } = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  // 這裡修改成 20 ETH 比較有感覺
  const lockedAmount = ethers.utils.parseEther("20");

  // 獲取合約工廠
  const Lock = await ethers.getContractFactory("Lock");

  // 部署合約並傳遞參數
  const lock = await Lock.deploy(unlockTime, {
    value: lockedAmount,
  });

  await lock.deployed();

  console.log(
    `Lock with ${ethers.utils.formatEther(
      lockedAmount
    )} ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { ethers } from "hardhat";
import { promises as fs } from "fs";

async function main() {
  const Tester = await ethers.getContractFactory("Tester");
  const tester = await Tester.deploy("Tester, test!");
  console.log("Tester deployed to:", tester.target);

  try {
    console.log("Set only even: 3");
    const tx = await tester.setOnlyEven.populateTransaction(3);
    tx.gasLimit = 100000;
    const t = await tester.runner.sendTransaction(tx);
  } catch (e) {
      console.log(e);
  }
  try {
    console.log("Set only even: 4");
    const tx = await tester.setOnlyEven.populateTransaction(4);
    tx.gasLimit = 100000;
    const t = await tester.runner.sendTransaction(tx);
  } catch (e) {
      console.log(e);
  }

  let abi = JSON.parse(await fs.readFile("artifacts/contracts/Tester.sol/Tester.json", "utf-8"));
  abi.address = tester.target
  await fs.writeFile("abi.json", JSON.stringify(abi, null, 4));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import { ethers } from "ethers";
import { HardhatNetworkAccountUserConfig } from "hardhat/types";


dotenv.config();

function getAccounts() {
  const accounts: HardhatNetworkAccountUserConfig[] = [];
  const defaultBalance = ethers.parseEther("2000000").toString();

  if (process.env.PRIVATE_KEY) {
    const plainKey = new ethers.Wallet(process.env.PRIVATE_KEY).privateKey;
    accounts.push({
      privateKey: plainKey,
      balance: defaultBalance
    });
  } else {
    const n = 10;
    for (let i = 0; i < n; ++i) {
      accounts.push({
        privateKey: ethers.Wallet.createRandom().privateKey,
        balance: defaultBalance
      })
    }
  }

  return accounts;
}

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      accounts: getAccounts(),
      chainId: 31337,
      blockGasLimit: 12000000,
      gasPrice: 1000000000,
      mining: {
        auto: true,
        interval: 12000
      }
    }
  }
};

export default config;

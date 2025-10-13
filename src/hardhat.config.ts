import * as dotenv from "dotenv";
import type { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const BIG_BALANCE = 2000000000000000000000000n;
const FAST = process.env.FAST_MODE !== "0";
const intervalMs = parseInt(process.env.MINING_INTERVAL_MS || "100", 10);

const accounts =
  process.env.PRIVATE_KEY
    ? [{ privateKey: process.env.PRIVATE_KEY as string, balance: BIG_BALANCE }]
    : {
      mnemonic: process.env.MNEMONIC ?? "test test test test test test test test test test test junk",
      count: parseInt(process.env.ACCOUNTS_COUNT || "10", 10),
      accountsBalance: BIG_BALANCE,
    };

const config: HardhatUserConfig = {
  solidity: { version: "0.8.26", settings: { optimizer: { enabled: false, runs: 1 }, viaIR: false } },
  networks: {
    hardhat: {
      type: "edr-simulated",
      chainId: 31337,
      accounts,
      loggingEnabled: false,
      allowUnlimitedContractSize: true,
      blockGasLimit: 30_000_000,
      initialBaseFeePerGas: 0,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      mining: FAST
        ? { auto: true, mempool: { order: "fifo" } }
        : { auto: false, interval: intervalMs, mempool: { order: "fifo" } },
    }
  },
};

export default config;
import * as dotenv from 'dotenv';

import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: '0.8.13',
  networks: {
    baobab: {
      chainId: 1001,
      url:
        process.env.BAOBAB_URL ||
        'https://public-node-api.klaytnapi.com/v1/baobab',
      accounts:
        process.env.PRIVATE_KEY_BAOBAB !== undefined
          ? [process.env.PRIVATE_KEY_BAOBAB]
          : [],
      gas: 80000000,
      gasPrice: 750000000000,
    },
    cypress: {
      chainId: 8217,
      url: process.env.CYPRESS_URL || 'https://klaytn-api.fingerlabs.io',
      accounts:
        process.env.PRIVATE_KEY_CYPRESS !== undefined
          ? [process.env.PRIVATE_KEY_CYPRESS]
          : [],
      gas: 80000000,
      gasPrice: 750000000000,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
import 'dotenv/config';
import * as env from 'env-var';
import { ethers } from 'ethers';
import a from './erc721.abi.json';

const provider = new ethers.providers.JsonRpcProvider('https://klaytn-api.fingerlabs.io')
const address = env.get('SUNMIYA_CONTRACT_ADDR').required().asString();
console.log(address);
  
(async () => {
  const contractSunmiya = new ethers.Contract(address, a.abi, provider)

  const name = await contractSunmiya.name();
  console.log(name)

  const filterFrom = contractSunmiya.filters.Transfer();
  console.log(filterFrom)

  const transferEvernts = await contractSunmiya.queryFilter(filterFrom, 92355815, 92362801)
  console.log(transferEvernts)
})();
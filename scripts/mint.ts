import 'dotenv/config';
import * as env from 'env-var';
import { parseEther } from 'ethers/lib/utils';
import { ethers } from 'hardhat';

const testTokenContractAddr = env.get('TT_CONTRACT_ADDR').required().asString();
const walletAddress1 = env.get('WALLET_ADDRESS_1').required().asString();
const walletAddress2 = env.get('WALLET_ADDRESS_2').required().asString();
const privateKey1 = env.get('PRIVATE_KEY_BAOBAB').required().asString();
const privateKey2 = env.get('PRIVATE_KEY_BAOBAB_2').required().asString();


(async () => {
  
  const provider = new ethers.providers.JsonRpcProvider('https://public-node-api.klaytnapi.com/v1/baobab');
  const signer1 = new ethers.Wallet(privateKey1, provider);
  const signer2 = new ethers.Wallet(privateKey2, provider);
  const signerContract = await ethers.getContractAt('TestToken', testTokenContractAddr);

  const transaction2 = await signerContract.mint(walletAddress1, parseEther('100.0'));
  await transaction2.wait();


  const balanceOfWallet1 =await signerContract.balanceOf(walletAddress1);
  console.log(balanceOfWallet1)
})();

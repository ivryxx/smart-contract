import 'dotenv/config';
import * as env from 'env-var';
import { ethers } from 'ethers';
import { hexValue, parseEther } from 'ethers/lib/utils';

(async () => {
  const provider = new ethers.providers.JsonRpcProvider('https://public-node-api.klaytnapi.com/v1/baobab');

  const privateKey = env.get('PRIVATE_KEY_BAOBAB').required().asString();

  const signingKey = new ethers.utils.SigningKey(privateKey)
  console.log('signKey: ', signingKey)

  let wallet = new ethers.Wallet(privateKey, provider);
  console.log('wallet address: ', wallet.address);
  
  console.log(hexValue)

  const message = 'Hello World';

  const signature = await wallet.signMessage(message);
  console.log('signature: ', signature)

  const verifiedMsg = ethers.utils.verifyMessage(message, signature);
  console.log('verifiedMsg: ', verifiedMsg);

  const account = env.get('WALLET_ADDRESS_2').required().asString();

  const estimateGas = await provider.estimateGas({
    to: account,
    data: '0xd0e30db0',
    value: parseEther('1.0')
  })
  console.log('estimateGas: ', estimateGas.toString())
  
  const effectiveGas = 0x05d21dba00.toString();
  console.log('effectiveGas: ', effectiveGas)

  const gasPrice = await provider.getGasPrice();
  console.log('gasPrice: ', gasPrice.toString());


  const tx = await wallet.sendTransaction({
    to: account,
    value: 90000000000,
    gasPrice: 50000000000,
    gasLimit: 21400,
  });
  const receipt = await tx.wait()
  console.log('receipt: ', receipt)

})();

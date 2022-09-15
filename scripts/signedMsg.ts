import 'dotenv/config';
import * as env from 'env-var';
import { ethers } from 'ethers';

(async () => {
  const provider = new ethers.providers.JsonRpcProvider('https://public-node-api.klaytnapi.com/v1/baobab');

  const privateKey = env.get('PRIVATE_KEY_BAOBAB').required().asString();

  const signingKey = new ethers.utils.SigningKey(privateKey)

  let wallet = new ethers.Wallet(privateKey);
  console.log('wallet address: ', wallet.address);

  const message = 'Hello World';

  const signature = await wallet.signMessage(message);
  console.log('signature: ', signature)

  const verifiedMsg = ethers.utils.verifyMessage(message, signature);
  console.log(verifiedMsg);
})();


import { ethers } from 'hardhat';

import { ERC20 } from '../../typechain-types';

let testToken: ERC20;


export const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log(deployer)
  console.log('deployer address : ', deployer.address);
  
  const Token = await ethers.getContractFactory('TestToken')
  const TestToken = await Token.deploy('TestToken','TT');
  testToken = await TestToken.deployed();
  console.log('Token address', testToken.address);
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1)
  });

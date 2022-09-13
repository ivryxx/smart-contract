import { ethers } from "hardhat";

import { ERC721 } from '../../typechain-types';

let testToken721: ERC721;

export const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log(deployer)
  console.log('deployer address : ', deployer.address);
  
  const Token = await ethers.getContractFactory('ERC721TT')
  const TestToken = await Token.deploy('TestToken721','TT721');
  testToken721 = await TestToken.deployed();
  console.log('Token addres : ', testToken721.address);
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1)
  });
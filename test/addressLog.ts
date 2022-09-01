import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe("Token contract", () => {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const ownerlist = await ethers.getSigners();

   
    const addresslist = ownerlist.map(function (e) {
      return (e.address)
    })
    
    console.log(addresslist)



    // const Token = await ethers.getContractFactory("Token");

    // const hardhatToken = await Token.deploy();

    // const ownerBalance = await hardhatToken.balanceOf(ownerlist.address );
    // expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});
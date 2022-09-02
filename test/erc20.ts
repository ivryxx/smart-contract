// import '@openzeppelin/contracts/token/ERC20';
import '@typechain/hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
// import { ethers } from 'ethers';
import { ethers } from 'hardhat';
import { expect } from 'chai';
import { ERC20, ERC20__factory, Token } from '../typechain-types';
import { TotalSupply } from './class'

describe('Token contract', () => {
  let erc20: ERC20;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function deployTokenFixture() {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory('ERC20');
    const ERC20 = await Token.deploy('TestToken', 'TEST');
 
    erc20 = await ERC20.deployed();
  });

  // 총 발행량 totalSupply
  describe('totalSupply', () => {
    it('Should assign the total supply of tokens to the owner', async function () {
      const ownerBalance = await erc20.balanceOf(owner.address);
      expect(await erc20.totalSupply()).to.equal(owner.address);
      
    });
  });

  // 잔액 balanceOf
  describe('balanceOf', () => {
    it('Should assign the account balance of another account with addres', async function () {
      const balanceofOwner = await erc20.balanceOf(owner.address);
      expect(await erc20.balanceOf(owner.address))
    });


  });

  // 송금 transfer
  describe('transfer', () => {
    it('Must fire the transfer event')
  })

  //allowance
  describe('allowance', () => {
    it("Should fail if sender doesn't have enough tokens", async function () {
      // const { erc20, owner, addr1 } = await loadFixture(
      //   deployTokenFixture
      // );
      await expect(erc20.transfer(addr1.address, 50))
      .to.emit(erc20, 'Transfer')
      .withArgs(owner.address, addr1.address, 50);

    })
  })
  

    //approve

    // 유저간 송금 transferFrom
    describe('transferFrom', () => {
      it('Should assign the account balance of another account with addres', async function () {
        const balanceofOwner = await erc20.balanceOf(owner.address);
      });


    });

  })

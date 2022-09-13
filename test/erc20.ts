// import '@openzeppelin/contracts/token/ERC20';
import '@typechain/hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
// import { ethers } from 'ethers';
import { ethers } from 'hardhat';
import { expect } from 'chai';
import {  ERC20Mock } from '../typechain-types';
// import { TotalSupply } from './class'
import { parseEther } from 'ethers/lib/utils';
import { Address } from 'cluster';

const mintAmount = 5
const tokenAmount = 3

describe('Token contract', () => {
  let erc20: ERC20Mock;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function deployTokenFixture() {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory('ERC20Mock');
    const ERC20 = await Token.deploy('TestToken', 'TEST');
 
    erc20 = await ERC20.deployed();
  });

  describe('mint', () => {
    it('minting should be successful when deployer mint', async () => {
      await erc20.mint(owner.address, parseEther('5.0'));
      await erc20.mint(owner.address, parseEther('8.0'));

      const balance = await erc20.balanceOf(owner.address);
      
      expect(balance).to.equal(parseEther('13.0'))
    })
  })

  // 총 발행량 totalSupply
  describe('totalSupply', () => {
    it('total supply should not be more than the token minted', async function () {
      await erc20.mint(owner.address, 1);
      const ownerBalance = await erc20.balanceOf(owner.address);
      expect(await erc20.totalSupply()).to.equal(ownerBalance);
    });
  });

  // 잔액 balanceOf
  describe('balanceOf', () => {
    it('balance of owner address should same with the amount of token minted', async function () {
      await erc20.mint(owner.address, 1);
      const balanceofOwner = await erc20.balanceOf(owner.address);
      expect(balanceofOwner).to.equal(1)
    });
  });

  // transfer
  describe('transfer', () => {
    it('should fail when transfer to the zero address', async function () {
      const mintTx = await erc20.mint(addr1.address, 3);
      await mintTx.wait();

      expect(erc20.connect(addr1).transfer(ethers.constants.AddressZero, 1))
        .to.be.revertedWith('ERC20: transfer to the zero address');
    });

    it('Transfers should fail if the balance of sender is insufficient', async function () {
      const tokenAmount = 3
      const transferAmount = 4
      const mintTx = await erc20.mint(addr1.address, tokenAmount);
      await mintTx.wait();

      await expect(erc20.connect(addr1).transfer(addr2.address, transferAmount))
        .to.be.revertedWith('ERC20: transfer amount exceeds balance');
    });
  });

  // approve
  describe('approve', () => {
    it('should fail when approve to the zero address', async function () {
      const mintTx = await erc20.mint(addr1.address, mintAmount);
      await mintTx.wait();

      await erc20.connect(addr1).approve(addr2.address, tokenAmount);
    })
  })

  // allowance
  describe('allowance', () => {
    it('function allowance should return value of tokens allowed to spender', async function () {
      const mintTx = await erc20.mint(addr1.address, mintAmount);
      await mintTx.wait();

      await erc20.connect(addr1).approve(addr2.address, tokenAmount)

      expect(await erc20.connect(addr1).allowance(addr1.address, addr2.address))
      .to.equal(tokenAmount)
    });
  });

    // // transferFrom
    // describe('transferFrom', () => {
    //   it('function transfer should return true', async function () {
    //     const mintTx = await erc20.mint(addr1.address, 5);
    //     await mintTx.wait();

    //     // await erc20.connect(addr1).allowance(addr2.address, 4);

    //     // await erc20.connect(addr1).transfer(addr2.address, 1);
    //     expect(await erc20.transferFrom(addr1.address, addr2.address, 4))
    //       .to.equal(true);
    //   });

    //   it('recipient cannot be the zero address', async function () {
    //     const mintTx = await erc20.mint(addr1.address, 5);
    //     await mintTx.wait();
    //   })
    // });
  
  // transferFrom
  describe('transferFrom', () => {
    it('function transferFrom should emit when approved token amount is less than sender have', async function () {
      const mintTx = await erc20.mint(addr1.address, 5);
      await mintTx.wait();

      await erc20.connect(addr1).approve(addr2.address, 4);
      
      await erc20.connect(addr2).transferFrom(addr1.address, addr2.address, 4);
      expect(await erc20.balanceOf(addr2.address)).to.eq(4)

    });

    it('recipient cannot be the zero address', async function () {
      const mintTx = await erc20.mint(addr1.address, 5);
      await mintTx.wait();

      expect(erc20.connect(addr1).transferFrom(addr1.address, ethers.constants.AddressZero, 1))
      .to.be.revertedWith('ERC20: transfer to the zero address');
    })
  });
    

  });

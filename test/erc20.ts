// import '@openzeppelin/contracts/token/ERC20';
import '@typechain/hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
// import { ethers } from 'ethers';
import { ethers } from 'hardhat';
import { expect } from 'chai';
import {  ERC20Mock } from '../typechain-types';
// import { TotalSupply } from './class'
import { parseEther } from 'ethers/lib/utils';

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
      await erc20.mint(owner.address, parseEther('10.0'));
      const ownerBalance = await erc20.balanceOf(owner.address);
      expect(await erc20.totalSupply()).to.equal(ownerBalance);
    });
  });

  // 잔액 balanceOf
  describe('balanceOf', () => {
    it('balance of owner address should same with the amount of token minted', async function () {
      await erc20.mint(owner.address, parseEther('10.0'));
      const balanceofOwner = await erc20.balanceOf(owner.address);
      expect(balanceofOwner).to.lessThan(11)
    });
  });

  // 송금 transfer
  describe('transfer', () => {
    it('Transfers should fail if the balance of sender is insufficient', async function () {
      await erc20.mint(owner.address, parseEther('10.0'));
      
      const balanceofOwner = await erc20.balanceOf(owner.address);
      await expect(erc20.connect(addr1).transfer(owner.address, parseEther('10'))).to.be.revertedWith('Not enough tokens');
      expect(await erc20.balanceOf(owner.address)).to.equal(balanceofOwner)

    });
  });

  //allowance
  describe('allowance', () => {
    it('Allowance should fail if sender does not have enough tokens', async function () {
      await erc20.mint(owner.address, parseEther('10.0'));
      const transaction = await erc20.transfer(owner.address, parseEther('12.0'));
      // const balanceofOwner = await erc20.balanceOf(owner.address); 
      await expect(transaction).to.be.revertedWith('Not enough tokens');

    });
  });
  

    //approve
  describe('approve', () => {
    it('Approve should fail if the total supply of token is different with transaction', async function () {
      await erc20.mint(owner.address, parseEther('10.0'));
      const transaction = await erc20.transfer(owner.address, parseEther('8.0'));
      const totalsupply = await erc20.balanceOf(owner.address)

      
    })
  })

    // 유저간 송금 transferFrom
    describe('transferFrom', () => {
      it('Should assign the account balance of another account with addres', async function () {
        await erc20.mint(owner.address, parseEther('10.0'));
        const transferFrom = await erc20.transferFrom(addr1.address, addr2.address, 10);
        const balanceofOwner = await erc20.balanceOf(owner.address);
      expect(await erc20.balanceOf(addr1.address)).to.equal(11)
      });
    });

  });

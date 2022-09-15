import '@typechain/hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { expect } from 'chai';
import { ERC20Mock } from '../typechain-types';
import { parseEther } from 'ethers/lib/utils';

describe('Token contract', () => {
  const mintAmount = 5;
  const tokenAmount = 3;
  const transferAmount = 2
  let erc20: ERC20Mock;
  let [owner, addr1, addr2, addr3]: SignerWithAddress[] = [];
  
  beforeEach(async function deployTokenFixture() {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const Token = await ethers.getContractFactory('ERC20Mock');
    const ERC20 = await Token.deploy('TestToken', 'TEST');
 
    erc20 = await ERC20.deployed();
  });

  // tests for erc20 functions 
  // mint 
  describe('mint', () => {
    it('minting should be successful when deployer mint', async () => {
      await erc20.mint(owner.address, parseEther('5.0'));
      await erc20.mint(owner.address, parseEther('8.0'));

      const balance = await erc20.balanceOf(owner.address);
      
      expect(balance).to.equal(parseEther('13.0'))
    });

    it('should fail when mint to the zero address', async () => {
      expect(erc20.mint(ethers.constants.AddressZero, mintAmount))
        .to.be.revertedWith('ERC20: mint to the zero address');
    });

    it('function mint should emit transfer event', async () => {
      expect(await erc20.mint(owner.address, mintAmount))
        .to.emit(erc20, 'Transfer').withArgs(owner.address, addr1.address, 1);
    });
  });

  // totalSupply
  describe('totalSupply', () => {
    it('total supply should not be more than the token minted', async () => {
      const mintTx = await erc20.mint(owner.address, mintAmount);
      await mintTx.wait();

      const ownerBalance = await erc20.balanceOf(owner.address);
      expect(await erc20.totalSupply()).to.equal(ownerBalance);
    });
  });

  // balanceOf
  describe('balanceOf', () => {
    it('balance of owner address should same with the amount of token minted', async () => {
      const mintTx = await erc20.mint(owner.address, 1);
      await mintTx.wait();
      
      const balanceofOwner = await erc20.balanceOf(owner.address);
      expect(balanceofOwner).to.equal(1)
    });
  });

  // transfer
  describe('transfer', () => {
    it('should fail when transfer to the zero address', async () => {
      const mintTx = await erc20.mint(addr1.address, 3);
      await mintTx.wait();

      expect(erc20.connect(addr1).transfer(ethers.constants.AddressZero, 1))
        .to.be.revertedWith('ERC20: transfer to the zero address');
    });

    it('Transfers should fail if the balance of sender is insufficient', async () => {
      const tokenAmount = 3
      const transferAmount = 4
      const mintTx = await erc20.mint(addr1.address, tokenAmount);
      await mintTx.wait();

      await expect(erc20.connect(addr1).transfer(addr2.address, transferAmount))
        .to.be.revertedWith('ERC20: transfer amount exceeds balance');
    });

    it('function transfer should emit transfer event', async () => {
      const tokenAmount = 3
      const mintTx = await erc20.mint(addr1.address, tokenAmount);
      await mintTx.wait();

      await expect(erc20.connect(addr1).transfer(addr2.address, transferAmount))
        .to.emit(erc20, 'Transfer').withArgs(addr1.address, addr2.address, transferAmount);
    });
  });

  // approve
  describe('approve', () => {
    it('should fail when approve to the zero address', async () => {
      const mintTx = await erc20.mint(addr1.address, mintAmount);
      await mintTx.wait();

      await erc20.connect(addr1).approve(addr2.address, tokenAmount);
    })
  })

  // allowance
  describe('allowance', () => {
    it('function allowance should return value of tokens allowed to spender', async () =>  {
      const mintTx = await erc20.mint(addr1.address, mintAmount);
      await mintTx.wait();

      await erc20.connect(addr1).approve(addr2.address, tokenAmount)

      expect(await erc20.connect(addr1).allowance(addr1.address, addr2.address))
      .to.equal(tokenAmount)
    });
  });
  
  // transferFrom
  describe('transferFrom', () => {
    it('function transferFrom should emit when approved token amount is less than sender have', async () =>  {
      const mintTx = await erc20.mint(addr1.address, 5);
      await mintTx.wait();

      await erc20.connect(addr1).approve(addr2.address, 4);
      
      await erc20.connect(addr2).transferFrom(addr1.address, addr2.address, 4);
      expect(await erc20.balanceOf(addr2.address)).to.eq(4)

    });

    it('recipient cannot be the zero address', async () => {
      const mintTx = await erc20.mint(addr1.address, 5);
      await mintTx.wait();

      expect(erc20.connect(addr1).transferFrom(addr1.address, ethers.constants.AddressZero, 1))
        .to.be.revertedWith('ERC20: transfer to the zero address');
    });

    it('transfer amount should not exceeds balance', async () => {
      const mintTx = await erc20.mint(addr1.address, mintAmount);
      await mintTx.wait();

      expect(erc20.connect(addr1).transferFrom(addr1.address, addr2.address, 6))
        .to.be.revertedWith('ERC20: transfer amount exceeds balance');
    });

    it('allowance amount should be more than transfer amount', async () => {
      const mintTx = await erc20.mint(addr1.address, mintAmount);
      await mintTx.wait();  

      await erc20.connect(addr1).approve(addr2.address, 3);
      expect(erc20.connect(addr1).transferFrom(addr1.address, addr2.address, 4))
        .to.be.revertedWith('ERC20: insufficient allowance');
    });

    it('function transferFrom should emit transfer event', async () => {
      const mintTx = await erc20.mint(addr1.address, mintAmount);
      await mintTx.wait();

      const approveTx = await erc20.connect(addr1).approve(addr2.address, 3);
      await approveTx.wait();

      expect(await erc20.connect(addr2).transferFrom(addr1.address, addr3.address, 2))
        .to.emit(erc20, 'Transfer').withArgs(addr1.address, addr2.address, 2);
    });
  });

  // tests for erc20 extensions (burnable, pausable, ownable)
  // burnable 
  describe('burnable', () => {
    it('should fail when burn from the zero address', async () => {
      await expect(erc20.burn(ethers.constants.AddressZero, tokenAmount))
        .to.be.revertedWith('ERC20: burn from the zero address');
    });

    it('burn amount cannot exceeds balance', async () => {
      const mintTx = await erc20.mint(addr1.address, mintAmount);
      await mintTx.wait();

      await expect(erc20.connect(addr1).burn(addr1.address, 8))
        .to.be.revertedWith('ERC20: burn amount exceeds balance');
    });

    it('function burn should emit transfer event to the zero address', async () => {
      const mintTx = await erc20.mint(addr1.address, mintAmount);
      await mintTx.wait();

      await expect(erc20.burn(addr1.address, tokenAmount))
        .to.emit(erc20, 'Transfer').withArgs(addr1.address, ethers.constants.AddressZero, tokenAmount);
    });

    it('burn amount cannot exceed allowance amount', async () => {
      const mintTx = await erc20.mint(addr1.address, mintAmount);
      await mintTx.wait();

      await erc20.connect(addr1).approve(addr2.address, 3);

      await expect(erc20.connect(addr2).burnFrom(addr2.address, 7))
        .to.be.revertedWith('ERC20: insufficient allowance')
    });
  });

  // pausable 
  describe('pausable', () => {
    it('token transfer should fail when transfer paused', async () => {
      const mintTx = await erc20.mint(addr1.address, mintAmount);
      await mintTx.wait();

      await erc20.pause();

      await expect(erc20.connect(addr1).transfer(addr2.address, 4))
        .to.be.revertedWith('ERC20Pausable: token transfer while paused');
    });
    
    it('function transfer should emit transfer event when unpaused', async () => {
      const mintTx = await erc20.mint(addr1.address, mintAmount);
      await mintTx.wait();

      await erc20.pause();
      await erc20.unpause();

      await expect(erc20.connect(addr1).transfer(addr2.address, transferAmount))
        .to.emit(erc20, 'Transfer').withArgs(addr1.address, addr2.address, transferAmount);
    });
  });


  // ownable
  describe('ownable', () => {
    it('token owner should same with message sender', async () => {
      await expect(erc20.connect(addr1).mint(owner.address, mintAmount))
        .to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('function owner should return current owner address', async () => {
      expect(await erc20.owner()).to.eq(owner.address)
    });

    it('transfered owner should not be the zero address', async () => {
      const mintTx = await erc20.mint(addr1.address, mintAmount);
      await mintTx.wait();

      await expect(erc20.connect(owner).transferOwnership(ethers.constants.AddressZero))
        .to.be.revertedWith('Ownable: new owner is the zero address')
    });

    it('only owner can be the caller of function pause', async () => {
      await expect(erc20.connect(addr1).pause())
        .to.be.revertedWith('Ownable: caller is not the owner')
    });
  });
});

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';



contract ERC20Mock is ERC20Pausable, Ownable {

  constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {
  }

  function mint(address account, uint256 amount) public {
    _mint(account, amount);
  }

  function burn(address account, uint256 amount) public virtual {
    _burn(account, amount);
  }

  function burnFrom(address account, uint256 amount) public virtual {
      _spendAllowance(account, _msgSender(), amount);
      _burn(account, amount);
    }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal virtual override {
    super._beforeTokenTransfer(from, to, amount);
  }
}
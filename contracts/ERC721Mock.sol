//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';


contract ERC721Mock is ERC721 {

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {
  }

  function mint(address to, uint256 tokenId) public {
    _mint(to , tokenId);
  }
}
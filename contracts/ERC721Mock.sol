//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol';

contract ERC721Mock is ERC721 {

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {
  }

  function mint(address to, uint256 tokenId) public {
    _mint(to , tokenId);
  }
}
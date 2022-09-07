//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import '@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol';

contract ERC721Mock is ERC721PresetMinterPauserAutoId {

  constructor(string memory name, string memory symbol) ERC721PresetMinterPauserAutoId(name, symbol, '') {}
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import './tokenBase.sol';

contract TokenETH is TokenBase {
  constructor() TokenBase('ETH Token', 'ETK') {}
}
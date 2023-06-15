// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import './tokenBase.sol';

contract TokenPOLY is TokenBase {
  constructor() TokenBase('POLY Token', 'PTK') {}
}
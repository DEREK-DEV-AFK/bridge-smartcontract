// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import './bridgeBase.sol';

contract BridgeETH is BridgeBase {
  constructor(address token) BridgeBase(token) {}
}
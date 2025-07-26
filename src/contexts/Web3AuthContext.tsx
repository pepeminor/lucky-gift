import { WEB3AUTH_NETWORK } from "@web3auth/modal";
import { type Web3AuthContextConfig } from "@web3auth/modal/react";

// // mainnet
const clientId =
  "BJ1-HANEzatKPG572CEES2nVJn9jXiNu8wqurhRiaALmD2QlPOqU__xtOBuTOrqQydN3ZBbTRiiXeHepb-A6lVw";

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  },
};

// // // devnet
// const clientId =
//   "BBF90jYyWvLAeRMq-RhykdJsIjqBBP7g1424n55o-BdLgeUN1S2HYO2BC6O-371YjuiW4iR-pWysn9KnCV0v6EA";

// const web3AuthContextConfig: Web3AuthContextConfig = {
//   web3AuthOptions: {
//     clientId,
//     web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
//   },
// };

export default web3AuthContextConfig;

import { WEB3AUTH_NETWORK } from "@web3auth/modal";
import { type Web3AuthContextConfig } from "@web3auth/modal/react";

const clientId =
  "BBF90jYyWvLAeRMq-RhykdJsIjqBBP7g1424n55o-BdLgeUN1S2HYO2BC6O-371YjuiW4iR-pWysn9KnCV0v6EA"; //SAPPHIRE_MAINNET

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  },
};

export default web3AuthContextConfig;

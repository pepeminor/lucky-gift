import { WEB3AUTH_NETWORK } from "@web3auth/modal";
import { type Web3AuthContextConfig } from "@web3auth/modal/react";

const clientId =
  "BJ1-HANEzatKPG572CEES2nVJn9jXiNu8wqurhRiaALmD2QlPOqU__xtOBuTOrqQydN3ZBbTRiiXeHepb-A6lVw";

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  },
};

export default web3AuthContextConfig;

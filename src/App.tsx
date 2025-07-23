import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useAccount, useBalance } from "wagmi";
import "./App.css";

import {
  useWeb3AuthConnect,
  useWeb3AuthDisconnect,
  useWeb3AuthUser,
} from "@web3auth/modal/react";
import { QRScanner } from "./components/BtnScanQR";

function App() {
  const [count, setCount] = useState(0);
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  const { disconnect } = useWeb3AuthDisconnect();
  const { connect } = useWeb3AuthConnect();
  const { userInfo } = useWeb3AuthUser();

  console.log("userInfo", userInfo);
  console.log("address", address);

  return (
    <>
      <div>
        <button onClick={() => connect()} className="btn-login">
          Login
        </button>
        {userInfo && (
          <button onClick={() => disconnect()} className="btn">
            Logout
          </button>
        )}
        <img src="/caishen.png" id="caishen" />

        {userInfo && <div className="btn-qr"><QRScanner /></div>}

        {address && <div className="txt">{address}</div>}
        {/* {balance && <div className="txt">balance: {balance.value}</div>} */}
      </div>
    </>
  );
}

export default App;

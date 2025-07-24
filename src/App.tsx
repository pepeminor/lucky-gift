"use client";
import { useAccount } from "wagmi";
import "./App.css";

import {
  useWeb3AuthConnect,
  useWeb3AuthDisconnect,
  useWeb3AuthUser,
} from "@web3auth/modal/react";
import { QrScanner } from "./components/QRScanner";
import { useState } from "react";

function App() {
  const { address } = useAccount();
  const { disconnect } = useWeb3AuthDisconnect();
  const { connect } = useWeb3AuthConnect();
  const { userInfo } = useWeb3AuthUser();
  const [result, setResult] = useState("");

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

        {userInfo && (
          <div>
            <h1>QR Scanner</h1>
            <QrScanner onResult={(data) => setResult(data)} />
            {result && <p>✅ Scanned: {result}</p>}
          </div>
        )}

        {address && <div className="txt">{address}</div>}
        {/* {balance && <div className="txt">balance: {balance.value}</div>} */}
      </div>
    </>
  );
}

export default App;

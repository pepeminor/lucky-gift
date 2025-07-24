"use client";
import { useAccount } from "wagmi";
import "./App.css";

import {
  useWeb3AuthConnect,
  useWeb3AuthDisconnect,
  useWeb3AuthUser,
} from "@web3auth/modal/react";
import { useState } from "react";
import { QRScanner } from "./components/QRScanner";

function App() {
  const { address } = useAccount();
  const { disconnect } = useWeb3AuthDisconnect();
  const { connect } = useWeb3AuthConnect();
  const { userInfo } = useWeb3AuthUser();
  const [result, setResult] = useState("");

  const [addressScan, setAddressScan] = useState<string | null>(null);

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
            <QRScanner
              onResult={(addr) => {
                alert(`✅ Đã scan được ví: ${addr}`);
                setAddressScan(addr);
              }}
            />
            {addressScan && <p>✅ Scanned: {addressScan}</p>}
          </div>
        )}

        {address && <div className="txt">{address}</div>}
        {/* {balance && <div className="txt">balance: {balance.value}</div>} */}
      </div>
    </>
  );
}

export default App;

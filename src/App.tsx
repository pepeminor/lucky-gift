"use client";
import { useAccount } from "wagmi";
import "./App.css";

import {
  useWeb3AuthConnect,
  useWeb3AuthDisconnect,
  useWeb3AuthUser,
} from "@web3auth/modal/react";
import { useState } from "react";
import { QRScanButton } from "./components/QRScanButton";

function App() {
  const { address } = useAccount();
  const { disconnect } = useWeb3AuthDisconnect();
  const { connect } = useWeb3AuthConnect();
  const { userInfo } = useWeb3AuthUser();

  const [addressScan, setAddressScan] = useState<string | null>(null);

  return (
    <>
      <div>
        <img src="/caishen.png" id="caishen" />

        {userInfo ? (
          <button onClick={() => disconnect()} className="btn-logout">
            Logout
          </button>
        ) : (
          <button onClick={() => connect()} className="btn-login">
            Login
          </button>
        )}

        {userInfo && (
          
            <QRScanButton
              onSuccess={(address) => {
                console.log("Scanned address:", address);
                // Làm gì đó...
                setAddressScan(address);
              }}
              onError={(err) => {
                console.error("Lỗi QR:", err);
              }}
            />

        )}

        {addressScan && (
          <div className="address-scan">
            <h3>Địa chỉ ví đã quét:</h3>
            <div className="txt">{addressScan}</div>
          </div>
        )}

        {address && <div className="txt">{address}</div>}
        {/* {balance && <div className="txt">balance: {balance.value}</div>} */}
      </div>
    </>
  );
}

export default App;

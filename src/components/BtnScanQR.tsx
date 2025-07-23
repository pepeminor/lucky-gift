import { useState } from "react";
import { QrReader } from "react-qr-reader";

export function QRScanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [openCamera, setOpenCamera] = useState(false);

  return (
    <div style={{ padding: "1rem" }}>
      <button
        onClick={() => setOpenCamera(true)}
        style={{
          padding: "0.75rem 1rem",
          background: "#d32f2f",
          color: "#fff",
          borderRadius: "8px",
        }}
      >
        Quét mã QR
      </button>

      {openCamera && (
        <div style={{ marginTop: "1rem" }}>
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(result, error) => {
              if (result) {
                setScanResult(result.getText());
                setOpenCamera(false); // đóng sau khi scan thành công
              }
              if (error) {
                console.error("QR Scan Error:", error);
              }
            }}
            containerStyle={{ width: "100%" }}
          />
        </div>
      )}

      {scanResult && (
        <p style={{ marginTop: "1rem" }}>
          ✅ Kết quả quét: <strong>{scanResult}</strong>
        </p>
      )}
    </div>
  );
}

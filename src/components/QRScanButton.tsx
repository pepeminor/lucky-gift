// QRScanButton.tsx
"use client";

import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScanButtonProps {
  onSuccess: (address: string) => void;
  onError?: (err: unknown) => void;
  buttonText?: string;
}

export const QRScanButton = ({
  onSuccess,
  onError,
  buttonText = "📷 Quét QR",
}: QRScanButtonProps) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [scanning, setScanning] = useState(false);

  const isMobile = () => {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const requestCamera = async () => {
    try {
      if (!isMobile()) {
        alert("Tính năng quét QR chỉ hỗ trợ trên thiết bị di động");
        return;
      }

      const regionId = "qr-button-region";
      const html5QrCode = new Html5Qrcode(regionId);
      scannerRef.current = html5QrCode;
      setScanning(true);

      const cameras = await Html5Qrcode.getCameras();
      const backCamera =
        cameras.find((cam) => /back|rear|environment/i.test(cam.label)) ||
        cameras[0];

      if (!backCamera) throw new Error("No back camera found");

      await html5QrCode.start(
        { deviceId: { exact: backCamera.id } },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          onSuccess(decodedText);
          stopScanner();
        },
        (errorMsg) => {
          // log scan fail but don't trigger callback
          console.warn("Scan fail:", errorMsg);
        }
      );
    } catch (err) {
      stopScanner();
      onError?.(err);
      alert("❌ Không thể mở camera. Vui lòng kiểm tra quyền truy cập.");
    }
  };

  const stopScanner = async () => {
    try {
      const scanner = scannerRef.current;
      if (scanner?.isScanning) {
        await scanner.stop();
        await scanner.clear();
      }
    } catch (e) {
      console.warn("Stop failed", e);
    } finally {
      scannerRef.current = null;
      setScanning(false);
    }
  };

  return (
    <div>
      <button
        className="btn-qr"
        onClick={() => {
          if (!scanning) requestCamera();
        }}
      >
        {buttonText}
      </button>

      {!scanning && (
        <div className="qr-overlay">
          <div
            id="qr-button-region"
            style={{ width: 300, margin: "1rem auto" }}
          />
        </div>
      )}
    </div>
  );
};

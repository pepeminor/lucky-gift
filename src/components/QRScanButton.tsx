"use client";

import { useRef, useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScanButtonProps {
  onSuccess: (address: string) => void;
  onError?: (err: unknown) => void;
  buttonText?: string;
}

export const QRScanButton = ({
  onSuccess,
  onError,
  buttonText = "📷 Scan QR",
}: QRScanButtonProps) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [scanning, setScanning] = useState(false);

  const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const startScanner = async () => {
    try {
      const regionId = "qr-button-region";
      const html5QrCode = new Html5Qrcode(regionId);
      scannerRef.current = html5QrCode;

      const cameras = await Html5Qrcode.getCameras();
      const backCamera =
        cameras.find((cam) => /back|rear|environment/i.test(cam.label)) ||
        cameras[0];

      if (!backCamera) throw new Error("Không tìm thấy camera sau");

      await html5QrCode.start(
        { deviceId: { exact: backCamera.id } },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          onSuccess(decodedText);
          stopScanner();
        },
        (errorMsg) => {
          console.warn("Scan fail:", errorMsg);
        }
      );
    } catch (err) {
      await stopScanner();
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

  const handleClick = async () => {
    if (!isMobile()) {
      alert("⚠️ Tính năng quét QR chỉ hỗ trợ trên thiết bị di động");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      alert("❌ Không có quyền mở camera.");
      return;
    }

    setScanning(true);
  };

  useEffect(() => {
    if (scanning) {
      const timeout = setTimeout(() => {
        startScanner();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [scanning]);

  return (
    <div>
      <div className="btn-qr" onClick={handleClick}>
        {buttonText}
      </div>

      {scanning && (
        <div className="qr-overlay">
          <button onClick={stopScanner}>✕ Close</button>
          <div
            id="qr-button-region"
            style={{ width: 300, margin: "1rem auto" }}
          />
        </div>
      )}
    </div>
  );
};

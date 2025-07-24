// src/components/QrScanner.tsx

import { useEffect } from "react"
import {
  Html5QrcodeScanner,
  Html5QrcodeScanType,
} from "html5-qrcode"

type Props = {
  onResult: (result: string) => void
}

export const QrScanner = ({ onResult }: Props) => {
  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      showTorchButtonIfSupported: true,
      showZoomSliderIfSupported: true,
    }

    const scanner = new Html5QrcodeScanner("qr-reader", config, /* verbose */ false)

    scanner.render(
      (decodedText) => {
        console.log("✅ QR Code scanned:", decodedText)
        onResult(decodedText)
        scanner.clear() // auto-stop after 1 successful scan
      },
      (error) => {
        // 👇 comment this out if it's too spammy
        console.warn("QR Scan error:", error)
      }
    )

    return () => {
      scanner.clear().catch((err) => console.error("Clear scanner error", err))
    }
  }, [onResult])

  return <div id="qr-reader" style={{ width: "100%", maxWidth: 400, margin: "0 auto" }} />
}

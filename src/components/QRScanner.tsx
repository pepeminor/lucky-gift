import { useEffect } from "react"
import { Html5Qrcode } from "html5-qrcode"

type Props = {
  onResult: (address: string) => void
}

export const QRScanner = ({ onResult }: Props) => {
  useEffect(() => {
    const qrRegionId = "simple-qr-reader"
    const html5QrCode = new Html5Qrcode(qrRegionId)

    const start = async () => {
      try {
        const cameras = await Html5Qrcode.getCameras()
        const backCamera = cameras.find((cam) =>
          /back|rear|environment/i.test(cam.label)
        ) || cameras[0] // fallback to first if no back cam label

        if (!backCamera) throw new Error("No camera found")

        await html5QrCode.start(
          { deviceId: { exact: backCamera.id } },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            if (/^0x[a-fA-F0-9]{40}$/.test(decodedText)) {
              onResult(decodedText)
            } else {
              alert("❌ Mã không hợp lệ. Vui lòng thử lại.")
            }
            html5QrCode.stop().then(() => {
              html5QrCode.clear()
            })
          },
          (err) => {
            // Quietly ignore scan errors
            console.warn(err)
          }
        )
      } catch (err) {
        alert("Không thể mở camera hoặc không có thiết bị phù hợp.")
        console.error(err)
      }
    }

    start()

    return () => {
      html5QrCode.stop().catch(() => {})
    }
  }, [onResult])

  return (
    <div
      id="simple-qr-reader"
      style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}
    />
  )
}

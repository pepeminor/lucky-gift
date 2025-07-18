import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault() // chặn trình duyệt tự hiển thị
      setDeferredPrompt(e)
      setShowInstallPrompt(true) // bạn có thể hiện nút "Cài app" ở đây
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    ;(deferredPrompt as any).prompt()
    const { outcome } = await (deferredPrompt as any).userChoice
    console.log('User response to install prompt:', outcome)
    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }


  return (
    <>
      <div>
        <h1>LuckyGift</h1>
        <button onClick={handleInstallClick}>🎁 Cài LuckyGift vào màn hình</button>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

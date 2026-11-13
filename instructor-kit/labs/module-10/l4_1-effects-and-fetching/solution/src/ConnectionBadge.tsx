import { useEffect, useState } from 'react'

// Task 1: the browser's online/offline events are outside React: an effect with a cleanup
export function ConnectionBadge() {
  const [online, setOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  return <p role="status">Connection: {online ? 'Online' : 'Offline'}</p>
}

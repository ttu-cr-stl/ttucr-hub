'use client'

import { useState, useEffect } from 'react'
import { detectOS, isPWA } from '@/lib/utils'

export const useAddToHomeScreen = () => {
  const [isInstallable, setIsInstallable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    const os = detectOS()
    setIsIOS(os === 'iOS')

    if (isPWA()) {
      setIsInstallable(false)
      return
    }

    if (os === 'iOS') {
      setIsInstallable(true)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleAddToHomeScreen = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setDeferredPrompt(null)
        setIsInstallable(false)
      }
    } else if (isIOS) {
      // Show an alert with instructions for iOS users
      alert(
        'To add this app to your home screen:\n\n' +
        '1. Tap the Share button in your browser.\n' +
        '2. Scroll down and tap "Add to Home Screen".\n' +
        '3. Tap "Add" to confirm.'
      )
    }
  }

  return { isInstallable, handleAddToHomeScreen }
}
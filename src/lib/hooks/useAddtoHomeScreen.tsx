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
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Install TTU@CR Hub',
            text: 'Install our app to your home screen for easy access!',
            url: window.location.href,
          })
        } catch (error) {
          console.error('Error sharing:', error)
        }
      } else {
        alert('To add this app to your home screen, tap the share button in your browser and then "Add to Home Screen".')
      }
    }
  }

  return { isInstallable, handleAddToHomeScreen }
}
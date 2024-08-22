"use client";

import { useEffect } from 'react';

const OrientationLock = () => {
  useEffect(() => {
    const lockOrientation = () => {
      if (typeof screen.orientation !== 'undefined' && 'lock' in screen.orientation) {
        (screen.orientation as any).lock('portrait').catch(() => {
          console.log('Orientation lock failed');
        });
      }
    };

    lockOrientation();
    window.addEventListener('orientationchange', lockOrientation);

    return () => {
      window.removeEventListener('orientationchange', lockOrientation);
    };
  }, []);

  return null;
};

export default OrientationLock;

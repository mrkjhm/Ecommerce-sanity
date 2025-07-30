// src/components/LenisProvider.tsx
'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'  // or wherever you import it from

type LenisProviderProps = { children: ReactNode }

export default function LenisProvider({ children }: LenisProviderProps) {
    useEffect(() => {
        const lenis = new Lenis()
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        return () => {
            // optional: cancel frame or cleanup if Lenis needs it
        }
    }, [])

    return <>{children}</>
}

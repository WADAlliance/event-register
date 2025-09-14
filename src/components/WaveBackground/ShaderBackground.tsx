'use client'

import dynamic from 'next/dynamic'

export const ShaderBackground = dynamic(
  () => import('@/components/WaveBackground/ShaderBackgroundInner').then(mod => mod.ShaderBackgroundInner),
  { ssr: false } // important: disables server-side rendering
)

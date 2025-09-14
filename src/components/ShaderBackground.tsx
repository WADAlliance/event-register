'use client'

import dynamic from 'next/dynamic'

export const ShaderBackground = dynamic(
  () => import('@/components/ShaderBackgroundInner').then(mod => mod.ShaderBackgroundInner),
  { ssr: false } // important: disables server-side rendering
)

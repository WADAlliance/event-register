'use client'

import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { WaveMaterial, WaveMaterialRef } from './WaveMaterial'

const ShaderPlane = () => {
  const ref = useRef<WaveMaterialRef>(null)
  const { viewport, size } = useThree()

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.uniforms.time.value += delta
    // smooth pointer update
    ref.current.uniforms.pointer.value.lerp(state.pointer, 0.08)
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <waveMaterial
        ref={ref}
        key={WaveMaterial.key}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
      />
    </mesh>
  )
}

export const ShaderBackgroundInner = () => {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    >
      <ShaderPlane />
    </Canvas>
  )
}

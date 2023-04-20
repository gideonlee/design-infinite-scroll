/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Environment} from '@react-three/drei'

// Background Environment
function EnvironmentBlur() {
  const preset = 'sunset'
  const blur = 0.65
  
  return (
    <Environment preset={preset} background blur={blur}/>
  )
}

export {EnvironmentBlur}
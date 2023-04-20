/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Canvas} from '@react-three/fiber'
// import {AccumulativeShadows, RandomizedLight, OrbitControls} from '@react-three/drei'
import * as mq from 'utils/media-queries'
import {Pages} from 'objects/lib'
import {EnvironmentBlur} from 'utils/lib'
import { ScrollControls, Scroll } from 'components/scroll'
import { Preload } from '@react-three/drei'

// https://codesandbox.io/s/x8gvs?file=/src/ScrollControls.tsx

function DashboardScreen() {
  return (
    <div
      css={{
        height: '100vh',
        width: '100%',
        [mq.extraSmall]: {
          minHeight: '400px'
        },
      }}
    >
      <React.Suspense fallback={null}>
        <Canvas 
          shadows
          gl={{ antialias: false }}
          dpr={[1, 1.5]}
        >
          <ScrollControls 
            infinite 
            horizontal 
            damping={4} 
            pages={4} 
            distance={1}
          >
            <Scroll>
              <Pages/>
            </Scroll>
          </ScrollControls>
          <EnvironmentBlur/>
          <Preload/>
        </Canvas>
      </React.Suspense>
    </div>
  )
}

export {DashboardScreen}

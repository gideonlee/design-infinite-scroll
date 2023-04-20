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
          // camera={{position: [3, 3, 3]}}
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
          {/* <div style={{ overflowX: 'none',}}>
            <h1 style={{ position: 'absolute', top: '20vh', left: '-75vw' }}>home</h1>
            <h1 style={{ position: 'absolute', top: '20vh', left: '25vw' }}>to</h1>
            <h1 style={{ position: 'absolute', top: '20vh', left: '125vw' }}>be</h1>
            <h1 style={{ position: 'absolute', top: '20vh', left: '225vw' }}>home</h1>
            <h1 style={{ position: 'absolute', top: '20vh', left: '325vw' }}>to</h1>
            <h1 style={{ position: 'absolute', top: '20vh', left: '425vw' }}>be</h1>
          </div> */}
      </React.Suspense>
    </div>
  )
}

export {DashboardScreen}

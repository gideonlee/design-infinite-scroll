/** @jsxImportSource @emotion/react */
import * as React from 'react'
import * as THREE from 'three'
import {useFrame, useLoader, useThree} from '@react-three/fiber'
import {useControls} from 'leva'
import {Center, Image as ImageDrei} from '@react-three/drei'
import {TextureLoader} from 'three/src/loaders/TextureLoader'
import { useScroll } from 'components/scroll'
import llama from 'assets/llama.png'
import img1 from 'assets/images/img3.jpg'
import img2 from 'assets/images/img18.jpg'
import img3 from 'assets/images/img4.jpg'
import img4 from 'assets/images/img14.jpg'
import img5 from 'assets/images/img6.jpg'
import img6 from 'assets/images/img20.jpg'
import img7 from 'assets/images/img17.jpg'
import img8 from 'assets/images/img18.jpg'
import img9 from 'assets/images/img12.jpg'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = React.useRef()

  // Hold state for hovered and clicked events
  const [isHovered, setIsHovered] = React.useState(false)
  const [isClicked, setIsClicked] = React.useState(false)

  // Subscribe this component to the render-loop, rotate the mesh every frame (requestAnimationFrame)
  useFrame((state, delta) => (ref.current.rotation.y += delta/4))

  // Load texture
  const colorMap = useLoader(TextureLoader, llama)

  // Custom Shader
  const material = React.useMemo(() => ({
    uniforms: {
      time: {value: 1.0},
      colorMap: {value: colorMap},
      isHovered: {value: isHovered}
    },
    vertexShader: `
      varying vec2 vUv; 
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D colorMap;
      varying vec2 vUv; 
      uniform bool isHovered;

      
      void main() {
        vec4 texture = texture2D(colorMap, vUv);
        float bw = (texture.r + texture.b + texture.g)/4.0;

        vec4 bwTexture = vec4(bw, bw, bw, 1.0);

        if (isHovered) {
          gl_FragColor = mix(bwTexture, texture, 0.5);
        } else {
          gl_FragColor = texture;
        }
      }
    `
  }), [isHovered, colorMap])

  // Regular Threejs elements expressed in JSX
  return (
    <mesh
      top
      {...props}
      castShadow
      ref={ref}
      scale={isClicked ? 1.5 : 1}
      onClick={(event) => setIsClicked(!isClicked)}
      onPointerOver={(event) => setIsHovered(true)}
      onPointerOut={(event) => setIsHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <shaderMaterial 
        attach='material' 
        args={[material]}
      />
    </mesh>
  )
}

function Sphere() {
  
  const {roughness} = useControls({
    roughness: {value: 0.3, min: 0, max: 1}
  })
  return (
    <Center top>
      <mesh castShadow>
        <sphereGeometry args={[0.75, 64, 64]} />
        <meshStandardMaterial 
          metalness={1} 
          roughness={roughness} 
        />
      </mesh>
    </Center>
  )
}

function Image(props) {
  const ref = React.useRef()
  const group = React.useRef()
  const data = useScroll()
  useFrame((state, delta) => {
    group.current.position.z = THREE.MathUtils.damp(
      group.current.position.z, 
      Math.max(0, data.delta * 50),
      4,
      delta
    )

    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      Math.max(0, 1 - data.delta * 1000),
      4,
      delta
    )
  })

  return (
    <group ref={group}>
      <ImageDrei ref={ref} {...props}/>
    </group> 
  )
}

function Page({m = 0.4, urls, ...props}) {
  const {width} = useThree(state => state.viewport)
  const widthCoefficient = width < 10 ? 1.5 / 3 : 1 / 3

  return (
    <group {...props}>
      <Image 
        position={[-width * widthCoefficient, 0, -1]}
        scale={[width * widthCoefficient - m * 2, 5, 1]}
        url={urls[0]} 
      />
      <Image 
        position={[0, 0, 0]}
        scale={[width * widthCoefficient - m * 2, 5, 1]}
        url={urls[1]} 
      />
      <Image 
        position={[width * widthCoefficient, 0, 1]}
        scale={[width * widthCoefficient - m * 2, 5, 1]}
        url={urls[2]} 
      />
    </group>
  )
}

function Pages() {
  const {width} = useThree(state => state.viewport)
  
  return (
    <>
      <Page position={[-width * 1, 0, 0]} urls={[img1, img2, img3]} />
      <Page position={[width * 0, 0, 0]} urls={[img4, img5, img6]} />
      <Page position={[width * 1, 0, 0]} urls={[img7, img8, img9]} />
      <Page position={[width * 2, 0, 0]} urls={[img1, img2, img3]} />
      <Page position={[width * 3, 0, 0]} urls={[img4, img5, img6]}  />
      <Page position={[width * 4, 0, 0]} urls={[img7, img8, img9]} />
    </>
  )
}


export {Box, Sphere, Pages}
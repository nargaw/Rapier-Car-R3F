import './style.css'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'


const root = createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <KeyboardControls
        map={[
            {name: 'forward', keys: ['ArrowUp', 'KeyW']},
            {name: 'backward', keys: ['ArrowDown', 'KeyS']},
            {name: 'left', keys: ['ArrowLeft', 'KeyA']},
            {name: 'right', keys: ['ArrowRight', 'KeyD']},
            {name: 'jump', keys: ['Space']}
        ]}
        >   
        <Canvas
            shadows
            camera={{
                fov: 50,
                near: 0.1,
                far: 250,
                position: [0, 5, 25]
            }}
        >
            <Experience />
        </Canvas>
        </KeyboardControls>
        
    </StrictMode>
)
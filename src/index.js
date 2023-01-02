import './style.css'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'


const root = createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <Canvas
            shadows
            camera={{
                fov: 50,
                near: 0.1,
                far: 250,
                position: [0, 5, 5]
            }}
        >
            <Experience />
        </Canvas>
    </StrictMode>
)
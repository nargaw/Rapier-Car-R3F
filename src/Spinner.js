import { useKeyboardControls } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import { useFrame } from "@react-three/fiber"
import { useRef, useState} from "react"

export default function Spinner()
{


    const anchor = useRef()
    const spinner = useRef()

    const [ subscribeKeys, getKeys ] = useKeyboardControls()

    useFrame((state, delta) =>
    {
        const { forward, backward, left, right } = getKeys()
        if(forward)
        {
            console.log('forward')
        } 
    })

    return <>
        <RigidBody 
            ref={spinner}
            position={[0, 10, 0]}
            type="dynamic"
            restitution={0.8}
            friction={0.4}
        >
            <mesh>
                <boxGeometry args={[8, 0.5, 0.5]} />
                <meshBasicMaterial color="orange" />
            </mesh>
        </RigidBody>
    </>
}
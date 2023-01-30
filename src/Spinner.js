import { useKeyboardControls } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import { useFrame } from "@react-three/fiber"
import { useRef, useState} from "react"
import { Quaternion, Euler } from "three"

export default function Spinner()
{


    const anchor = useRef()
    const spinner = useRef()

    const [ subscribeKeys, getKeys ] = useKeyboardControls()

    let speed = 0.1
    useFrame((state, delta) =>
    {
        const time = state.clock.getElapsedTime()
        const rotation = new Quaternion()
        const { forward, backward, left, right } = getKeys()
        if(forward)
        {
            console.log('forward')
            speed += speed < 15 ? 0.1 : 0
            // speed = speed > 15 ? 15 
            console.log(speed)
        }
        if(!forward)
        {
            speed -= speed > 0 ? 0.01 : 0
            console.log(speed)
            // rotation.setFromEuler(new Euler(time * speed, 0 , 0))
        }
        
        
        rotation.setFromEuler(new Euler(time * speed, 0 , 0))
        spinner.current.setNextKinematicRotation(rotation)
    })

    return <>
        <RigidBody 
            ref={spinner}
            position={[0, 10, 0]}
            type="kinematicPosition"
            restitution={0.8}
            friction={0.4}
            colliders="ball"
        >
            <mesh>
                {/* <boxGeometry args={[8, 0.5, 0.5]} /> */}
                <sphereGeometry args={[5, 32, 32]}/>
                <meshBasicMaterial color="orange" />
            </mesh>
        </RigidBody>
    </>
}
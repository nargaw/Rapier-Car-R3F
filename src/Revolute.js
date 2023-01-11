import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useRevoluteJoint, RigidBody, useRapier } from "@react-three/rapier"
import { useKeyboardControls } from "@react-three/drei"
import * as THREE from "three"

export default function Revolute()
{

    const { rapier, world } = useRapier()
    const rapierWorld = world.raw()

    const [ subscribeKeys, getKeys ] = useKeyboardControls()

    const body1 = useRef()
    const body2 = useRef()
    const body3 = useRef()
    const body4 = useRef()
    const body5 = useRef()

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)

    const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(10, 10, 10))
    const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3())
    
    useRevoluteJoint(
        body1,
        body2,
        [
            [0, 0, 0],
            [3, -1, -2],
            [2, 0, 0],
        ], 
    )

    useRevoluteJoint(
        body3,
        body2,
        [
            [0, 0, 0],
            [-3, -1, 3],
            [2, 0, 0],
        ]
    )

    useRevoluteJoint(
        body4,
        body2,
        [
            [0, 0, 0],
            [-3, -1, -2],
            [2, 0, 0],
        ]
    )

    useRevoluteJoint(
        body5,
        body2,
        [
            [0, 0, 0],
            [3, -1, 3],
            [2, 0, 0],
        ]
    )

    useFrame((state, delta) => 
    {
        const bodyPosition = body2.current.translation()
        // console.log(bodyPosition)
        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.z += 25.25
        cameraPosition.y += 13.65

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.25

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)

        //controls
        const { forward, backward, left, right} = getKeys()
        const impulse = { x:0, y: 0, z:0}
        const torque = {x:0, y:0, z:0}

        const impulseStrength = 10 * delta
        const torqueStrength = 10 * delta

        if(forward)
        {
            // impulse.z -= impulseStrength
            torque.x -= torqueStrength
            console.log('forward')
        }

        if(backward)
        {
            // impulse.z += impulseStrength
            torque.x += torqueStrength
            console.log('backward')
        }

        if(left)
        {
            // impulse.x -= impulseStrength
            torque.x += torqueStrength
            console.log('left')
        }

        if(right)
        {
            // impulse.x += impulseStrength
            torque.x -= torqueStrength
            console.log('right')
        }

        body1.current.applyImpulse(impulse)
        body1.current.applyTorqueImpulse(torque)

        body3.current.applyImpulse(impulse)
        body3.current.applyTorqueImpulse(torque)

        body4.current.applyImpulse(impulse)
        body4.current.applyTorqueImpulse(torque)

        body5.current.applyImpulse(impulse)
        body5.current.applyTorqueImpulse(torque)
    })

    const push = () => 
    {
        body1.current.addTorque({x: 0, y: 0, z: 2}, true)
        body3.current.addTorque({x: 0, y: 0, z: 2}, true)
        console.log('clicked')
    }

    return <>       
        <RigidBody
            ref={body1}
            position={[0, 6, 0]}
            // gravityScale={0.25}
            friction={1}
            restitution={0.2}
            type="kinematic"
            colliders="ball"
        >
            <mesh
                geometry={sphereGeometry}
                castShadow
            >
                <meshStandardMaterial color={0xffff00} />
            </mesh>
        </RigidBody>

        <RigidBody
            ref={body2}
            position={[0, 6, 0]}
            // gravityScale={0.25}
            friction={0.4}
            restitution={0.8}
            // angularDamping={0.1}
            type="kinematic"
        >
            <mesh onClick={push} castShadow>
                <boxGeometry args={[3, 2, 6]}/>
                <meshStandardMaterial color={0x00ff00} />
            </mesh>
        </RigidBody>

        <RigidBody
            ref={body3}
            position={[0, 6, 0]}
            // gravityScale={0.25}
            friction={1}
            restitution={0.2}
            type="kinematic"
            colliders="ball"
        >
            <mesh
                geometry={sphereGeometry}
                castShadow
            >
                <meshStandardMaterial color={0x00ffff} />
            </mesh>
        </RigidBody>

        <RigidBody
            ref={body4}
            position={[0, 6, 0]}
            // gravityScale={0.25}
            friction={1}
            restitution={0.2}
            type="kinematic"
            colliders="ball"
        >
            <mesh
                geometry={sphereGeometry}
                castShadow
            >
                <meshStandardMaterial color={0xffff00} />
            </mesh>
        </RigidBody>

        <RigidBody
            ref={body5}
            position={[0, 6, 0]}
            // gravityScale={0.25}
            friction={1}
            restitution={0.2}
            type="kinematic"
            colliders="ball"
        >
            <mesh
                geometry={sphereGeometry}
                castShadow
            >
                <meshStandardMaterial color={0x00ffff} />
            </mesh>
        </RigidBody>
    </>
}
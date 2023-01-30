import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useRevoluteJoint, RigidBody, useRapier, useFixedJoint, useSphericalJoint, usePrismaticJoint } from "@react-three/rapier"
import { useKeyboardControls } from "@react-three/drei"
import * as THREE from "three"

export default function Revolute()
{

    const { rapier, world } = useRapier()
    const rapierWorld = world.raw()

    const [ subscribeKeys, getKeys ] = useKeyboardControls()

    const frontLeft = useRef()
    const anchorfl = useRef()
    const frontRight = useRef()
    const anchorfr = useRef()
    const backLeft = useRef()
    const anchorbl = useRef()
    const backRight = useRef()
    const anchorbr = useRef()
    const body = useRef()

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)

    const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(10, 10, 10))
    const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3())
    
    // useRevoluteJoint(
    //     frontLeft,
    //     anchorfl,
    //     [
    //         [0, 0, 0],
    //         [0, 0, 0],
    //         [1, 0, 0],
    //     ], 
    // )

    useSphericalJoint(
        anchorfl, 
        frontLeft,
        [
        [0, 0, 0],
        [0, 0, 0]
    ]);

    // usePrismaticJoint(
    //     frontLeft,
    //     anchorfl,
    //     [
    //         [0, 0, 0], // Position of the joint in bodyA's local space    
    //         [-3, 10, 0], // Position of the joint in bodyB's local space
    //         [1, 0, 0], // Axis of the joint, expressed in the local-space of the rigid-bodies it is attached to.
    //     ]
    // )

    // useRevoluteJoint(
    //     anchorfr,
    //     frontRight,
    //     [
    //         [3, 0, -2],
    //         [0, 0, 0],
    //         [1, 0, 0],
    //     ]
    // )

    // useRevoluteJoint(
    //     anchorbl,
    //     backLeft,
    //     [
    //         [-3, 0, 2],
    //         [0, 0, 0],
    //         [1, 0, 0],
    //     ]
    // )

    // useRevoluteJoint(
    //     anchorbr,
    //     backRight,
    //     [
    //         [3, 0, 2],
    //         [0, 0, 0],
    //         [1, 0, 0],
    //     ]
    // )

    const jointfl = useFixedJoint(
        body,
        anchorfl,
        [
            [-3, -1, -2], // Position of the joint in bodyA's local space
            [0, 0, 0, 1], // Orientation of the joint in bodyA's local space
            [0, 0, 0], // Position of the joint in bodyB's local space
            [0, 2, 0, 1], // Orientation of the joint in bodyB's local space
        ]
    )
    // console.log(jointfl)

    // useFixedJoint(
    //     anchorfr,
    //     body,
    //     [
    //         [0, 0, 0],
    //         [0, 0, 0, 1],
    //         [3, 0, -2],
    //         [0, 0, 0, 1],
    //     ]
    // )

    // useFixedJoint(
    //     anchorbl,
    //     body,
    //     [
    //         [0, 0, 0],
    //         [0, 0, 0, 1],
    //         [-3, 0, 2],
    //         [0, 0, 0, 1],
    //     ]
    // )

    // useFixedJoint(
    //     anchorbr,
    //     body,
    //     [
    //         [0, 0, 0],
    //         [0, 0, 0, 1],
    //         [3, 0, 2],
    //         [0, 0, 0, 1],
    //     ]
    // )



    useFrame((state, delta) => 
    {
        const bodyPosition = body.current.translation()
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

        // state.camera.position.copy(smoothedCameraPosition)
        // state.camera.lookAt(smoothedCameraTarget)

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

        // body1.current.applyImpulse(impulse)
        // body1.current.applyTorqueImpulse(torque)

        // body3.current.applyImpulse(impulse)
        // body3.current.applyTorqueImpulse(torque)

        // body4.current.applyImpulse(impulse)
        // body4.current.applyTorqueImpulse(torque)

        // body5.current.applyImpulse(impulse)
        // body5.current.applyTorqueImpulse(torque)

        // body2.current.applyImpulse(impulse)
        // body2.current.applyTorqueImpulse(torque)
    })

    return <>

        <RigidBody
            ref={body}
            position={[0, 10, 0]}
            // gravityScale={0.25}
            friction={0.4}
            restitution={0.8}
            // angularDamping={0.1}
            // type="fixed"
        >
            <mesh castShadow>
                <boxGeometry args={[3, 2, 6]}/>
                <meshStandardMaterial color={0x00ff00} />
            </mesh>
        </RigidBody>

        <group>
            <RigidBody 
                ref={anchorfl} 
                friction={0.01} 
                restitution={1}   
                position={[0, 3, 0]} 
                // type="kinematic"
            />
            <RigidBody
                ref={frontLeft}
                // position={[-3, 10, -2]}
                // gravityScale={0.25}
                friction={1}
                restitution={0.2}
                // type="kinematic"
                colliders="ball"
            >
                <mesh
                    geometry={sphereGeometry}
                    castShadow
                >
                    <meshStandardMaterial color={0xffff00} />
                </mesh>
            </RigidBody>  
        </group>
        

        {/* <RigidBody ref={anchorfr} friction={0.01} restitution={1}/>
        <RigidBody
            ref={frontRight}
            // position={[0, 0, 0]}
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

        <RigidBody ref={anchorbl} friction={0.01} restitution={1}/>
        <RigidBody
            ref={backLeft}
            // position={[0, 0, 0]}
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

        <RigidBody ref={anchorbr} friction={0.01} restitution={1}/>
        <RigidBody
            ref={backRight}
            // position={[0, 0, 0]}
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
        </RigidBody> */}
    </>
}
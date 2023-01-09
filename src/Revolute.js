import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useRevoluteJoint, RigidBody, useRapier } from "@react-three/rapier"
import { Quaternion, SphereGeometry } from "three"

export default function Revolute()
{

    const { rapier, world } = useRapier()
    const rapierWorld = world.raw()

    const body1 = useRef()
    const body2 = useRef()
    const body3 = useRef()

    const sphereGeometry = new SphereGeometry(1, 32, 32)
    
    useRevoluteJoint(
        body1,
        body2,
        [
            [0, 0, 0],
            [2, 0, 0],
            [2, 0, 0],
        ]
    )

    useRevoluteJoint(
        body3,
        body2,
        [
            [0, 0, 0],
            [-2, 0, 0],
            [2, 0, 0],
        ]
    )

    useFrame((state, delta) => 
    {
        const elapsedTime = state.clock.elapsedTime
        body1.current.setNextKinematicRotation(new Quaternion(0, Math.sin(elapsedTime) * 6, 0))
        body3.current.setNextKinematicRotation(new Quaternion(0, Math.sin(elapsedTime) * 6, 0))
    })

    return <>       
        <RigidBody
            ref={body1}
            position={[0, 6, 0]}
            // gravityScale={0.25}
            friction={0.1}
            restitution={0.8}
            type="kinematic"
            colliders="ball"
        >
            <mesh
                geometry={sphereGeometry}
            >
                <meshBasicMaterial color={0xffff00} />
            </mesh>
        </RigidBody>

        <RigidBody
            ref={body2}
            position={[0, 6, 0]}
            // gravityScale={0.25}
            friction={0.4}
            restitution={0.8}
            type="dynamic"
        >
            <mesh>
                <boxGeometry args={[1, 1, 1]}/>
                <meshBasicMaterial color={0x00ff00} />
            </mesh>
        </RigidBody>

        <RigidBody
            ref={body3}
            position={[0, 6, 0]}
            // gravityScale={0.25}
            friction={0.1}
            restitution={0.8}
            type="kinematic"
            colliders="ball"
        >
            <mesh
                geometry={sphereGeometry}
            >
                <meshBasicMaterial color={0x00ffff} />
            </mesh>
        </RigidBody>
    </>
}
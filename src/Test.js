import { useFrame } from "@react-three/fiber";
import { RigidBody, useImpulseJoint, useRapier, useRevoluteJoint, useSphericalJoint, MeshCollider } from "@react-three/rapier";
import { Box, Sphere } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Quaternion } from "three";

export default function Test()
{

    const { rapier, world } = useRapier()
    const rapierWorld = world.raw()
    console.log(rapierWorld)

    const body1 = useRef()
    const body2 = useRef()
    const body3 = useRef()
    const body4 = useRef()

    const JointedThing = () => {
        const joint = useRevoluteJoint(
            body1,
            body2,
            [
                [0, 0, 0],
                [0, 2, 0],
                [0, 2, 0],
            ]
        )

        const joint2 = useSphericalJoint(
            body2,
            body3,
            [
                [0, 0, 0],
                [0, 3, 0],
            ]
        )

        const joint3 = useSphericalJoint(
            body2,
            body4,
            [
                [0, 0, 0],
                [0, 3, 0],
            ]
        )

        // useEffect(() => {
        //     joint.configureMotorVelocity(1, 0)
        //     joint.raw().setContactsEnabled(false)
        // }, []);
    }



    // useFrame((state, delta) => 
    // {
    //     const impulse = {x:0, y:0, z:0}
    //     const impulseStrength = 1 * delta

    //     const now = performance.now()
    //     body1.current.setNextKinematicRotation(new Quaternion(0, Math.sin(now/800) * 6, 0))
        
    //     // body1.current.setNextKinematicPosition([0, 1, 0])
    // })

    

    const HangingThing = (props) => {
        /**
         * Joints can be created between two RigidBodies
         */
        const anchor = useRef(null);
        const box = useRef(null);
      
        useSphericalJoint(anchor, box, [
          [0, 0, 0],
          [0, 4, 0]
        ]);

        const applyForce = () => {
            console.log('clicked')
            box.current.applyImpulse({x: -5, y: 0, z: 0})
        }
      
        return (
          <group {...props}>
            {/**
             * We can use an empty RigidBody is created to act
             * as a non-moving anchor
             */}
            <RigidBody ref={anchor} friction={0.01} restitution={1}/>
            <RigidBody ref={box} position={[0, 0, 0]} friction={0.01} restitution={1}>
              {/* <mesh>
                <boxGeometry args={[0.2, 4, 0.2]} />
                <meshBasicMaterial color={props.color} />
              </mesh> */}
              <MeshCollider type="ball">
                <mesh position={[0, 0, 0]} onClick={applyForce}>
                    <sphereGeometry args={[0.5]} />
                    <meshBasicMaterial color={props.color} />
                </mesh>
              </MeshCollider>
            </RigidBody>
          </group>
        );
      };

    return <>
        {/* {JointedThing()} */}
        <HangingThing position={[-2, 8, 0]} color={"purple"}/>
        <HangingThing position={[-1, 8, 0]} color={"green"} />
        <HangingThing position={[0, 8, 0]} color={"lightblue"} />
        <HangingThing position={[1, 8, 0]} color={"orange"} />
        <HangingThing position={[2, 8, 0]} color={"limegreen"} />
        <RigidBody
            type="fixed"
            // density={0.1}
            
            
        >   
            <mesh
                rotation-x = {-Math.PI * 0.5}
            >
                <boxGeometry args={[15, 15, 0.5]}/>
                <meshBasicMaterial color={0xff0000} />
            </mesh>
        </RigidBody>
        
        
        {/* 
        

        <RigidBody
            ref={body1}
            position={[-2, 6, 0]}
            // gravityScale={0.25}
            friction={0.4}
            restitution={0.8}
            type="dynamic"
        >
            <mesh>
                <boxGeometry args={[1, 1, 1]}/>
                <meshBasicMaterial color={0xffff00} />
            </mesh>
        </RigidBody>

        <RigidBody
            ref={body2}
            position={[2, 6, 0]}
            // gravityScale={0.25}
            friction={0.4}
            restitution={0.8}
            type="kinematicPosition"
        >
            <mesh>
                <boxGeometry args={[1, 1, 1]}/>
                <meshBasicMaterial color={0x00ffff} />
            </mesh>
        </RigidBody>

        <RigidBody
            ref={body3}
            position={[2, 6, 0]}
            // gravityScale={0.25}
            friction={0.4}
            restitution={0.8}
            type="dynamic"
            colliders="ball"
        >
            <mesh>
                <sphereGeometry args={[1]}/>
                <meshBasicMaterial color={"limegreen"} />
            </mesh>
        </RigidBody>

        <RigidBody
            ref={body4}
            position={[2, 6, 0]}
            // gravityScale={0.25}
            friction={0.4}
            restitution={0.8}
            type="dynamic"
            colliders="ball"
        >
            <mesh>
            <sphereGeometry args={[1]}/>
                <meshBasicMaterial color={"orange"} />
            </mesh>
        </RigidBody> */}
    </>
}
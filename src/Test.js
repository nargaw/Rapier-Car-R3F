import { useFrame } from "@react-three/fiber";
import { RigidBody, useImpulseJoint, useRapier, useRevoluteJoint, useSphericalJoint, MeshCollider } from "@react-three/rapier";
import { Box, Sphere } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Quaternion } from "three";

export default function Test()
{

    const { rapier, world } = useRapier()
    const rapierWorld = world.raw()

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
          <group {...props} >
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
                <mesh position={[0, 0, 0]} onClick={applyForce} castShadow>
                    <sphereGeometry args={[0.5]} />
                    <meshStandardMaterial color={props.color} />
                </mesh>
              </MeshCollider>
            </RigidBody>
          </group>
        );
      };

    return <>
        <HangingThing position={[-2, 5, 0]} color={"purple"}/>
        <HangingThing position={[-1, 5, 0]} color={"green"} />
        <HangingThing position={[0, 5, 0]} color={"lightblue"} />
        <HangingThing position={[1, 5, 0]} color={"orange"} />
        <HangingThing position={[2, 5, 0]} color={"limegreen"} />
    </>
}
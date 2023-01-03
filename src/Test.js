import { RigidBody, useImpulseJoint } from "@react-three/rapier";
import { useRef } from "react";

// const body1 = useRef()
// const body2 = useRef()

// const joint = useImpulseJoint(body1, body2)



export default function Test()
{
    return <>
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
        

        <RigidBody
            // ref={body1}
            position={[-2, 6, 0]}
            // gravityScale={0.25}
            friction={0.4}
            restitution={0.8}
        >
            <mesh>
                <boxGeometry args={[1, 1, 1]}/>
                <meshBasicMaterial color={0xffff00} />
            </mesh>
        </RigidBody>

        <RigidBody
            // ref={body2}
            position={[2, 6, 0]}
            // gravityScale={0.25}
            friction={0.4}
            restitution={0.8}
        >
            <mesh>
                <boxGeometry args={[1, 1, 1]}/>
                <meshBasicMaterial color={0x00ffff} />
            </mesh>
        </RigidBody>
        
    </>
}
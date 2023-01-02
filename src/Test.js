import { RigidBody } from "@react-three/rapier";

export default function Test()
{
    return <>
        <RigidBody
            type="fixed"
        >   
            <mesh
                rotation-x = {-Math.PI * 0.5}
            >
                <boxGeometry args={[10, 10, 0.5]}/>
                <meshBasicMaterial color={0xff0000} />
            </mesh>
        </RigidBody>
        

        <RigidBody
            position={[0, 5, 0]}
        >
            <mesh>
                <boxGeometry args={[1, 1, 1]}/>
                <meshBasicMaterial color={0xffff00} />
            </mesh>
        </RigidBody>
        
    </>
}
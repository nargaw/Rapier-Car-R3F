import { RigidBody } from "@react-three/rapier"

export default function Environment()
{
    return <>
        <RigidBody
            type="fixed"
            // density={0.1}    
        >   
            <mesh
                receiveShadow
                rotation-x = {-Math.PI * 0.5}
            >
                <boxGeometry args={[150, 150, 0.5]}/>
                <meshStandardMaterial color={0xff0000} />
            </mesh>
        </RigidBody>
    </>
}
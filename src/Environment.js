import { RigidBody } from "@react-three/rapier"

export default function Environment()
{
    return <>
        <RigidBody
            type="fixed"
            friction={1}
            restitution={0.1}
            // density={0.1}    
        >   
            <mesh
                receiveShadow
                rotation-x = {-Math.PI * 0.5}
            >
                <boxGeometry args={[550, 550, 0.5]}/>
                <meshStandardMaterial color={0x888888} />
            </mesh>
        </RigidBody>
    </>
}
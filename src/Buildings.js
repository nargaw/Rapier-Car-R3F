import { RigidBody } from "@react-three/rapier"
import { useRef } from "react"
import * as THREE from 'three'

export default function Buildings()
{
    
    const buildings = useRef()
    const buildingGeometry = new THREE.BoxGeometry(5, 20, 5)
    const buildingMaterial = new THREE.MeshStandardMaterial({color: '#ff0000'})
    const angle = Math.random() * Math.PI * 2
    const radius = 20 + Math.random() * 50

    return <>
        {[...Array(50)].map((value, index) =>
        <RigidBody
            key={index}
            type="fixed"
            position={[
                (Math.random() - 0.5) * Math.PI * 2 * 20 + (Math.random() - 0.5) * 250,
                10,
                (Math.random() - 0.5) * Math.PI * 2 * 20 + (Math.random() - 0.5) * 250
            ]}
        >
            <mesh
                geometry={buildingGeometry}
                material={buildingMaterial}
            />
        </RigidBody>
        )}
    </>
}
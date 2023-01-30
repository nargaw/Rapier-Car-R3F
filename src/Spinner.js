import { useKeyboardControls } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import { useFrame } from "@react-three/fiber"
import { useRef, useState} from "react"

export default function Spinner()
{


    const anchor = useRef()
    const spinner = useRef()

    const [ subscribeKeys, getKeys ] = useKeyboardControls()

    useFrame((state, delta) =>
    {
        const { forward, backward, left, right } = getKeys()
        if(forward)
        {
            console.log('forward')
        } 
    })

    return <>
    
    </>
}
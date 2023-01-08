import { OrbitControls } from "@react-three/drei"
import { Physics, Debug } from "@react-three/rapier"
import Test from './Test.js'
import Environment from './Environment.js'
import Lights from './Lights.js'

export default function Experience()
{
    return <>
        <OrbitControls makeDefault />
        <Physics>
            <Debug />
            <Test />
            <Environment />
            <Lights />
        </Physics>
    </>
}
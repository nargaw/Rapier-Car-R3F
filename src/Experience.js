import { OrbitControls } from "@react-three/drei"
import { Physics, Debug } from "@react-three/rapier"
import Test from "./Test"

export default function Experience()
{
    return <>
        <OrbitControls makeDefault />
        <Physics>
            <Test />
        </Physics>
    </>
}
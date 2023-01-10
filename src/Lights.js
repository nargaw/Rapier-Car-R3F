import { useRef } from "react"

export default function Lights()
{

    const directionalLight = useRef()

    return <>
        <ambientLight intensity={0.5} />
        <directionalLight 
            ref={ directionalLight }
            position={ [ 1, 20, 3 ] }
            intensity={ 0.5 }
            castShadow
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 0.1 }
            shadow-camera-far={ 100 }
            shadow-camera-top={ 50 }
            shadow-camera-right={ 50 }
            shadow-camera-bottom={ - 50 }
            shadow-camera-left={ - 50 }
        />
    </>
}
export default function Lights()
{
    return <>
        <ambientLight intensity={0.5} />
        <directionalLight castShadow intensity={0.8} position={[0, 6, -5]}/>
    </>
}
import { useEffect } from 'react'
import { Button } from 'flowbite-react'
import GetDevices from '../../data/tailscaleHttp/getDevices';

export default function Network() {
    async function GetAllDevices () {
        return await GetDevices();
    }

    useEffect(() => {
        const devices = GetAllDevices();
        console.log(devices);
    })

    return (
    <div id="networkPage" className="h-screen w-screen">
        <div>
            <Button gradientDuoTone="greenToBlue">I am the Network Page</Button>
        </div>
    </div>
    )
}
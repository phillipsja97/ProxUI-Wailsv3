import { useEffect, useState } from 'react'
import { GetDevices } from '../../../bindings/github.com/phillipsja97/ProxUI-Wailsv3/tailscaleservice.ts';
import { Device } from '../../../bindings/tailscale.com//client/tailscale/v2/models.ts';

export default function Network() {
    const [devices, setDevices] = useState<Device[]>()

    // async function GetAllDevices () {
    //     return await GetDevices();
    // }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetDevices();
                setDevices(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        console.log(devices);
    },[GetDevices])

    return (
    <div id="networkPage" className="h-screen w-screen">
        {/* {
            devices.map(device) => {
               <Card className="max-w-sm">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Noteworthy technology acquisitions 2021
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </p>
             </Card>
            })
        } */}
        <h1>Hello</h1>
    </div>
    )
}
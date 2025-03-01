import { useEffect, useState } from 'react'
import { GetDevices, GetUsers } from '../../../bindings/github.com/phillipsja97/ProxUI-Wailsv3/tailscaleservice.ts';
import { Device, User } from '../../../bindings/tailscale.com//client/tailscale/v2/models.ts';
// import ListItems from '../../components/ListItems.tsx';
import TabBar from '../../components/TabBar.tsx';
// import Table from '../../components/Table.tsx'
import { Spinner } from 'flowbite-react'

export default function Network() {
    const [devices, setDevices] = useState<Device[]>();
    const [users, setUsers] = useState<User[]>();

    async function GetAllDevices () {
        const deviceList: Device[] = []
        try {
            const response: Device[] = await GetDevices();
            response.forEach((x) => {
                deviceList.push(x);
            })
            setDevices(deviceList);
        } catch (error) {
            console.log("error", error);
        }
    }

    async function GetAllUsers () {
        const UserList: User[] = []
        try {
            const response: User[] = await GetUsers();
            response.forEach((x) => {
                UserList.push(x);
            })
            setUsers(UserList);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        GetAllDevices().then(() => {
        GetAllUsers()
                console.log("Retrieved Tailnet Users");
            }).catch((err) => console.error(`Error getting Tailnet Users ${err}`))
        .catch((error) => console.error(`Error getting Devices ${error}`))
        
    },[])

    return (
        <div id="networkPage" className="h-screen w-screen">
            <div id="topBar" className="block w-screen">
                { (devices && users) ? <TabBar devices={devices} users={users} />
                                     : <Spinner aria-label="Extra large spinner example" size="xl" /> }
                {/* {
                    (devices)
                    ?
                        <List unstyled className="max-w-fit divide-y divide-gray-200 dark:divide-gray-700">
                            { devices.map((device) => 
                                <ListItems device={device} />
                            )}
                        </List>
                    :         
                        <Spinner aria-label="Extra large spinner example" size="xl" />
                } */}
            </div>
        </div>
    )
}
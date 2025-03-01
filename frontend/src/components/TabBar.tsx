import { useRef, useState } from 'react'
import { Tabs, TabsRef, Spinner } from 'flowbite-react'
import { Device, User } from '../../bindings/tailscale.com/client/tailscale/v2/models'
import { HiUserCircle, HiAdjustments } from "react-icons/hi";
import { MdDevices } from "react-icons/md";
import Table from '../components/Table.tsx';

type Props = {
    devices: Device[],
    users: User[],
}

const TabBar: React.FC<Props> = ({ devices, users }) => {
    const tabsRef = useRef<TabsRef>(null);
    const [activeTab, setActiveTab] = useState(0);
    console.log(activeTab, "activeTab");

    // const showDevicesTab = () => {
    //     tabsRef.current?.setActiveTab(0)
    //     onClick={() => showDevicesTab}
    // };

    return (
        <Tabs aria-label="Full width tabs" ref={tabsRef} onActiveTabChange={(number) => setActiveTab(number)}>
            <Tabs.Item active title="Devices" icon={MdDevices}>
                <h1> Devices</h1>
                {
                    devices ? <Table devices={devices} /> : <Spinner aria-label="Extra large spinner example" size="xl" />
                }
            </Tabs.Item>
            <Tabs.Item title="Users" icon={HiUserCircle}>
                { users.map((user) => user.displayName) }
            </Tabs.Item>
            <Tabs.Item title="Settings" icon={HiAdjustments}>
                Settings
            </Tabs.Item>
            <Tabs.Item disabled title="Disabled">
                Disabled content
            </Tabs.Item>
        </Tabs>
    )
}

export default TabBar;
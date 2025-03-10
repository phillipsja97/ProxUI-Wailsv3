import { useEffect, useState } from 'react';
import { GetTailscalePeers } from '../../bindings/github.com/phillipsja97/ProxUI-Wailsv3/tailscaleclient.ts';
import { PeerStatus } from '../../bindings/tailscale.com/ipn/ipnstate/models.ts';
import {
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
//   import { UserPlusIcon } from "@heroicons/react/24/solid";
  import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Chip,
    // Tabs,
    // TabsHeader,
    // Tab,
    Avatar
  } from "@material-tailwind/react";
  import { Time } from '../../bindings/time/models.ts';
  import { Spinner } from "@material-tailwind/react";
   
export default function Network() {
    const [devices, setDevices] = useState<(PeerStatus | null)[]>();

    const TABLE_HEAD = ["Device Status", "Device Name", "Device Address", "Created", "Last Seen", "Routes Enabled?", "ExitNode Enabled?"]
    const GetLogo = (os: string) => {
        let logo;
        if (os == "iOS") {
            logo = "../../public/ios-logo.png";
            return logo;
        } else if (os == "windows") {
            logo = "../../public/windows-logo.png";
            return logo;
        } else if (os == "linux") {
            logo = "../../public/linux-logo.png";
            return logo;
        } else {
            logo = "../../public/tailscaleLogo.png";
            console.log("os not found, returning generic tailscale logo");
            return logo;
        }
    }

    const GetDevices = () => {
        let deviceList = []
        GetTailscalePeers().then((devices) => {
            devices.sort((a, b) => {
                if (a?.Online && !b?.Online) {
                    return -1;
                } else if (!a?.Online && b?.Online) {
                    return 1;
                } else {
                    return 0;
                }
            });
            deviceList = devices;
            console.log(devices);
            setDevices(deviceList);
        }).catch((err) => console.error(err))
    }

    const ParseDate = (date: Time) => {
        const newDate = new Date(date).toLocaleDateString()
        return newDate;
    }


    useEffect(() => {
        GetDevices();
    },[])

    return (
        <Card className="h-screen w-full rounded-none dark:bg-blue-gray-700">
        <CardHeader floated={false} shadow={false} className="rounded-none dark:bg-blue-gray-700 dark:text-gray-100">
            <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                    <Typography className="dark:bg-blue-gray-700 dark:text-gray-100" variant="h5" color="blue-gray">
                        Device List
                    </Typography>
                </div>
            </div>
            {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
                <TabsHeader>
                    <Tab key="allDevices">
                    &nbsp;&nbsp;All Devices&nbsp;&nbsp;
                    </Tab>
                    <Tab key="authorizedDevices">
                    &nbsp;&nbsp;My Devices&nbsp;&nbsp;
                    </Tab>
                </TabsHeader>
            </Tabs> */}
            {/* <div className="w-full md:w-72">
                <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
            </div> */}
            {/* </div> */}
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
                <tr>
                {TABLE_HEAD.map((head, index) => (
                    <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                        {head}{" "}
                        {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                        )}
                    </Typography>
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
                {devices ? devices.map((device, index) => {
                    const isLast = index === devices.length - 1;
                    const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                    return (
                    <tr key={device?.ID}>
                        <td className={classes}>
                        <div className="flex items-center gap-3">
                            <Avatar src={GetLogo(device!.OS)} size="sm" />
                            <div className="flex flex-col">
                            <Chip variant="gradient" 
                              value={device?.Online  ? "Connected" : "Disconnected"}
                              className="rounded-full"
                              color={device?.Online  ? "green" : "red"}
                              size="sm"
                              icon={
                                <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                              }
                        />
                            </div>
                        </div>
                        </td>
                        <td className={classes}>
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal dark:bg-blue-gray-700 dark:text-gray-100"
                                >
                                {device?.HostName}
                            </Typography>
                        </div>
                        </td>
                        <td className={classes}>
                        <div className="w-max">
                        <div className="flex flex-col">
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal dark:bg-blue-gray-700 dark:text-gray-100"
                            >
                            IPv4: {device?.TailscaleIPs[0]}
                            </Typography>
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70 dark:bg-blue-gray-700 dark:text-gray-100"
                            >
                            IPv6: {device?.TailscaleIPs[1]}
                            </Typography>
                        </div>
                        </div>
                        </td>
                        <td>
                        <div className="flex flex-col">
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal dark:bg-blue-gray-700 dark:text-gray-100"
                            >
                            {ParseDate(device?.Created)}
                            </Typography>
                          </div>
                        </td>
                        <td>
                        <div className="flex flex-col">
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal dark:bg-blue-gray-700 dark:text-gray-100"
                            >
                            {ParseDate(device?.LastSeen)}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                        <Chip variant="gradient" 
                              value={device?.AllowedIPs != null ? "Enabled" : "Disabled"}
                              className="rounded-full"
                              color="green"
                              size="sm"
                              icon={
                                <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                              }
                        />
                        </td>
                        <td className={classes}>
                        <Chip variant="gradient" 
                              value={device?.ExitNode ? "Enabled" : "Disabled"}
                              className="rounded-full"
                              color="green"
                              size="sm"
                              icon={
                                <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                              }
                        />
                        </td>
                    </tr>
                    );
                },
                )
            :  <div>
                    <Spinner className="h-16 w-16 text-gray-900/50" />
               </div>}
            </tbody>
            </table>
            </CardBody>
        </Card>
    );
}
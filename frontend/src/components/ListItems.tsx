import { Device } from "../../bindings/tailscale.com/client/tailscale/v2/models";
import { List, Avatar } from 'flowbite-react';
// import { iosLogo } from '../../public/ios-logo.png';

type Props = {
    device: Device,
}

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

const ListItems: React.FC<Props> = ({ device }) => {
    return (
        <List.Item className="pb-0 pt-3 md:pt-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img={GetLogo(device.os)} alt="OS Logo that Tailscale client is installed on" rounded size="md" />
          <div className="w-full min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{device.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{device.lastSeen}</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{device.addresses[0]}</div>
        </div>
      </List.Item>
    )
}

export default ListItems;
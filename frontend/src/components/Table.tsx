import { Table, Avatar, } from "flowbite-react";
import { Device } from '../../bindings/tailscale.com/client/tailscale/v2/models.js';
// import { HiCheck } from "react-icons/hi";

type Props = {
    devices: Device[],
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

const BuildTableRows = (device: Device) => {
    return  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4">
                    <Avatar img={GetLogo(device.os)} alt="OS Logo that Tailscale client is installed on" rounded size="md" />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    { device.name }
                </Table.Cell>
                <Table.Cell>{device.addresses[0]}</Table.Cell>
                <Table.Cell>{device.clientVersion}</Table.Cell>
                <Table.Cell>{device.lastSeen}</Table.Cell>
                <Table.Cell>
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        Full Details
                    </a>
                </Table.Cell>
            </Table.Row>
}

const TableCard: React.FC<Props> = ({ devices}) => {
  return (
    <div className="max-w-full">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
            Status
          </Table.HeadCell>
          <Table.HeadCell>Device</Table.HeadCell>
          <Table.HeadCell>IPv4 Address</Table.HeadCell>
          <Table.HeadCell>Version</Table.HeadCell>
          <Table.HeadCell>Last Seen</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          { devices ? devices.map((device) => BuildTableRows(device)) : null }
        </Table.Body>
      </Table>
    </div>
  );
}

export default TableCard;

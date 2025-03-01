import { Card } from 'flowbite-react'
import { Device } from '../../bindings/tailscale.com/client/tailscale/v2/models'

type Props = {
    device: Device,
    index: number,
}

const CardComp: React.FC<Props> = ({ device, index}) => {
    return (
        <Card className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {device.hostname}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                {index}
            </p>
        </Card>
    )
}

export default CardComp;
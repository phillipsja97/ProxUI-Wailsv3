import { GetDevices } from '../../../bindings/github.com/phillipsja97/ProxUI-Wailsv3/tailscaleservice.ts';

const GetTailnetDevices = () => new Promise((resolve, reject) => {
    GetDevices()
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        })
});

export default GetTailnetDevices;
import { NewTailscaleService } from '../../../bindings/github.com/phillipsja97/ProxUI-Wailsv3/tailscaleservice.ts';

const TailscaleServiceCall = () => new Promise((resolve, reject) => {
    NewTailscaleService()
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        })
});

export default TailscaleServiceCall;
import { NewTailscaleService } from '../../../bindings/github.com/phillipsja97/ProxUI-Wailsv3/tailscaleservice.ts';

export default function CreateClient() {
    const client = NewTailscaleService();
    return client;
};
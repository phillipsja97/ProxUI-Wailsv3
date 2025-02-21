import { useState, useEffect } from 'react';
// import { CreateNewClient } from '../bindings/changeme/tailscaleservice.js';
import CreateClient from './data/tailscaleHttp/createClient.tsx'
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiCloud, HiDatabase, HiPencil, HiWifi } from "react-icons/hi";

// async function CreateClient() {
//   try {
//     const client = await CreateNewClient();

//     const devices = client.Devices();
//     console.log(devices);
//     return devices;
//   } catch (e) {
//     console.log(e);
//   }
// }

function App() {
  const [httpClient, setHttpClient] = useState({});

  useEffect(() => {
    const client = CreateClient();
    setHttpClient(client);
    console.log(httpClient);
  },[])

  return (
    <div className="flex flex-row">
      <Sidebar
        aria-label="Default sidebar example"
        >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/#/network" icon={HiWifi}>
              Network
            </Sidebar.Item>
            <Sidebar.Item href="/#/proxy" icon={HiCloud}>
              Proxy
            </Sidebar.Item>
            <Sidebar.Item href="/#/dashboard" icon={HiDatabase}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiPencil}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default App;

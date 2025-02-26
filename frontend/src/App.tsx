import { useState, useEffect } from 'react';
// import { CreateNewClient } from '../bindings/changeme/tailscaleservice.js';
import CreateClient from './data/tailscaleHttp/createClient.tsx'
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiCloud, HiDatabase, HiPencil, HiWifi } from "react-icons/hi";

function App() {
  const [httpClient, setHttpClient] = useState({});

  useEffect(() => {
    const client = CreateClient();
    setHttpClient(client);
    console.log(httpClient);
  },[httpClient])

  const test = () => {
    console.log("Clicked!")
  }

  return (
    <div className="flex flex-row">
      <Sidebar
        aria-label="Default sidebar example"
        >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item onClick={test} icon={HiWifi}>
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

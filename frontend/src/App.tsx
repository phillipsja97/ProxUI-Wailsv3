import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiCloud, HiDatabase, HiPencil, HiWifi } from "react-icons/hi";

function App() {

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

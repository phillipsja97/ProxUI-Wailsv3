import { useState } from "react";
import Sidebar from './components/Sidebar.tsx';
import { useNavigate, Route, Routes } from 'react-router-dom';
import Network from './pages/Network.tsx';
import Proxy from './pages/Proxy.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Users from './pages/Users.tsx';
import Settings from './pages/Settings.tsx';
import Home from './pages/Home.tsx';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const ToggleDarkMode = () => {
    if (darkMode) {
      document.body.classList.remove('dark')
      setDarkMode(false)
    } else {
      document.body.classList.toggle('dark')
      setDarkMode(true)
    }
  }

  const NavigationOrchestrator = (route: string) => {
    const append = '#/';
    const renderRoute = `${route}${append}`;
    navigate(renderRoute);
  }
 
  return (
    <div className="flex flex-row w-full">
      <div id="sidebar" className="bg-inherit">
        <Sidebar ToggleDarkMode={ToggleDarkMode} NavigationOrchestrator={NavigationOrchestrator}/>
      </div>
      <div id="mainRouteWindow" className="h-screen w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/network" element={<Network />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/proxy" element={<Proxy />} />
        <Route path="/users" element={<Users />} />
        <Route path="/tailSettings" element={<Settings />} />
      </Routes>
      </div>
    </div>
  );
}
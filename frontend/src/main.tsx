import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Network from './pages/Network/Network.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import Proxy from './pages/Proxy/Proxy.tsx';
import { HashRouter, Routes, Route } from 'react-router';
import "./index.css";
import { Flowbite } from "flowbite-react";

// const customTheme = {
//   button: {
//     color: {
//       primary: 'bg-Cyan-500 text-black hover:bg-slate-900 hover:border-black-900',
//       secondary: 'bg-slate-100',
//       cyan: "#20B2AA",
//     },
//   },
// }

// const =

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Flowbite /*theme={{ theme: customTheme }}*/>
    <HashRouter>
      <App />
      <Routes>
        <Route path="/network" element={<Network />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/proxy" element={<Proxy />} />
      </Routes>
    </HashRouter>
  </Flowbite>,
);

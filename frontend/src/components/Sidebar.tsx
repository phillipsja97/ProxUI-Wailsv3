import { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  // Accordion,
  // AccordionHeader,
  // AccordionBody,
  Alert,
  Switch
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  InboxIcon,
  UsersIcon,
  ChartBarIcon,
  Bars4Icon
} from "@heroicons/react/24/solid";
import {
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";

type Props = {
    ToggleDarkMode: () => void;
    NavigationOrchestrator: (route: string) => void;
}

const Sidebar: React.FC<Props> = ({ ToggleDarkMode, NavigationOrchestrator}) => {
  const [open, setOpen] = useState(true);
  // const [openAlert, setOpenAlert] = useState(true);
 
// const handleOpen = (value: boolean) => {
//     setOpen(value);
//   };

return (
    <Card className="h-screen w-full max-w-[20rem] rounded-none p-4 shadow-xl shadow-blue-gray-900/5 bg-gray-100 dark:bg-blue-gray-700">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
        <Typography variant="h5" className="dark:text-gray-100" color="blue-gray">
          Prox-UI
        </Typography>
      </div>
      <List>
      <Switch label="Dark Mode" className="dark:text-gray-100" ripple={true} onClick={ToggleDarkMode}/>
        <ListItem className="dark:text-gray-100" onClick={() => NavigationOrchestrator('network')}>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix >
          Network
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem className="dark:text-gray-100"  onClick={() => NavigationOrchestrator("users")}>
          <ListItemPrefix>
            <UsersIcon className="h-5 w-5" />
          </ListItemPrefix>
          Users
        </ListItem>
        <ListItem className="dark:text-gray-100" onClick={() => NavigationOrchestrator('dashboard')}>
          <ListItemPrefix>
            <ChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem className="dark:text-gray-100" onClick={() => NavigationOrchestrator('proxy')}>
          <ListItemPrefix>
            <Bars4Icon className="h-5 w-5" />
          </ListItemPrefix>
          Proxy
        </ListItem>
        <ListItem className="dark:text-gray-100" onClick={() => NavigationOrchestrator('tailSettings')}>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
      </List>
      <hr className="border-blue-gray-50" />
      <Alert
        open={open}
        className="max-w-screen-md mt-auto"
        icon={<CubeTransparentIcon />}
        onClose={() => setOpen(false)}
      >
        <Typography variant="h5" color="white">
          Success
        </Typography>
        <Typography color="white" className="mt-2 font-normal">
          Testing
        </Typography>
      </Alert>
    </Card>
    )
}

export default Sidebar;
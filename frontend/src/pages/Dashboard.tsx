import { useLocation } from 'react-router-dom'

export default function Dashboard() {
    const location = useLocation();

    return (
        <>
        <h1>Dashboard</h1>
        <h1>{location.pathname}</h1>
        </>
    )
}
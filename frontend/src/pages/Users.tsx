import { useLocation } from 'react-router-dom'

export default function Users() {
    const location = useLocation();

    return (
        <>
        <h1>Users</h1>
        <h1>{location.pathname}</h1>
        </>
    )
}
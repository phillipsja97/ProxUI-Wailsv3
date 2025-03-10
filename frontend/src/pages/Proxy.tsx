import { useLocation } from 'react-router-dom'

export default function Proxy() {
    const location = useLocation();

    return (
        <>
        <h1>Proxy</h1>
        <h1>{location.pathname}</h1>
        </>
    )
}
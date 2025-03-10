import { useLocation } from 'react-router-dom'

export default function Home() {
    const location = useLocation();

    return (
        <>
        <h1>Home</h1>
        <h1>{location.pathname}</h1>
        </>
    )
}
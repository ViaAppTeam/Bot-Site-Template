import { useState, useEffect } from "react";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import { api_url } from "../../../config.json";

const Login = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const code = new URLSearchParams(window.location.search).get('code');

            const response = await axios.post(
                `${api_url}/discord_get_user`,
                { code }
            )

            if (response.data.access_token === undefined) {
                return window.location = '/';
            }

            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("userId", response.data.user_id)
            window.location = '/dashboard';
        }

        fetchData();
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: '#111315',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            textAlign: 'center',
        }}>
            <MoonLoader
                color={'#0ea5e9'}
                loading={loading}
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
};

export default Login;
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api_url } from '../../../config.json';
// import { useSpring, animated } from '@react-spring/web';
import { useGuilds } from '../../context/GuildContext';
// import { dashboard } from '../../lang/en.json';

const DashboardNavbar = () => {
    const lang = localStorage.getItem("language");
    const navigate = useNavigate();
    const { guilds } = useGuilds();
    const [userData, setUserData] = useState(null);
    const [profileMenu, setProfileMenu] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${api_url}/get_user`, {
                    type: "discord",
                    token: localStorage.getItem("token"),
                });

                setUserData(response.data.data);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchData();
    }, []);

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = '/';
    };

    const parts = window.location.pathname.split('/dashboard/')[1]?.split('/');
    const guildId = parts ? parts[0] : null;

    useEffect(() => {
        if (guilds && guilds.added && guildId) {
            const isAuthorized = guilds.added.some((guild) => guild.id === guildId);
            if (!isAuthorized) {
                window.location.href = "/";
            }
        }
    }, [guilds, guildId]);

    if (guildId) {
        return (
            <div className='flex justify-between py-2 px-12 items-center'>
                <div className="flex flex-row items-center gap-6">
                    <span onClick={() => navigate("/dashboard")} className="cursor-pointer  flex flex-row items-center">
                        <img className="w-12" src="/logo.png" alt="viaapp logo" />
                        <span className="text-lg --logo hidden sm:block">ViaApp</span>
                    </span>
                    <button onClick={() => navigate("/dashboard")} className='duration-200 hidden sm:block bg-gray-700 hover:bg-gray-600 ring-1 focus:ring-2 ring-white/5 rounded-xl py-1 px-2'><i className="fa-solid fa-retweet"></i> {!lang ? "Sunucu değiştir" : "Change server"}</button>
                </div>
                <div className='flex items-center'>
                    {userData ?
                        <div>
                            <div onClick={() => setProfileMenu(prevState => !prevState)} className={`duration-200 cursor-pointer hover:bg-gray-700 ${profileMenu && ("bg-gray-700")} rounded-xl py-1 px-2 focus:ring-2 ring-white/5 flex flex-row gap-4 items-center`}>
                                <img className='w-7 rounded-full' src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`} alt={userData.username} />
                                <span>{userData.global_name}</span>
                                {profileMenu ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
                            </div>

                            {profileMenu && (
                                <div className='absolute w-32 h-24 bg-gray-700 rounded-lg mt-1 ml-4 flex flex-col gap-2 justify-center text-center ring-1 ring-white/5 shadow-md'>
                                    <span onClick={() => navigate("/dashboard")} className='cursor-pointer hover:bg-gray-800 py-2 px-2 rounded-md flex'><img className="w-6 mr-2" src="/servers.svg" alt="servers" /> {!lang ? "Sunucular" : "Servers"}</span>
                                    <span onClick={() => logOut()} className='cursor-pointer hover:bg-gray-800 py-2 px-2 rounded-md flex'><img className="w-6 mr-2" src="/logout.svg" alt="logout" /> {!lang ? "Çıkış yap" : "Log out"}</span>
                                </div>
                            )}
                        </div>
                        :
                        <div className='flex flex-row items-center gap-4 py-1 px-2'>
                            <span className='bg-gray-700 rounded-full animate-pulse w-7 h-7'><span className='invisible'>L</span></span>
                            <span className='bg-gray-700 rounded-xl py-1 px-2 ring-1 ring-white/5 animate-pulse'><span className='invisible'>Lourity</span></span>
                            <i className="fa-solid fa-angle-down"></i>
                        </div>
                    }
                </div>
            </div>
        )
    } else {
        window.location.href = '/dashboard';
        return null;
    }
}

export default DashboardNavbar;

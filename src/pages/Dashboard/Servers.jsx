import { useEffect, useState } from 'react';
import axios from 'axios';
import { api_url, dashboard_invite_url } from '../../../config.json';
import { Helmet } from 'react-helmet';

const Servers = () => {
  const [guilds, setGuilds] = useState({ added: [], notAdded: [] });
  const [loading, setLoading] = useState(true);
  const lang = localStorage.getItem("language");

  useEffect(() => {
    const fetchData = async () => {
      let guildsData = null;
      while (!guildsData) {
        try {
          const response = await axios.post(`${api_url}/guilds`, {
            token: localStorage.token,
          });
          guildsData = response.data;
          setGuilds(guildsData);
          setLoading(false);
        } catch (error) {
          await new Promise((resolve) => setTimeout(resolve, 40000));
        }
      }
    };

    fetchData();
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = '/';
  };

  const handleGuildClick = (guildId) => {
    window.location.href = `/dashboard/${guildId}`;
  };

  return (
    <div>
      <Helmet>
        <title>{!lang ? "Sunucular" : "Servers"}</title>
      </Helmet>

      <div className='flex flex-col justify-center items-center h-screen p-2'>
        <div>
          <span className="top-20 left-20 right-20 shadow-[0_0_1000px_80px_#0ea5e9]"></span>
        </div>
        <div onClick={logOut} className='cursor-pointer flex flex-row items-center mb-4'>
          <img className='w-16' src="/logo.png" alt="viaapp logo" />
          <span className="text-xl --logo">ViaApp</span>
        </div>

        <div className='rounded-lg border border-white/5 bg-[#16171b] w-full h-full sm:w-[30rem] sm:h-[30rem] overflow-y-auto'>
          <div className='flex justify-center mt-4'>
            <span className='bg-gray-700 rounded-lg px-2 --montserrat'>{!lang ? "Sunucu Seç" : "Select Server"}</span>
          </div>
          <div className='mt-4 mb-4 mx-4 flex flex-col gap-1'>
            <div className='cursor-pointer flex flex-col gap-2'>
              {!loading ? (
                <>
                  {guilds.added.map((guild, index) => (
                    <div key={index} onClick={() => handleGuildClick(guild.id)} className='--scale duration-200 flex flex-row items-center h-12 gap-2 bg-gray-800 hover:bg-gray-700 rounded-lg'>
                      <img className='ml-2 w-10 rounded-full' src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : "/space.png"} alt={guild.name} />
                      <span>{guild.name}</span>
                    </div>
                  ))}
                  {guilds.notAdded.map((guild, index) => (
                    <div key={index} onClick={() => window.location.href = `${dashboard_invite_url}&guild_id=${guild.id}`} className='--scale duration-200 flex flex-row items-center h-12 gap-2 bg-gray-700 opacity-60 hover:opacity-100 hover:text-white rounded-lg'>
                      {guild.icon ? (
                        <img className='ml-2 w-10 rounded-full' src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt={guild.name} />
                      ) : (
                        <span className='ml-2 flex items-center justify-center bg-gray-600 rounded-full w-10 h-10'>{guild.name[0]}</span>
                      )}
                      <span>{guild.name}</span>
                    </div>
                  ))}
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servers;

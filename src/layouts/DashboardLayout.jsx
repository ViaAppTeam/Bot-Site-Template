import { useLocation } from 'react-router-dom'
import Proptypes from "prop-types"
import DashboardNavbar from '../pages/Dashboard/DashboardNavbar';
import SystemNavbar from '../pages/Dashboard/Systems/SystemNavbar';
import { useGuilds } from '../context/GuildContext';
import { dashboard_invite_url } from '../../config.json';

const DashboardLayout = ({ children }) => {
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const currentPage = pathArray[pathArray.length - 1];
    if (localStorage.getItem("token")) {
        const { guilds } = useGuilds();
        return (
            <div>
                <div className={`${currentPage !== 'dashboard' && ('')}`}>
                    <div>
                        {currentPage !== 'dashboard' && (
                            <DashboardNavbar />
                        )}
                        {currentPage === 'dashboard' && (
                            <div>
                                {children}
                            </div>
                        )}
                    </div>
                    {currentPage !== 'dashboard' && (
                        <div>
                            <div className='flex flex-col sm:flex-row justify-end sm:justify-center py-12 sm:px-24 gap-4'>
                                <div>
                                    <SystemNavbar />
                                </div>
                                <div>
                                    {children}
                                </div>
                                <div className='flex flex-col w-full sm:w-auto sm:px-12 sm:mt-0 px-8 mt-12'>
                                    <div className="grid grid-cols-1 gap-2">
                                        {guilds && guilds.added && guilds.notAdded ?
                                            <>
                                                {guilds.added.map((guild, index) => (
                                                    <div key={index} onClick={() => window.location.href = `/dashboard/${guild.id}`} className='cursor-pointer --scale duration-200 flex flex-row items-center h-12 gap-2 bg-gray-800 hover:bg-gray-700 rounded-lg'>
                                                        <img className='ml-2 w-10 rounded-full' src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : "/space.png"} alt={guild.name} />
                                                        <span>{guild.name}</span>
                                                    </div>
                                                ))}
                                                {guilds.notAdded.map((guild, index) => (
                                                    <div key={index} onClick={() => window.location.href = `${dashboard_invite_url}&guild_id=${guild.id}`} className='cursor-pointer --scale duration-200 flex flex-row items-center h-12 gap-2 bg-gray-700 opacity-60 hover:opacity-100 hover:text-white rounded-lg'>
                                                        {guild.icon ?
                                                            <img className='ml-2 w-10 rounded-full' src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt={guild.name} />
                                                            :
                                                            <span className='ml-2 flex items-center justify-center bg-gray-600 rounded-full w-10 h-10'>{guild.name[0]}</span>
                                                        }
                                                        <span>{guild.name}</span>
                                                    </div>
                                                ))}
                                            </>
                                            :
                                            <div className='flex flex-col gap-2'>
                                                <div className='duration-300 flex flex-row items-center h-12 gap-2 bg-gray-800 rounded-lg'>
                                                    <span className='ml-2 flex items-center justify-center bg-gray-600 rounded-full w-10 h-10 animate-pulse'></span>
                                                    <span className='bg-gray-600 rounded-full px-8 py-1 mr-2 animate-pulse'><span className='invisible'>Lourity</span></span>
                                                </div>
                                                <div className='duration-300 flex flex-row items-center h-12 gap-2 bg-gray-800 rounded-lg'>
                                                    <span className='ml-2 flex items-center justify-center bg-gray-600 rounded-full w-10 h-10 animate-pulse'></span>
                                                    <span className='bg-gray-600 rounded-full px-8 py-1 mr-2 animate-pulse'><span className='invisible'>Lourity</span></span>
                                                </div>
                                                <div className='duration-300 flex flex-row items-center h-12 gap-2 bg-gray-800 rounded-lg'>
                                                    <span className='ml-2 flex items-center justify-center bg-gray-600 rounded-full w-10 h-10 animate-pulse'></span>
                                                    <span className='bg-gray-600 rounded-full px-8 py-1 mr-2 animate-pulse'><span className='invisible'>Lourity</span></span>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div >
        )
    } else {
        window.location.href = "/";
    }
}

export default DashboardLayout

DashboardLayout.propTypes = {
    children: Proptypes.node
}

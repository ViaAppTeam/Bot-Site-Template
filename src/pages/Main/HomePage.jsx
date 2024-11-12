import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Main/Navbar'
import Footer from '../../components/Main/Footer'
import { Helmet } from 'react-helmet'
import { login_url, invite_url, api_url } from '../../../config.json'
import axios from 'axios'
const HomePage = () => {
    const navigate = useNavigate();
    const [lang, setLang] = useState(localStorage.getItem('language') ? true : false);
    const [status, setStatus] = useState(null);

    const handleLanguageChange = (newLang) => {
        setLang(newLang);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api_url}/bot_status`);
                setStatus(response.data);
            } catch (error) {
                console.error("Error fetching bot data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Helmet>
                <title>ViaApp Bot</title>
            </Helmet>

            <Navbar lang={lang} />
            <div className="relative flex justify-center text-center sm:text-start py-24">
                <div className="background-image-container">
                    <img src="/background_image.png" alt="Background" className="background-image" />
                    <div className="background-overlay"></div>
                </div>
                <div className="relative flex flex-row gap-12">
                    <div className="px-2 sm:px-0">
                        <div>
                            <span className="bg-gray-800 rounded-full px-1 py-1 ml-0 sm:ml-4 text-cyan-500 --montserrat font-normal">
                                <i className="fa-regular fa-circle-check mr-1"></i> {!lang ? "Yeni nesil Discord botu" : "New generation Discord bot"}
                            </span>
                        </div>
                        <h1 className="--logo text-4xl sm:text-7xl font-bold">
                            {!lang ? "Dinamik Sistemler" : <span>Reframe <span className='text-cyan-500'>Discord</span></span>}
                            <br />
                            {!lang ? <span>ile <span className='text-cyan-500'>Discord'u</span></span> : "with Dynamic"}
                            <br />
                            {!lang ? "Yeniden Şekillendir!" : "Systems"}
                        </h1>

                        <div className="mt-2">
                            <span className="text-gray-400">
                                {!lang ? "ViaApp, sunucunu modern ve gelişmiş sistemler ile yönetebilmeni sağlayan Discord botudur." : "ViaApp is a Discord bot that allows you to manage your server with modern and advanced systems."}
                            </span>
                        </div>

                        <div className="flex justify-center sm:justify-start gap-4 py-4">
                            <button onClick={() => window.location.href = login_url}
                                className="duration-200 rounded-xl focus:rounded-lg bg-cyan-500 hover:bg-cyan-600 py-2 px-4">
                                {!lang ? "Yönetim Paneli" : "Dashboard"} <i className="fa-solid fa-arrow-right text-sm"></i>
                            </button>
                        </div>
                    </div>

                    <div>
                        <img className="hidden sm:block" src="/logo.png" alt="viaapp logo" />
                    </div>
                </div>
            </div>


            <div className="flex flex-col sm:py-24 sm:px-24 2xl:px-32">
                <div className="text-center">
                    <span className="text-gray-500 --montserrat">{!lang ? "Ö z e l l i k l e r" : "F E A T U R E S"}</span>
                    <h2 className="text-4xl font-semibold --logo">{!lang ? "İşlevsel ve Gelişmiş" : "Functional and Advanced"}<br /><span
                        className="text-cyan-500">Discord</span> {!lang ? "Deneyimi" : "Experience"}
                    </h2>
                </div>

                <div className="text-center m-4">
                    <span onClick={() => navigate("/commands")}
                        className="cursor-pointer duration-300 rounded-xl ring-1 ring-gray-600 hover:ring-gray-500 py-1 px-2 text-gray-300 hover:text-white text-sm">{!lang ? "Komut listesi" : "Command list"} <i className="fa-solid fa-arrow-right text-sm"></i></span>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    <div className="border border-gray-600 rounded-xl">
                        <div className="flex flex-row p-4 gap-4">
                            <img className="w-10" src="moderation.svg" alt="moderasyon" />
                            <div className="flex flex-col text-start">
                                <span className="--logo font-semibold">{!lang ? "Moderasyon" : "Moderation"}</span>
                                <span className="text-gray-400 font-extralight">{!lang ? "Kullanıcı dostu komutlarla Kapsamlı moderasyon deneyimi." : "With user-friendly commands Extensive moderation experience."}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-600 rounded-xl">
                        <div className="flex flex-row p-4 gap-4">
                            <img className="w-10" src="/ticket.svg" alt="destek" />
                            <div className="flex flex-col text-start">
                                <span className="--logo font-semibold">{!lang ? "Destek" : "Support"}</span>
                                <span className="text-gray-400 font-extralight">{!lang ? "Destek sistemi ile kullanıcılarınıza özel kanallarda yardım edin." : "To your users with the support system Help on private channels."}</span>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-600 rounded-xl">
                        <div className="flex flex-row p-4 gap-4">
                            <img className="w-10" src="/guard.svg" alt="koruma" />
                            <div className="flex flex-col text-start">
                                <span className="--logo font-semibold">{!lang ? "Koruma" : "Guard"}</span>
                                <span className="text-gray-400 font-extralight">{!lang ? "Sunucunuzu koruyun güçlü kalın." : "Protect your server stay strong."}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex flex-col sm:py-24 sm:px-24 2xl:px-32 mt-8 sm:mt-0">
                <div className="text-center">
                    <span className="text-gray-500 --montserrat">{!lang ? "T o p l u l u k" : "C O M M U N İ T Y"}</span>
                    <h2 className="text-4xl font-semibold --logo"><span
                        className="text-cyan-500">ViaApp{!lang ? "'in" : ""}</span><br />{!lang ? "İstatistikleri" : "Stats"}</h2>
                </div>

                <div className="flex justify-center m-4">
                    <div
                        className="flex flex-row border border-gray-600 rounded-lg gap-8 py-8 w-full sm:w-auto px-4 sm:px-32 text-center">
                        <div className="flex flex-col">
                            <span className="font-semibold --logo text-lg sm:text-3xl">{status ? status.totalGuild : "0"}</span>
                            <span className="text-xl text-gray-300">{!lang ? "Sunucu" : "Server"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold --logo text-lg sm:text-3xl">{status ? status.totalMember : "0"}</span>
                            <span className="text-xl text-gray-300">{!lang ? "Kullanıcı" : "Member"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold --logo text-lg sm:text-3xl">%99</span>
                            <span className="text-xl text-gray-300">Uptime</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-4">
                    <a href={login_url}
                        className="ring-1 ring-gray-700 hover:ring-gray-600 focus:ring-gray-600 rounded-xl px-2 py-1 duration-300 text-sm"><i
                            className="fa-brands fa-discord text-sm"></i> {!lang ? "Giriş yap" : "Log in"}</a>
                    <div>
                        <a href={invite_url}
                            className="duration-300 rounded-xl ring-1 ring-cyan-500 hover:ring-cyan-400 focus:ring-cyan-400 px-2 py-1 text-sm">{!lang ? "Sunucuna ekle" : "Add server"}</a>
                    </div>
                </div>
            </div>
            <Footer onLanguageChange={handleLanguageChange} />
        </div>
    )
}

export default HomePage

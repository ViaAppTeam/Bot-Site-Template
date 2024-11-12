import { useNavigate } from "react-router-dom";

const SystemNavbar = () => {
    const lang = localStorage.getItem("language");
    const navigate = useNavigate();

    const selected = window.location.pathname.split('/').pop();
    const parts = window.location.pathname.split('/dashboard/')[1].split('/');
    const guildId = parts[0];

    return (
        <div>
            <div className="sm:hidden text-center">
                <div className="grid grid-cols-2 px-4 gap-4">
                    <span onClick={() => navigate(`/dashboard/${guildId}`)} className={`cursor-pointer duration-200 ${selected === guildId ? "bg-gray-800" : "hover:bg-gray-800 ring-1 hover:ring-0 ring-white/5"} rounded-lg flex px-2 py-2`}><img className="w-6 mr-2" src="/home.svg" alt="home" /> {!lang ? "Kontrol Paneli" : "Control Panel"}</span>
                    <span onClick={() => navigate(`/dashboard/${guildId}/welcome`)} className={`cursor-pointer duration-200 ${selected === "welcome" ? "bg-gray-800" : "hover:bg-gray-800 ring-1 hover:ring-0 ring-white/5"} rounded-lg flex px-2 py-2`}><img className="w-6 mr-2" src="/hand-shake.svg" alt="hand shake" /> {!lang ? "Karşılama" : "Welcome"}</span>
                    <span onClick={() => navigate(`/dashboard/${guildId}/autorole`)} className={`cursor-pointer duration-200 ${selected === "autorole" ? "bg-gray-800" : "hover:bg-gray-800 ring-1 hover:ring-0 ring-white/5"} rounded-lg flex px-2 py-2`}><img className="w-6 mr-2" src="/award.svg" alt="award" /> {!lang ? "Otorol" : "Auto Role"}</span>
                    <span onClick={() => navigate(`/dashboard/${guildId}/ticket`)} className={`cursor-pointer duration-200 ${selected === "ticket" ? "bg-gray-800" : "hover:bg-gray-800 ring-1 hover:ring-0 ring-white/5"} rounded-lg flex px-2 py-2`}><img className="w-6 mr-2" src="/ticket-system.svg" alt="ticket" /> {!lang ? "Destek Sistemi" : "Support System"}</span>
                    <span onClick={() => navigate(`/dashboard/${guildId}/guard`)} className={`cursor-pointer duration-200 ${selected === "guard" ? "bg-gray-800" : "hover:bg-gray-800 ring-1 hover:ring-0 ring-white/5"} rounded-lg flex px-2 py-2`}><img className="w-6 mr-2" src="/shield.svg" alt="shield" /> {!lang ? "Koruma" : "Guard"}</span>
                </div>
            </div>
            <div className="hidden sm:block">
                <div className="flex flex-col gap-2 h-96 rounded-xl">
                    <span onClick={() => navigate(`/dashboard/${guildId}`)} className={`cursor-pointer duration-200 ${selected === guildId ? "bg-gray-800" : "hover:bg-gray-800 ring-1 hover:ring-0 ring-white/5"} rounded-lg flex px-8 py-2`}><img className="w-6 mr-2" src="/home.svg" alt="home" /> {!lang ? "Kontrol Paneli" : "Control Panel"}</span>
                    <span onClick={() => navigate(`/dashboard/${guildId}/welcome`)} className={`cursor-pointer duration-200 ${selected === "welcome" ? "bg-gray-800" : "hover:bg-gray-800 ring-1 hover:ring-0 ring-white/5"} rounded-lg flex px-8 py-2`}><img className="w-6 mr-2" src="/hand-shake.svg" alt="hand shake" /> {!lang ? "Karşılama" : "Welcome"}</span>
                    <span onClick={() => navigate(`/dashboard/${guildId}/autorole`)} className={`cursor-pointer duration-200 ${selected === "autorole" ? "bg-gray-800" : "hover:bg-gray-800 ring-1 hover:ring-0 ring-white/5"} rounded-lg flex px-8 py-2`}><img className="w-6 mr-2" src="/award.svg" alt="award" /> {!lang ? "Otorol" : "Auto Role"}</span>
                    <span onClick={() => navigate(`/dashboard/${guildId}/ticket`)} className={`cursor-pointer duration-200 ${selected === "ticket" ? "bg-gray-800" : "hover:bg-gray-800 ring-1 hover:ring-0 ring-white/5"} rounded-lg flex px-8 py-2`}><img className="w-6 mr-2" src="/ticket-system.svg" alt="ticket" /> {!lang ? "Destek Sistemi" : "Support System"}</span>
                    <span onClick={() => navigate(`/dashboard/${guildId}/guard`)} className={`cursor-pointer duration-200 ${selected === "guard" ? "bg-gray-800" : "hover:bg-gray-800 ring-1 hover:ring-0 ring-white/5"} rounded-lg flex px-8 py-2`}><img className="w-6 mr-2" src="/shield.svg" alt="shield" /> {!lang ? "Koruma" : "Guard"}</span>
                </div>
            </div>
        </div >
    )
}

export default SystemNavbar
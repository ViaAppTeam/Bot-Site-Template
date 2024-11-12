import { useNavigate } from 'react-router-dom';

const Home = () => {
  const lang = localStorage.getItem("language");
  const navigate = useNavigate();
  const parts = window.location.pathname.split('/dashboard/')[1].split('/');
  const guildId = parts[0];
  return (
    <div className='px-4 sm:px-0 sm:w-[30rem]'>
      <div>
        <span className="--kanit text-3xl">{!lang ? "Kontrol Paneli" : "Control Panel"}</span>
        <p className="text-gray-400">{!lang ? "Kontrol paneline hoşgeldiniz" : "Welcome to the control panel"}</p>
      </div>

      <div className="mt-8">
        <span className="--kanit text-2xl">{!lang ? "Sistemler" : "Systems"}</span>
        <div className="mt-2 grid lg:grid-cols-2 md:grid-cols-1 gap-4">
          <div onClick={() => navigate(`/dashboard/${guildId}/welcome`)} className="cursor-pointer duration-300 ring-1 ring-white/30 bg-[#1b1f25] hover:bg-[#272c33] shadow-md rounded-md px-4 py-4 flex">
            <img className="w-6 mr-2" src="/hand-shake.svg" alt="hand shake" /> {!lang ? "Karşılama" : "Welcome"}
          </div>
          <div onClick={() => navigate(`/dashboard/${guildId}/autorole`)} className="cursor-pointer duration-300 ring-1 ring-white/30 bg-[#1b1f25] hover:bg-[#272c33] shadow-md rounded-md px-4 py-4 flex">
            <img className="w-6 mr-2" src="/award.svg" alt="award" /> {!lang ? "Otorol" : "Auto Role"}
          </div>
          <div onClick={() => navigate(`/dashboard/${guildId}/ticket`)} className="cursor-pointer duration-300 ring-1 ring-white/30 bg-[#1b1f25] hover:bg-[#272c33] shadow-md rounded-md px-4 py-4 flex">
            <img className="w-6 mr-2" src="/ticket-system.svg" alt="ticket" /> {!lang ? "Destek Sistemi" : "Support System"}
          </div>
          <div onClick={() => navigate(`/dashboard/${guildId}/guard`)} className="cursor-pointer duration-300 ring-1 ring-white/30 bg-[#1b1f25] hover:bg-[#272c33] shadow-md rounded-md px-4 py-4 flex">
            <img className="w-6 mr-2" src="/shield.svg" alt="shield" /> {!lang ? "Koruma" : "Guard"}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
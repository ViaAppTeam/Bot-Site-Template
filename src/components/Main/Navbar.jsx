import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { support, login, navbar } from '../../lang/en.json'
import { login_url, invite_url } from '../../../config.json'

const Navbar = ({ lang }) => {
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState(lang);

  useEffect(() => {
    setCurrentLang(lang);
  }, [lang]);

  return (
    <div className="px-12 py-2 --montserrat">
      <div className="flex justify-between">
        <span onClick={() => navigate("/")} className="cursor-pointer  flex flex-row items-center">
          <img className="w-16 h-16" src="/logo.png" alt="viaapp logo" />
          <span className="text-lg --logo hidden sm:block">ViaApp</span>
        </span>

        <div className="flex gap-6 items-center">
          <span onClick={() => navigate("/commands")} className="cursor-pointer duration-300 text-gray-300 hover:text-gray-100 text-md hidden sm:block">{!lang ? "Komutlar" : "Commands"}</span>
          <a href="https://discord.gg/viaapp" target="_blank"
            className="duration-300 text-gray-300 hover:text-gray-100 text-md hidden sm:block">{!lang ? "Destek" : "Support"} <i
              className="fa-solid fa-arrow-up-right-from-square text-sm"></i></a>
        </div>

        <div className="flex gap-4 items-center">
          <a href={login_url}
            className="ring-1 ring-gray-700 hover:ring-gray-600 focus:ring-gray-600 rounded-xl px-2 py-1 duration-300 text-sm"><i
              className="fa-brands fa-discord text-sm"></i> {!lang ? "Giriş yap" : "Log in"}</a>
          <div>
            <a href={invite_url}
              className="duration-300 rounded-xl ring-1 ring-cyan-500 hover:ring-cyan-400 focus:ring-cyan-400 px-2 py-1 text-sm hidden sm:block">{!lang ? "Sunucuna ekle" : "Add server"}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
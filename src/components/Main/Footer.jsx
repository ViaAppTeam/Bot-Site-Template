import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { login_url } from '../../../config.json'

const Footer = ({ onLanguageChange }) => {
  const navigate = useNavigate();
  const [lang, setLang] = useState(localStorage.getItem('language') === 'english');

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;

    if (selectedLanguage === 'english') {
      localStorage.setItem('language', selectedLanguage);
    } else {
      localStorage.removeItem('language');
    }

    setLang(selectedLanguage === 'english');
    onLanguageChange(selectedLanguage === 'english');
  };

  return (
    <div className="w-full h-96 bg-g mt-8 sm:mt-0">
      <hr />
      <div className="py-12 px-32 flex justify-around">
        <div className="flex flex-col">
          <img className="w-16" src="/logo.png" alt="viaapp logo" />
          <span className="text-md text-gray-400">{!lang ? "ViaApp ile sunucunuzu" : "Revitalize your server"}<br />{!lang ? "yeniden şekillendirin!" : "with ViaApp!"}</span>

          <div className="mt-12 block sm:hidden">
            <span className="--montserrat font-medium">{!lang ? "Yasal" : "Legal"}</span>
            <div className="flex flex-col gap-1 mt-4">
              <span onClick={() => navigate("/privacy-policy")} className="cursor-pointer duration-300 text-gray-300 hover:text-gray-100">{!lang ? "Gizlilik politikası" : "Privacy policy"}</span>
            </div>
          </div>

          <select defaultValue={lang ? "english" : "turkey"} onChange={handleLanguageChange} className="mt-12 py-1 px-4 rounded-xl bg-gray-700 outline-none" name="language" id="language">
            <option value="turkey">Türkçe</option>
            <option value="english">English</option>
          </select>

          {/* <label className="switch mt-4">
            <span className="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g fill="#ffd43b">
                <circle r="5" cy="12" cx="12"></circle>
                <path
                  d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z">
                </path>
              </g>
            </svg></span>
            <span className="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z">
              </path>
            </svg></span>
            <input type="checkbox" className="input" />
            <span className="slider"></span>
          </label> */}

          <span className="hidden sm:block mt-12 text-gray-300">© 2024 ViaApp | <span className='bg-gradient-to-r from-cyan-500 to-blue-700 rounded-lg px-1'><a href="https://discord.com/users/996413007116640327" className=" hover:underline" target="_blank">Many</a> & <a href="https://lourity.xyz/" className=" hover:underline" target="_blank">Lourity</a></span>
          </span>
        </div>

        <div>
          <span className="--montserrat font-medium">{!lang ? "Bağlantılar" : "Links"}</span>
          <div className="flex flex-col gap-1 mt-4">
            <span onClick={() => navigate("/commands")} className="cursor-pointer duration-300 text-gray-300 hover:text-gray-100">{!lang ? "Komutlar" : "Commands"}</span>
            <a href={login_url} className="duration-300 text-gray-300 hover:text-gray-100">{!lang ? "Giriş yap" : "Log in"}</a>
            <a href="https://discord.gg/viaapp" target="_blank"
              className="duration-300 text-gray-300 hover:text-gray-100">{!lang ? "Destek sunucusu" : "Support server"} <i
                className="fa-solid fa-arrow-up-right-from-square text-sm"></i></a>
          </div>
        </div>

        <div className="hidden sm:block">
          <span className="--montserrat font-medium">{!lang ? "Yasal" : "Legal"}</span>
          <div className="flex flex-col gap-1 mt-4">
            <span onClick={() => navigate("/privacy-policy")} className="cursor-pointer duration-300 text-gray-300 hover:text-gray-100">{!lang ? "Gizlilik politikası" : "Privacy policy"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
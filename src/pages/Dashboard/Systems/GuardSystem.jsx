import { useState, useEffect } from 'react'
import { api_url } from '../../../../config.json';

const GuardSystem = () => {
  const lang = localStorage.getItem("language");

  const parts = window.location.pathname.split('/dashboard/')[1].split('/');
  const currentId = parts[0];

  const [SwearBarrier, setSwearBarrier] = useState(false);
  const [AdBlock, setAdBlock] = useState(false);

  const saveSwearSystem = async () => {
    try {
      const response = await fetch(`${api_url}/guard_set`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-api-key': '0-0Ad)dqIMDRkpLbk)0~[udLLpG2_4}Y]{ykVd!HYc-;)&H$$F'
        },
        body: JSON.stringify({ swearingProtection: true, guildID: currentId }),
      });

      if (response.ok) {
        setSwearBarrier(!SwearBarrier ? true : false)
      }
    } catch (error) {
      console.log("Küfür engel sistemi oluşturma hatası:", error);
    }
  }

  const saveAdSystem = async () => {
    try {
      const response = await fetch(`${api_url}/ad_set`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-api-key': '0-0Ad)dqIMDRkpLbk)0~[udLLpG2_4}Y]{ykVd!HYc-;)&H$$F'
        },
        body: JSON.stringify({ adProtection: true, guildID: currentId }),
      });

      if (response.ok) {
        setAdBlock(!AdBlock ? true : false)
      }
    } catch (error) {
      console.log("Reklam engel sistemi oluşturma hatası:", error);
    }
  }

  useEffect(() => {
    const fetchGuardSystem = async () => {
      try {
        const response = await fetch(`${api_url}/guard_datas/${currentId}`);
        const data = await response.json();

        if (data) {
          setSwearBarrier(data.swearingProtection);
          setAdBlock(data.adProtection);
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchGuardSystem();
  }, []);

  return (
    <div className='px-2 sm:px-0 sm:w-[30rem]'>
      <div>
        <span className="--kanit text-3xl">{!lang ? "Koruma" : "Guard"}</span>
        <p className="text-gray-400">{!lang ? "Akıllı koruma sistemi ile sunucunuzu güven altına alın" : "Secure your server with smart protection system"}</p>
      </div>

      <div className='mt-8'>
        <div>
          <span className="--kanit text-2xl">{!lang ? "Küfür Engel" : "Swearing Barrier"}</span>
          <p>{!lang ? "Sohbette kötü sözleri engeller" : "Blocks bad words in chat"}</p>
        </div>
        <div className='mt-4'>
          <button onClick={saveSwearSystem} className={`duration-200 ${!SwearBarrier ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"} ring-1 hover:ring-0 ring-white/5 px-8 py-1 rounded-md`}>{!SwearBarrier ? !lang ? "Aktifleştir" : "Activate" : !lang ? "Pasifleştir" : "Pacify"}</button>
        </div>
      </div>

      <div className='mt-8'>
        <div>
          <span className="--kanit text-2xl">{!lang ? "Reklam Engel" : "Ad Block"}</span>
          <p>{!lang ? "Sohbette reklam yapılmasını engeller" : "Blocks ads in chat"}</p>
        </div>
        <div className='mt-4 flex'>
          <button onClick={saveAdSystem} className={`duration-200 ${!AdBlock ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"} ring-1 hover:ring-0 ring-white/5 px-8 py-1 rounded-md`}>{!AdBlock ? !lang ? "Aktifleştir" : "Activate" : !lang ? "Pasifleştir" : "Pacify"}</button>
        </div>
      </div>
    </div>
  )
}

export default GuardSystem

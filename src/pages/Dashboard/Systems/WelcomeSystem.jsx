import { useState, useEffect } from 'react';
import { useGuilds } from '../../../context/GuildContext';
import { api_url } from '../../../../config.json';

const WelcomeSystem = () => {
    const lang = localStorage.getItem("language");
    const { guilds } = useGuilds();

    const parts = window.location.pathname.split('/dashboard/')[1].split('/');
    const currentId = parts[0];

    const guildDatas = guilds ? guilds?.added?.find(guild => guild.id === currentId) : "";

    const [WelcomeChannel, setWelcomeChannel] = useState('');
    const [Background, setBackground] = useState('');
    const [WelcomeMessage, setWelcomeMessage] = useState('');
    const [GoodbyeMessage, setGoodbyeMessage] = useState('');
    const [Send, setSend] = useState(false);
    const [System, setSystem] = useState(false);

    const saveWelcomeSystem = async (event) => {
        event.preventDefault();
        try {
            if (!WelcomeChannel) return setSend(true);
            if (Background && Background.length !== 0 && !Background.startsWith("https://")) return setSend(true), setBackground("https://");
            const requestBody = { kanal: WelcomeChannel, hosgeldin_mesaj: WelcomeMessage, gorusuruz_mesaj: GoodbyeMessage, image: Background, guildID: currentId };
            const response = await fetch(`${api_url}/hgbb_set`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'x-api-key': '0-0Ad)dqIMDRkpLbk)0~[udLLpG2_4}Y]{ykVd!HYc-;)&H$$F'
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                setSend(false);
                setSystem(true);
            }
        } catch (error) {
            console.log("Hoşgeldin sistemi oluşturma hatası:", error);
        }
    }

    const handleDeleteHgBb = async () => {
        try {
            const response = await fetch(`${api_url}/hgbb_delete/${currentId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setWelcomeChannel('');
                setBackground('');
                setWelcomeMessage('');
                setGoodbyeMessage('');
                setSystem(false);
            }
        } catch (error) {
            console.log("HgBb silme hatası:", error);
        }
    };

    useEffect(() => {
        const fetchHgBbSystem = async () => {
            try {
                const response = await fetch(`${api_url}/hgbb_system/${currentId}`);
                const data = await response.json();

                if (data && data.add_remove) {
                    setWelcomeChannel(data.add_remove.kanal);
                    setBackground(data.add_remove.image);
                    setWelcomeMessage(data.add_remove.hosgeldin_mesaj);
                    setGoodbyeMessage(data.add_remove.gorusuruz_mesaj);
                    if (data.add_remove.kanal) {
                        setSystem(true);
                    }
                }
            } catch (error) {
                console.log("Veri hatası:", error);
            }
        };
        fetchHgBbSystem();
    }, []);

    return (
        <div className='px-2 sm:px-0 sm:w-[30rem]'>
            <div>
                <span className="--kanit text-3xl">{!lang ? "Karşılama & Veda" : "Welcome & Farewell"}</span>
                <p className="text-gray-400">{!lang ? "Üye katılımı veya ayrılması durumunda uygulanacak işlemleri yönetin" : "Manage actions to be taken in case of member joining or leaving"} <span className='text-gray-400'>(* = {!lang ? "isteğe bağlı" : "optional"})</span></p>
            </div>

            <div className='mt-8'>
                <div className='mt-4'>
                    <select defaultValue={WelcomeChannel} onChange={(event) => setWelcomeChannel(event.target.value)} className='w-full py-2 px-2 rounded-lg bg-[#1b1f25] outline-none ring-1 ring-white/30' name="welcome_channel" id="welcome_channel">
                        <option value="" disabled selected={!WelcomeChannel}>{!lang ? "Kanal seçin" : "Select channel"}</option>
                        {guildDatas && (
                            guildDatas.channels.map((channel) => (
                                <option key={channel.id} value={channel.id} selected={WelcomeChannel === channel.id}># {channel.name}</option>
                            ))
                        )}
                    </select>
                    {Send && !WelcomeChannel && <span className='text-red-500 text-sm'>{!lang ? 'Kanal seçmek zorunludur.' : 'Please select a channel.'}</span>}
                </div>
                <div className='mt-4'>
                    <input disabled={!WelcomeChannel} value={Background} onChange={(event) => setBackground(event.target.value)} className='duration-200 w-full py-2 px-2 rounded-lg bg-[#1b1f25] outline-none ring-1 ring-white/30 focus:ring-white/50' type="text" placeholder={`${!lang ? "Arka plan resmi bağlantısı" : "Background image link"}*`} />
                </div>
                {Send && Background === 'https://' && <span className='text-red-500 text-sm'>{!lang ? 'Resim url\'si \'https://\' ile başlamalıdır.' : 'Image URL must start with \'https://\'.'}</span>}

                <div className='mt-4'>
                    <input disabled={!WelcomeChannel} value={WelcomeMessage} onChange={(event) => setWelcomeMessage(event.target.value)} className='duration-200 w-full py-2 px-2 rounded-lg bg-[#1b1f25] outline-none ring-1 ring-white/30 focus:ring-white/50' type="text" placeholder={`${!lang ? "Hoşgeldin mesajı" : "Welcome message"}*`} />
                </div>

                <div className='mt-4'>
                    <input disabled={!WelcomeChannel} value={GoodbyeMessage} onChange={(event) => setGoodbyeMessage(event.target.value)} className='duration-200 w-full py-2 px-2 rounded-lg bg-[#1b1f25] outline-none ring-1 ring-white/30 focus:ring-white/50' type="text" placeholder={`${!lang ? "Görüşürüz mesajı" : "Goodbye message"}*`} />
                </div>

                <div className='mt-4 flex gap-2'>
                    {!System && (
                        <button onClick={saveWelcomeSystem} className='duration-200 bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 ring-1 hover:ring-0 ring-white/5 px-8 py-1 rounded-md'>{!lang ? "Kaydet" : "Save"}</button>
                    )}
                    {WelcomeChannel && System && (
                        <button onClick={handleDeleteHgBb} className='duration-200 bg-red-500 hover:bg-red-600 ring-1 hover:ring-0 ring-white/5 px-8 py-1 rounded-md'>{!lang ? "Sıfırla" : "Reset"}</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WelcomeSystem;

import { useState, useEffect } from 'react'
import { useGuilds } from '../../../context/GuildContext';
import { api_url } from '../../../../config.json';

const AutoroleSystem = () => {
    const lang = localStorage.getItem("language");
    const { guilds } = useGuilds();

    const parts = window.location.pathname.split('/dashboard/')[1].split('/');
    const currentId = parts[0];

    const guildDatas = guilds ? guilds?.added?.find(guild => guild.id === currentId) : "";

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const [AutoRole, setAutoRole] = useState('');
    const [AutoRoleLog, setAutoRoleLog] = useState('');
    const [Message, setMessage] = useState('');
    const [Send, setSend] = useState(false);
    const [System, setSystem] = useState(false);
    const [Click, setClick] = useState(false);

    const saveAutoroleSystem = async (event) => {
        event.preventDefault();
        try {
            if (!AutoRole) return setSend(true);
            if (!AutoRoleLog) return setSend(true);
            if (Message && Message.length === 0) return setSend(true);
            const requestBody = { rolID: AutoRole, logID: AutoRoleLog, message: Message, guildID: currentId };
            const response = await fetch(`${api_url}/autorole_set`, {
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
                setClick(false);
            }
        } catch (error) {
            console.log("Otorol sistemi oluşturma hatası:", error);
        }
    }

    const handleDeleteAutorole = async () => {
        try {
            const response = await fetch(`${api_url}/autorole_delete/${currentId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setAutoRole('');
                setAutoRoleLog('');
                setMessage('');
                setSystem(false);
                setClick(false);
            }
        } catch (error) {
            console.log("Otorol silme hatası:", error);
        }
    };

    useEffect(() => {
        const fetchAutoroleSystem = async () => {
            try {
                const response = await fetch(`${api_url}/autorole_system/${currentId}`);
                const data = await response.json();

                if (data && data.autorole) {
                    setAutoRole(data.autorole.rolID);
                    setAutoRoleLog(data.autorole.logID);
                    setMessage(data.autorole.message);
                    if (data.autorole.logID) {
                        setSystem(true);
                    }
                }
            } catch (error) {
                console.log("Veri hatası:", error);
            }
        };
        fetchAutoroleSystem();
    }, []);

    return (
        <div className='px-2 sm:px-0 sm:w-[30rem]'>
            <div>
                <span className="--kanit text-3xl">{!lang ? "Otorol" : "Auto Role"}</span>
                <p className="text-gray-400">{!lang ? "Sunucunuza bir üye katıldığında belirlenen rol verilir" : "When a member joins your server, the designated role is given"}<br /><span className='text-gray-400'>(* = {!lang ? "isteğe bağlı" : "optional"})</span></p>
            </div>

            <div className='mt-8'>
                <div>
                    <select defaultValue={AutoRole} onChange={(event) => setAutoRole(event.target.value)} className='w-full py-2 px-2 rounded-lg bg-[#1b1f25] outline-none ring-1 ring-white/30' name="autorole" id="autorole">
                        <option value="" disabled selected={!AutoRole}>{!lang ? "Rol seçin" : "Select role"}</option>
                        {guildDatas && (
                            guildDatas.roles.map((role) => (
                                <option key={role.id} value={role.id} selected={AutoRole === role.id}>@ {role.name}</option>
                            ))
                        )}
                    </select>
                    {Send && !AutoRole && <span className='text-red-500 text-sm'>{!lang ? 'Rol seçmek zorunludur.' : 'Please select a role.'}</span>}
                </div>
                <div className='mt-4'>
                    <select defaultValue={AutoRoleLog} onChange={(event) => setAutoRoleLog(event.target.value)} className='w-full py-2 px-2 rounded-lg bg-[#1b1f25] outline-none ring-1 ring-white/30' name="select_channel" id="select_channel">
                        <option value="" disabled selected={!AutoRoleLog}>{!lang ? "Kanal seçin" : "Select channel"}</option>
                        {guildDatas && (
                            guildDatas.channels.map((channel) => (
                                <option key={channel.id} value={channel.id} selected={AutoRoleLog === channel.id}># {channel.name}</option>
                            ))
                        )}
                    </select>
                    {Send && !AutoRoleLog && <span className='text-red-500 text-sm'>{!lang ? 'Kanal seçmek zorunludur.' : 'Please select a channel.'}</span>}
                </div>
                <div className='mt-4'>
                    <input disabled={!AutoRole && !AutoRoleLog} value={Message} onChange={(event) => setMessage(event.target.value)} className='duration-200 w-full py-2 px-2 rounded-lg bg-[#1b1f25] outline-none ring-1 ring-white/30 focus:ring-white/50' type="text" placeholder={`${!lang ? "Otorol mesajı girin" : "Enter Autorol message"}*`} />
                    <div className='flex gap-2 mt-2 items-center'>
                        <span className='--montserrat'>{!lang ? "Opsiyonlar" : "Options"} :</span>
                        <button onClick={() => { copyToClipboard('{user}'); setClick(true); }} className='duration-200 rounded-lg bg-[#1b1f25] hover:bg-gray-800 px-4 py-1 text-gray-300 ring-1 ring-[#262a31]'>{Click ? <img className='duration-300 w-8 h-6' src="/copied.svg" alt="copied" /> : '{user}'}</button>
                    </div>
                </div>
                <div className='mt-4 flex gap-2'>
                    {!System && (
                        <button onClick={saveAutoroleSystem} className='duration-200 bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 ring-1 hover:ring-0 ring-white/5 px-8 py-1 rounded-md'>{!lang ? "Kaydet" : "Save"}</button>
                    )}
                    {AutoRole && AutoRoleLog && System && (
                        <button onClick={handleDeleteAutorole} className='duration-200 bg-red-500 hover:bg-red-600 ring-1 hover:ring-0 ring-white/5 px-8 py-1 rounded-md'>{!lang ? "Sıfırla" : "Reset"}</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AutoroleSystem

import { useState, useEffect } from 'react';
import { useGuilds } from '../../../context/GuildContext';
import { api_url } from '../../../../config.json';

const TicketSystem = () => {
  const lang = localStorage.getItem("language");
  const { guilds } = useGuilds();

  const parts = window.location.pathname.split('/dashboard/')[1].split('/');
  const guildId = parts[0];

  const getGuildName = (guilds, guildId) => {
    if (guilds) {
      const guild = guilds.find(g => g.id === guildId);
      return guild ? guild.name : null;
    }
  };
  const guildName = getGuildName(guilds.added, guildId);

  const [currentTime, setCurrentTime] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      setCurrentTime(formattedTime);
    };

    updateClock();
    const intervalId = setInterval(updateClock, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const guildDatas = guilds ? guilds?.added?.find(guild => guild.id === guildId) : "";

  const [TicketStaffRole, setTicketStaffRole] = useState('');
  const [TicketLogChannel, setTicketLogChannel] = useState('');
  const [TicketCategory, setTicketCategory] = useState('');
  const [TicketChannel, setTicketChannel] = useState('');
  const [TicketMessage, setTicketMessage] = useState('');
  const [Send, setSend] = useState(false);
  const [System, setSystem] = useState(false);
  const [MessageSystem, setMessageSystem] = useState(false);
  const [Click, setClick] = useState(false);

  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Button, setButton] = useState('');
  const [ButtonColor, setButtonColor] = useState('Primary');


  const saveTicketSystem = async (event) => {
    event.preventDefault();
    try {
      if (!TicketStaffRole) return setSend(true);
      if (!TicketLogChannel) return setSend(true);
      if (!TicketCategory) return setSend(true);
      if (!TicketChannel) return setSend(true);

      const requestBody = {
        rolID: TicketStaffRole, logID: TicketLogChannel, categoryID: TicketCategory, channelID: TicketChannel,
        title: Title, description: Description, button: Button, buttonColor: ButtonColor, guildID: guildId
      };
      const response = await fetch(`${api_url}/ticket_set`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-api-key': '0-0Ad)dqIMDRkpLbk)0~[udLLpG2_4}Y]{ykVd!HYc-;)&H$$F'
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 500) {
        return setSend('500')
      }

      if (response.status === 404) {
        return setSend('404')
      }

      if (response.ok) {
        setSend(false);
        setSystem(true);
        setClick(false);
      }
    } catch (error) {
      console.log("Ticket sistemi oluşturma hatası:", error);
    }
  }

  const saveTicketMessage = async (event) => {
    event.preventDefault();
    try {
      if (!TicketMessage) return setSend('notext');
      if (TicketMessage.trim().length === 0) return setSend('text');

      const requestBody = { ticketMessage: TicketMessage, guildID: guildId };
      const response = await fetch(`${api_url}/ticket_set`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setSend(false);
        setMessageSystem(true);
        setClick(false);
      }
    } catch (error) {
      console.log("Ticket mesaj sistemi oluşturma hatası:", error);
    }
  }

  const deleteTicketMessage = async () => {
    try {
      const response = await fetch(`${api_url}/ticket_message_delete/${guildId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTicketMessage('');
        setMessageSystem(false);
        setClick(false);
      }
    } catch (error) {
      console.log("Ticket mesaj silme hatası:", error);
    }
  }

  const handleDeleteTicket = async () => {
    try {
      const response = await fetch(`${api_url}/ticket_delete/${guildId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTicketStaffRole('');
        setTicketLogChannel('');
        setTicketCategory('');
        setTicketChannel('');
        setButton('');
        setTitle('');
        setDescription('');
        setButtonColor('Primary');
        setTicketMessage('');
        setMessageSystem(false);
        setSystem(false);
        setClick(false);
      }
    } catch (error) {
      console.log("Ticket silme hatası:", error);
    }
  };


  useEffect(() => {
    const fetchTicketSystem = async () => {
      try {
        const response = await fetch(`${api_url}/ticket_system/${guildId}`);
        const data = await response.json();

        if (data && data.ticketConfig) {
          setTicketStaffRole(data.ticketConfig.role);
          setTicketLogChannel(data.ticketConfig.logChannel);
          setTicketCategory(data.ticketConfig.category);
          setTicketChannel(data.ticketConfig.channel);

          setTitle(data.ticketConfig.ticketTitle);
          setDescription(data.ticketConfig.ticketDescription);
          setButton(data.ticketConfig.buttonText);
          setButtonColor(data.ticketConfig.buttonColor);
          if (data.ticketConfig.logChannel) {
            setSystem(true);
          }
          if (data.ticketConfig.ticketMessage) {
            setTicketMessage(data.ticketConfig.ticketMessage);
            setMessageSystem(true);
          }
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchTicketSystem();
  }, []);

  return (
    <div className='px-2 sm:px-0 sm:w-[30rem]'>
      <div>
        <span className="--kanit text-3xl">{!lang ? "Destek" : "Support"}</span>
        <p className="text-gray-400">{!lang ? "Üyelerinize özel kanallarda kesintisiz destek sunun" : "Offer uninterrupted support to your members on private channels"}<br /><span className='text-gray-400'>(* = {!lang ? "isteğe bağlı" : "optional"})</span></p>
      </div>

      <div className='mt-8'>
        <div className='mt-4'>
          <select defaultValue={TicketStaffRole} onChange={(event) => setTicketStaffRole(event.target.value)} className='w-72 sm:w-full py-2 px-2 rounded-lg bg-[#1b1f25] outline-none ring-1 ring-white/30' name="role" id="role">
            <option value="" disabled selected={!TicketStaffRole}>{!lang ? "Yetkili rolü seçin" : "Choose a staff role"}</option>
            {guildDatas && (
              guildDatas.roles.map((role) => (
                <option key={role.id} value={role.id} selected={TicketStaffRole === role.id}>@ {role.name}</option>
              ))
            )}
          </select>
          {Send && !TicketStaffRole && <span className='text-red-500 text-sm ml-2'>{!lang ? 'Yetkili rolü seçmek zorunludur.' : 'Please select a staff role.'}</span>}
        </div>
        <div className='mt-4'>
          <select defaultValue={TicketLogChannel} onChange={(event) => setTicketLogChannel(event.target.value)} className='w-72 sm:w-full py-2 px-2 rounded-lg bg-[#1b1f25] outline-none ring-1 ring-white/30' name="log" id="log">
            <option value="" disabled selected={!TicketLogChannel}>{!lang ? "Log kanalı seçin" : "Select log channel"}</option>
            {guildDatas && (
              guildDatas.channels.map((channel) => (
                <option key={channel.id} value={channel.id} selected={TicketLogChannel === channel.id}># {channel.name}</option>
              ))
            )}
          </select>
          {Send && !TicketLogChannel && <span className='text-red-500 text-sm ml-2'>{!lang ? 'Log kanalı seçmek zorunludur.' : 'Please select a log channel.'}</span>}
        </div>
        <div className='mt-4'>
          <select defaultValue={TicketCategory} onChange={(event) => setTicketCategory(event.target.value)} className='w-72 sm:w-full py-2 px-2 rounded-lg bg-[#1b1f25] outline-none ring-1 ring-white/30' name="category" id="category">
            <option value="" disabled selected={!TicketCategory}>{!lang ? "Kategori seçin" : "Select category"}*</option>
            {guildDatas && (
              guildDatas.categorys.map((category) => (
                <option key={category.id} value={category.id} selected={TicketCategory === category.id}>{category.name}</option>
              ))
            )}
          </select>
          {Send && !TicketCategory && <span className='text-red-500 text-sm ml-2'>{!lang ? 'Kategori seçmek zorunludur.' : 'Please select a category.'}</span>}
        </div>

        <div className='mt-4 bg-gray bg-gray-800 w-72 sm:w-full h-80 sm:h-96 p-4 rounded-xl'>
          <div className='flex items-center'>
            <img className='w-8 rounded-full' src="/logo.png" alt="viaapp logo" />
            <input defaultValue={Title} onChange={(event) => setTitle(event.target.value)} type='text' className='duration-200 py-1 px-2 w-32 sm:w-56 rounded-lg bg-[#1b1f25] outline-none ring-1 ring-white/30 focus:ring-white/50' placeholder={!lang ? `Ticket | ${guildName || "Sunucu adı"}` : `Ticket | ${guildName || "Server name"}`} />
          </div>
          <div className='flex items-center'>
            <div className='flex flex-col gap-2 mt-1'>
              <input defaultValue={Description} onChange={(event) => setDescription(event.target.value)} className='duration-200 py-2 px-2 w-44 sm:w-64 rounded-lg bg-[#1b1f25] outline-none ring-1 ring-white/30 focus:ring-white/50' type="text" placeholder={`${!lang ? "Embed açıklaması" : "Embed description"}`} />
            </div>
            <img className='sm:ml-24 w-16' src="/logo.png" alt="viaapp logo" />
          </div>
          <div>
            <img className='mt-8' src="/viaap-banner.png" alt="" />
          </div>
          <div className='flex items-center mt-2'>
            <img className='w-6 rounded-full' src="/logo.png" alt="viaapp logo" />
            <span className='text-xs'>ViaApp • {!lang ? "bugün saat" : "today time"} {currentTime}</span>
          </div>
          <hr className='mt-2' />
          <div className='mt-2 flex gap-4 items-center'>
            <div>
              <input defaultValue={Button} onChange={(event) => setButton(event.target.value)} className={`button-input duration-500 w-32 sm:w-48 rounded-md ${ButtonColor === "Primary" ? "bg-blue-500" : ButtonColor === "Success" ? "bg-green-500" : ButtonColor === "Secondary" ? "bg-gray-500" : ButtonColor === "Danger" ? "bg-red-500" : "bg-blue-500"} py-1 px-2 ring-1 ring-white/5 outline-none`} type="text" placeholder={`${!lang ? "Buton ismi" : "Button name"}*`} />
            </div>
            <div>
              <span onClick={() => setButtonColor("Primary")} className={`rounded-full duration-300 bg-blue-500 px-2 sm:px-4 mr-2 ${ButtonColor === "Primary" && "border"}`}><span className='invisible'>L</span></span>
              <span onClick={() => setButtonColor("Success")} className={`rounded-full duration-300 bg-green-500 px-2 sm:px-4 mr-2 ${ButtonColor === "Success" && "border"}`}><span className='invisible'>L</span></span>
              <span onClick={() => setButtonColor("Secondary")} className={`rounded-full duration-300 bg-gray-500 px-2 sm:px-4 mr-2 ${ButtonColor === "Secondary" && "border"}`}><span className='invisible'>L</span></span>
              <span onClick={() => setButtonColor("Danger")} className={`rounded-full duration-300 bg-red-500 px-2 sm:px-4 ${ButtonColor === "Danger" && "border"}`}><span className='invisible'>L</span></span>
            </div>
          </div>
        </div>

        <div className='mt-4 items-center gap-2'>
          <div className='flex flex-col'>
            <select onChange={(event) => setTicketChannel(event.target.value)} className='sm:w-56 py-2 px-2 rounded-lg bg-[#1b1f25] outline-none ring-1 ring-white/30' name="channel" id="channel">
              <option value="" disabled selected={!TicketChannel}>{!lang ? "Kanal seçin" : "Select channel"}</option>
              {guildDatas && (
                guildDatas.channels.map((channel) => (
                  <option key={channel.id} value={channel.id} selected={TicketChannel === channel.id}># {channel.name}</option>
                ))
              )}
            </select>
            {Send && !TicketChannel && <span className='text-red-500 text-sm ml-2'>{!lang ? 'Kanal seçmek zorunludur.' : 'Please select a channel.'}</span>}
          </div>

          <div className='mt-2'>
            {!System && (
              <button onClick={saveTicketSystem} className='duration-200 bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 ring-1 hover:ring-0 ring-white/5 px-8 py-1 rounded-md'>{!lang ? "Kaydet" : "Save"}</button>
            )}
            {TicketStaffRole && TicketLogChannel && TicketCategory && System && (
              <button onClick={handleDeleteTicket} className='duration-200 bg-red-500 hover:bg-red-600 ring-1 hover:ring-0 ring-white/5 px-8 py-1 rounded-md'>{!lang ? "Sıfırla" : "Reset"}</button>
            )}
          </div>
          {Send === '500' && <span className='text-red-500 text-sm'>{!lang ? 'Sistemsel bir hata oluştu, tekrar deneyin.' : 'A system error occurred, try again.'}</span>}
          {Send === '404' && <span className='text-red-500 text-sm'>{!lang ? 'Sunucu veya kanal bulunamadı, tekrar deneyin.' : 'Server or channel not found, try again.'}</span>}
        </div>

        <div className='mt-8'>
          <div>
            <span className="--kanit text-2xl">{!lang ? "Destek Mesajı" : "Support Message"}</span>
            <p>{!lang ? "Destek mesajını özelleştirebilirsin" : "You can customize the support message"}</p>
          </div>

          <div className='mt-4 flex flex-col'>
            <span className='text-sm ml-1'>{!lang ? "Normal mesaj: Merhaba" : "Normal message: Hello"} <span className='cursor-pointer bg-[#383d6b] hover:bg-[#5865f2] rounded-md px-1'>@User</span>, {!lang ? "lütfen sorununuzu bize bildirin" : "please let us know your issue"}.</span>
            <input disabled={!TicketStaffRole && !TicketLogChannel && !TicketCategory} value={TicketMessage} onChange={(event) => setTicketMessage(event.target.value)} className='mt-1 duration-200 w-72 sm:w-full py-2 px-2 rounded-lg bg-[#1b1f25] outline-none ring-1 ring-white/30 focus:ring-white/50' type="text" placeholder={`${!lang ? "Destek mesajı girin" : "Enter support message"}*`} />

            <div className='flex gap-2 mt-2 items-center'>
              <span className='--montserrat'>{!lang ? "Opsiyonlar" : "Options"} :</span>
              <button onClick={() => { copyToClipboard('{user}'); setClick(true); }} className='duration-200 rounded-lg bg-[#1b1f25] hover:bg-gray-800 px-4 py-1 text-gray-300 ring-1 ring-[#262a31]'>{Click ? <img className='duration-300 w-8 h-6' src="/copied.svg" alt="copied" /> : '{user}'}</button>
            </div>
          </div>

          <div className='mt-4'>
            {!MessageSystem && (
              <button disabled={!TicketStaffRole && !TicketLogChannel && !TicketCategory} onClick={saveTicketMessage} className='duration-200 bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 ring-1 hover:ring-0 ring-white/5 px-8 py-1 rounded-md'>{!lang ? "Kaydet" : "Save"}</button>
            )}
            {TicketMessage && MessageSystem && (
              <button onClick={deleteTicketMessage} className='duration-200 bg-red-500 hover:bg-red-600 ring-1 hover:ring-0 ring-white/5 px-8 py-1 rounded-md'>{!lang ? "Sıfırla" : "Reset"}</button>
            )}
          </div>
          {Send === 'notext' && !TicketMessage && <span className='text-red-500 text-sm'>{!lang ? 'Metin girmek zorunludur.' : 'Please write a message.'}</span>}
          {Send === 'text' && <span className='text-red-500 text-sm'>{!lang ? ' Geçerli bir metin giriniz.' : 'Please enter valid text.'}</span>}
        </div>
      </div>

    </div>
  )
}

export default TicketSystem

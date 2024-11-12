import { useState, useRef, useEffect } from 'react'
import Navbar from '../../components/Main/Navbar'
import Footer from '../../components/Main/Footer'
import { commands } from '../../lang/en.json'
import { Helmet } from 'react-helmet'

const Commands = () => {
  const [lang, setLang] = useState(localStorage.getItem('language') ? true : false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
  };

  const commandList = [
    { tr_name: "/yardım", en_name: "/help", tr_description: "ViaApp hakkında bilgi verir veya komutlarını listeler.", en_description: "Provides information about ViaApp or lists its commands.", category: "all" },
    { tr_name: "/ban", en_name: "/ban", tr_description: "Belirtilen kullanıcıyı yasaklar.", en_description: "Bans the specified user.", category: "moderation" },
    { tr_name: "/unban", en_name: "/unban", tr_description: "Belirtilen kullanıcının sunucu yasaklamasını kaldırır.", en_description: "Removes the server ban of the specified user.", category: "moderation" },
    { tr_name: "/kick", en_name: "/kick", tr_description: "Belirtilen kullanıcıyı sunucudan atar.", en_description: "Kick the specified user from the server.", category: "moderation" },
    { tr_name: "/kanal açıklama", en_name: "/channel description", tr_description: "Kanal açıklamasını belirtildiği şekilde değiştirir.", en_description: "Changes the channel description as specified.", category: "moderation" },
    { tr_name: "/nuke", en_name: "/nuke", tr_description: "Belirtilen kanalı klonlar ve eskisini siler.", en_description: "Clones the specified channel and deletes the old one.", category: "moderation" },
    { tr_name: "/otorol ayarla", en_name: "/autorole set", tr_description: "Otorol sistemini ayarlayın.", en_description: "Adjust the autorole system.", category: "moderation" },
    { tr_name: "/otorol sıfırla", en_name: "/autorole reset", tr_description: "Otorol sistemini sıfırlar.", en_description: "Resets the autorole system.", category: "moderation" },
    { tr_name: "/otorol ayarlar", en_name: "/autorole settings", tr_description: "Otorol ayarlayını gösterir.", en_description: "Shows the autorole setting.", category: "moderation" },
    { tr_name: "/rol-ekle", en_name: "/addrole", tr_description: "Belirtilen rolü belirtilen kullanıcıya verir.", en_description: "Grants the specified role to the specified user.", category: "moderation" },
    { tr_name: "/rol-kaldır", en_name: "/removerole", tr_description: "Belirtilen rolü belirtilen kullanıcıdan alır.", en_description: "Gets the specified role from the specified user.", category: "moderation" },
    { tr_name: "/temizle", en_name: "/purge", tr_description: "Mesajları temizlemek için bu komutu kullanın.", en_description: "Use this command to clear messages.", category: "moderation" },
    { tr_name: "/hoşgeldin-görüşürüz ayarla", en_name: "/welcome-goodbye set", tr_description: "Karşılayıcı sistemini kurar.", en_description: "Sets up the greeter system.", category: "systems" },
    { tr_name: "/hoşgeldin-görüşürüz sıfırla", en_name: "/welcome-goodbye reset", tr_description: "Yapılan ayarlamaları sıfırlar.", en_description: "Resets any adjustments made.", category: "systems" },
    { tr_name: "/koruma küfür", en_name: "/security swearing", tr_description: "Küfür Engel sistemini ayarlar.", en_description: "Sets the Swearing Block system.", category: "guard" },
    { tr_name: "/koruma reklam", en_name: "/security ad", tr_description: "Reklam Engel sistemini ayarlar.", en_description: "Sets the Ad Block system.", category: "guard" },
    { tr_name: "/ticket kur", en_name: "/ticket set", tr_description: "Ticket sistemini sunucunuza kurar.", en_description: "Installs the ticket system on your server.", category: "ticket" },
    { tr_name: "/ticket ayarlar", en_name: "/ticket settings", tr_description: "Ticket sistemi ayarları.", en_description: "Ticket system settings.", category: "ticket" },
    { tr_name: "/ticket sıfırla", en_name: "/ticket reset", tr_description: "Ticket sistem ayarlarını sıfırlar.", en_description: "Reset ticket system settings.", category: "ticket" },

  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCommands, setFilteredCommands] = useState(commandList);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = commandList.filter(command => command.tr_name.toLowerCase().includes(term) || command.en_name.toLowerCase().includes(term));
    setFilteredCommands(filtered);
  };

  const handleCategoryFilter = (category) => {
    if (category === 'all') {
      setFilteredCommands(commandList);
    } else {
      const filteredByCategory = commandList.filter(command => command.category === category);
      setFilteredCommands(filteredByCategory);
    }
    setSelectedCategory(category);
  };

  const commandRef = useRef(null);
  useEffect(() => {
    commandRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  return (
    <div>
      <Helmet>
        <title>{!lang ? "Komutlar" : "Commands"}</title>
      </Helmet>
      <div ref={commandRef}></div>
      <Navbar lang={lang} />
      <div className="mb-12">
        <div className='flex flex-col items-center mt-12'>
          <h2 className='text-3xl'>{!lang ? 'Komutlar' : commands.commands}</h2>
          <p className='text-gray-400'>{!lang ? "ViaApp'in komutlarını buradan inceleyebilirsin" : commands.commands_desc}</p>
        </div>

        <div className='sm:flex justify-center grid grid-cols-3 gap-4 p-4 text-center'>
          <span onClick={() => handleCategoryFilter('all')} className={`duration-300 cursor-pointer ${selectedCategory === 'all' ? 'bg-cyan-500' : ''} rounded-lg p-2`}>{!lang ? 'Hepsi' : commands.category_all}</span>
          <span onClick={() => handleCategoryFilter('moderation')} className={`duration-300 cursor-pointer ${selectedCategory === 'moderation' ? 'bg-cyan-500' : ''} rounded-lg p-2`}>{!lang ? 'Moderasyon' : commands.category_moderation}</span>
          <span onClick={() => handleCategoryFilter('systems')} className={`duration-300 cursor-pointer ${selectedCategory === 'systems' ? 'bg-cyan-500' : ''} rounded-lg p-2`}>{!lang ? 'Sistemler' : commands.category_systems}</span>
          <span onClick={() => handleCategoryFilter('guard')} className={`duration-300 cursor-pointer ${selectedCategory === 'guard' ? 'bg-cyan-500' : ''} rounded-lg p-2`}>{!lang ? 'Koruma' : commands.category_guard}</span>
          <span onClick={() => handleCategoryFilter('ticket')} className={`duration-300 cursor-pointer ${selectedCategory === 'ticket' ? 'bg-cyan-500' : ''} rounded-lg p-2`}>{!lang ? 'Destek' : commands.category_ticket}</span>
        </div>

        <div className='flex justify-center px-12 mb-4'>
          <input value={searchTerm} onChange={handleSearch} className='outline-none rounded-lg bg-gray-700 px-4 py-2.5 w-[32rem] focus:ring-2 focus:ring-cyan-500' type="search" placeholder={!lang ? '🔍 Komut ara' : commands.command_search} />
        </div>

        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 px-4 sm:px-12'>
          {filteredCommands.map((command, index) => (
            <div key={++index} className='rounded-md ring-1 ring-cyan-500 p-4 mx-auto w-full'>
              <span className='text-gray-300'>{!lang ? command.tr_name : command.en_name}</span>
              <p className='mt-2 text-gray-400'>{!lang ? command.tr_description : command.en_description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer onLanguageChange={handleLanguageChange} />
    </div>
  )
}

export default Commands;

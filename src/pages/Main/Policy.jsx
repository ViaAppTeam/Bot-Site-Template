import Footer from "../../components/Main/Footer"
import Navbar from "../../components/Main/Navbar"
import { useEffect, useRef, useState } from 'react'
import { policy } from '../../lang/en.json'
import { Helmet } from 'react-helmet'

const Policy = () => {
    const [lang, setLang] = useState(localStorage.getItem('language') ? true : false);

    const handleLanguageChange = (newLang) => {
        setLang(newLang);
    };

    const gizlilikPolitikasiRef = useRef(null);
    useEffect(() => {
        gizlilikPolitikasiRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }, []);

    return (
        <div>
            <Helmet>
                <title>{!lang ? "Gizlilik Politikası" : "Privacy Policy"}</title>
            </Helmet>
            <div ref={gizlilikPolitikasiRef}></div>
            <Navbar lang={lang} />
            <div className="flex flex-col justify-center p-12 text-center">
                <div>
                    <h2 className="text-3xl">{!lang ? 'Gizlilik Politikası' : policy.privacy_policy}</h2>
                    <p className="text-gray-400">{!lang ? 'Son güncelleme tarihi:' : policy.privacy_policy_date} <span className="text-gray-300 bg-gray-700 rounded-lg px-2">15.03.2024</span></p>
                </div>

                <div className="mt-8 text-gray-500 text-left mx-auto max-w-2xl">
                    <p>{!lang ? 'Bu gizlilik politikası, ViaApp botumuzun kullanıcı gizliliği ile ilgili nasıl bilgi topladığı, kullandığı, ilettiği ve sakladığı konusunda size bilgi verir.' : policy.privacy_desc}</p>

                    <h2 className="text-xl font-semibold mt-4">{!lang ? 'Toplanan Bilgiler' : policy.collected}</h2>
                    <p>{!lang ? 'ViaApp Bot, Discord üzerindeki sunucularda işlevselliği sağlamak için gerekli olan minimal bilgileri toplayabilir. Bu bilgiler şunları içerebilir: Kullanıcı Kimlikleri, Sunucu Kimlikleri, Mesaj İçeriği (Bot tarafından işlenen komutlar için)' : policy.collected_desc}</p>

                    <h2 className="text-xl font-semibold mt-4">{!lang ? 'Bilgi Kullanımı' : policy.info}</h2>
                    <p>{!lang ? "Toplanan bilgiler, ViaApp Bot'un sunduğu hizmetleri etkinleştirmek, geliştirmek ve özelleştirmek için kullanılacaktır. Bu bilgiler, kullanıcılar ve sunucular arasındaki etkileşimleri yönetmek amacıyla işlenecektir." : policy.info_desc}</p>

                    <h2 className="text-xl font-semibold mt-4">{!lang ? 'Bilgi Paylaşımı' : policy.info_sharing}</h2>
                    <p>{!lang ? "ViaApp Bot, topladığı bilgileri hiçbir koşulda üçüncü taraflarla paylaşmaz. Kullanıcı ve sunucu verileri, yalnızca ViaApp Bot'un işlevselliğini gerçekleştirmek için kullanılır." : policy.info_sharing_desc}</p>

                    <h2 className="text-xl font-semibold mt-4">{!lang ? 'Güvenlik' : policy.security}</h2>
                    <p>{!lang ? 'ViaApp Bot, toplanan bilgileri korumak için endüstri standardındaki güvenlik önlemlerini alır. Ancak, internet üzerinden iletilen bilgilerin tam güvenliğini garanti edemez.' : policy.security_desc}</p>

                    <h2 className="text-xl font-semibold mt-4">{!lang ? 'Çerezler (Cookies)' : policy.cookies}</h2>
                    <p>{!lang ? 'ViaApp Bot, kullanıcı deneyimini geliştirmek için çerezleri kullanabilir. Ancak, bu çerezler kişisel bilgileri toplamaz veya depolamaz.' : policy.cookies_desc}</p>

                    <h2 className="text-xl font-semibold mt-4">{!lang ? 'Değişiklikler' : policy.updates}</h2>
                    <p>{!lang ? 'Gizlilik politikamız zaman zaman güncellenebilir. Güncellenmiş politikaları görmek için lütfen sık sık kontrol edin.' : policy.updates_desc}</p>
                </div>
            </div>
            <Footer onLanguageChange={handleLanguageChange} />
        </div>
    )
}

export default Policy
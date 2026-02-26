import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, User, MessageCircle } from 'lucide-react';
import { useListings } from '../context/ListingsContext';

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { listings } = useListings();
    const listing = listings.find(item => item.id === parseInt(id));

    if (!listing) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">İlan Bulunamadı</h2>
                <p className="text-slate-500 mb-6">Aradığınız ilan yayından kaldırılmış veya mevcut değil.</p>
                <button onClick={() => navigate('/listeler')} className="bg-soft-green-500 text-white px-6 py-2 rounded-lg font-medium">
                    İlanlara Dön
                </button>
            </div>
        );
    }

    const handleSendMessage = () => {
        alert(`${listing.owner.name} kullanıcısına mesaj gönderme ekranına yönlendiriliyorsunuz...`);
    };

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-slate-500 hover:text-navy-blue-800 font-medium mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Geri Dön
                </button>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-slate-100">
                        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold rounded-full text-navy-blue-800 shadow-sm">
                            {listing.category === 'Physical Item' ? 'Eşya' : 'Hizmet'}
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-6 lg:p-10 flex flex-col">
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">{listing.title}</h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6 border-b border-slate-100 pb-6">
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1.5 text-soft-green-500" />
                                {listing.neighborhood}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1.5 text-soft-green-500" />
                                {listing.date} eklendi
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-slate-800 mb-3">Açıklama</h3>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                {listing.description}
                            </p>
                        </div>

                        <div className="mt-auto">
                            <div className="bg-slate-50 p-4 rounded-xl flex items-center mb-6">
                                <div className="w-12 h-12 bg-soft-green-100 rounded-full flex items-center justify-center text-soft-green-700 mr-4">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-800">{listing.owner.name}</div>
                                    <div className="text-xs text-slate-500">{listing.owner.joined} yılından beri üye</div>
                                </div>
                            </div>

                            <button
                                onClick={handleSendMessage}
                                className="w-full bg-navy-blue-800 hover:bg-navy-blue-900 text-white font-semibold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center"
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Mesaj Gönder
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;

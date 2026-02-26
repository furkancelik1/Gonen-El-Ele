import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useListings } from '../context/ListingsContext';

const Home = () => {
    const { listings } = useListings();
    const featuredListings = listings.slice(0, 4);

    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-navy-blue-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                        Gönen'de Dayanışma Başlasın
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mb-10">
                        Kullanmadığın eşyaları paylaş, gönüllü hizmet ver ve ihtiyaç sahiplerine destek ol. Gönen el ele daha güzel.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link to="/ilan-ver" className="bg-soft-green-500 hover:bg-soft-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-transform hover:scale-105 shadow-lg">
                            İlan Ver
                        </Link>
                        <Link to="/listeler" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/30 px-8 py-3 rounded-full text-lg font-semibold transition-colors">
                            İlanları İncele
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Listings Section */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-navy-blue-900 mb-2">Güncel İlanlar</h2>
                            <p className="text-slate-600">Gönen'deki en son paylaşımlar ve gönüllü hizmetler</p>
                        </div>
                        <Link to="/listeler" className="text-soft-green-600 hover:text-soft-green-700 font-medium flex items-center group">
                            Tümünü Gör
                            <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredListings.map(listing => (
                            <Link to={`/ilanlars/${listing.id}`} key={listing.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer flex flex-col">
                                <div className="h-48 overflow-hidden relative bg-slate-100">
                                    <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold rounded-full text-navy-blue-800 shadow-sm">
                                        {listing.category === 'Physical Item' ? 'Eşya' : 'Hizmet'}
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2">{listing.title}</h3>
                                    <div className="flex items-center text-slate-500 text-sm mt-auto mb-2">
                                        <MapPin className="w-4 h-4 mr-1 text-soft-green-500" />
                                        {listing.neighborhood}
                                    </div>
                                    <div className="text-xs text-slate-400">{listing.date} eklendi</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

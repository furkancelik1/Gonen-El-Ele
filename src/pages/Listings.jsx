import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, MapPin, Search } from 'lucide-react';
import { useListings } from '../context/ListingsContext';
import { neighborhoods } from '../data/mockData';

const Listings = () => {
    const { listings } = useListings();
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const filteredListings = listings.filter(listing => {
        const matchNeighborhood = selectedNeighborhood ? listing.neighborhood === selectedNeighborhood : true;
        const matchCategory = selectedCategory ? listing.category === selectedCategory : true;
        return matchNeighborhood && matchCategory;
    });

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Filter Bar */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-navy-blue-900 mb-6">Tüm İlanlar</h1>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex items-center text-slate-500 font-medium">
                            <Filter className="w-5 h-5 mr-2 text-soft-green-600" />
                            Filtrele:
                        </div>

                        <div className="w-full md:w-auto flex-1">
                            <select
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-soft-green-500 focus:border-transparent transition-all"
                                value={selectedNeighborhood}
                                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                            >
                                <option value="">Tüm Mahalleler</option>
                                {neighborhoods.map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full md:w-auto flex-1">
                            <select
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-soft-green-500 focus:border-transparent transition-all"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Tüm Kategoriler</option>
                                <option value="Physical Item">Eşya</option>
                                <option value="Voluntary Service">Hizmet</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Listings Grid */}
                {filteredListings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredListings.map(listing => (
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
                                    <div className="text-xs text-slate-400">
                                        {listing.date}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">Sonuç Bulunamadı</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            Seçtiğiniz mahalle veya kategoriye ait aktif ilan bulunmamaktadır. Lütfen farklı filtre seçeneklerini deneyin.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Listings;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Package, MessageSquare, Trash2, Edit } from 'lucide-react';
import { useListings } from '../context/ListingsContext';

const mockUser = {
    name: 'Ayşe Yılmaz',
    email: 'ayse.y@email.com',
    neighborhood: 'Kurtuluş Mahallesi',
    joined: '2023'
};

const mockMessages = [
    { id: 1, from: 'Fatma K.', subject: 'Bebek Arabası hakkında', date: '2 saat önce', text: 'Merhaba, bebek arabası hala duruyor mu? Yarın gelip alabilirim.', read: false },
    { id: 2, from: 'Ali V.', subject: 'Bebek Arabası hakkında', date: '3 saat önce', text: 'Tekerleklerde bir aşınma var mı acaba?', read: true },
];

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('listings');
    const { listings, removeListing } = useListings();

    // Filter listings owned by the current user
    const myListings = listings.filter(item => item.owner?.name?.includes('Ayşe'));

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-navy-blue-900 mb-8">Profilim</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Profile Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center">
                            <div className="w-24 h-24 mx-auto bg-soft-green-100 text-soft-green-700 rounded-full flex items-center justify-center mb-4">
                                <User className="w-10 h-10" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 mb-1">{mockUser.name}</h2>
                            <p className="text-sm text-slate-500 mb-4">{mockUser.email}</p>

                            <div className="space-y-3 text-sm text-slate-600 border-t border-slate-100 pt-4">
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2 text-soft-green-500" />
                                    {mockUser.neighborhood}
                                </div>
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2 text-soft-green-500" />
                                    {mockUser.joined} yılından beri üye
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <button
                                onClick={() => setActiveTab('listings')}
                                className={`w-full flex items-center px-6 py-4 text-left transition-colors border-l-4 ${activeTab === 'listings' ? 'border-soft-green-500 bg-slate-50 text-navy-blue-900 font-semibold' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}
                            >
                                <Package className="w-5 h-5 mr-3" />
                                Aktif İlanlarım
                                <span className="ml-auto text-xs bg-soft-green-100 text-soft-green-700 px-2 py-0.5 rounded-full font-bold">{myListings.length}</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('messages')}
                                className={`w-full flex items-center px-6 py-4 text-left transition-colors border-l-4 ${activeTab === 'messages' ? 'border-soft-green-500 bg-slate-50 text-navy-blue-900 font-semibold' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}
                            >
                                <MessageSquare className="w-5 h-5 mr-3" />
                                Gelen Mesajlar
                                <span className="ml-auto bg-soft-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">1</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-3">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[500px]">

                            {activeTab === 'listings' && (
                                <div>
                                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                        <h3 className="text-xl font-bold text-slate-800">Aktif İlanlarım ({myListings.length})</h3>
                                        <Link to="/ilan-ver" className="text-soft-green-600 hover:text-soft-green-700 font-medium text-sm border border-soft-green-200 rounded-lg px-4 py-2 hover:bg-soft-green-50 transition-colors">
                                            + Yeni İlan
                                        </Link>
                                    </div>
                                    <div className="p-6">
                                        {myListings.length > 0 ? (
                                            <div className="space-y-4">
                                                {myListings.map(listing => (
                                                    <div key={listing.id} className="flex flex-col sm:flex-row items-center border border-slate-200 rounded-xl p-4 gap-4 hover:bg-slate-50 transition-colors">
                                                        <img src={listing.image} alt={listing.title} className="w-24 h-24 object-cover rounded-lg bg-slate-100" />
                                                        <div className="flex-1 text-center sm:text-left">
                                                            <h4 className="font-bold text-slate-800 mb-1">{listing.title}</h4>
                                                            <p className="text-sm text-slate-500 mb-2">{listing.date} eklendi</p>
                                                            <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full">{listing.category === 'Physical Item' ? 'Eşya' : 'Hizmet'}</span>
                                                        </div>
                                                        <div className="flex space-x-2 w-full sm:w-auto mt-4 sm:mt-0">
                                                            <button className="flex-1 sm:flex-none text-slate-500 hover:text-navy-blue-600 p-2 border border-slate-200 rounded-lg flex items-center justify-center transition-colors">
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => removeListing(listing.id)}
                                                                className="flex-1 sm:flex-none text-red-400 hover:text-red-500 p-2 border border-slate-200 rounded-lg flex items-center justify-center transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                                <p className="text-slate-500 mb-4">Henüz aktif bir ilanınız bulunmuyor.</p>
                                                <Link to="/ilan-ver" className="bg-soft-green-500 text-white px-6 py-2 rounded-full font-medium hover:bg-soft-green-600 transition-colors inline-block">
                                                    İlk İlanını Ver
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'messages' && (
                                <div>
                                    <div className="p-6 border-b border-slate-100">
                                        <h3 className="text-xl font-bold text-slate-800">Gelen Mesajlar</h3>
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        {mockMessages.map(msg => (
                                            <div key={msg.id} className={`p-6 cursor-pointer hover:bg-slate-50 transition-colors ${!msg.read ? 'bg-soft-green-50/50' : ''}`}>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className={`text-slate-800 ${!msg.read ? 'font-bold' : 'font-medium'}`}>{msg.from}</h4>
                                                        <p className="text-sm font-medium text-navy-blue-900">{msg.subject}</p>
                                                    </div>
                                                    <span className="text-xs text-slate-400">{msg.date}</span>
                                                </div>
                                                <p className="text-sm text-slate-600 line-clamp-2">{msg.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

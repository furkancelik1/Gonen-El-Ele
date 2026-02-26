import { Link } from 'react-router-dom';
import { HeartHandshake } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <HeartHandshake className="w-8 h-8 text-soft-green-600" />
                        <span className="text-xl font-bold text-navy-blue-900">GönenPaylaş</span>
                    </Link>
                    <div className="hidden md:flex flex-1 justify-center space-x-8">
                        <Link to="/" className="text-slate-600 hover:text-navy-blue-800 font-medium transition-colors">Ana Sayfa</Link>
                        <Link to="/listeler" className="text-slate-600 hover:text-navy-blue-800 font-medium transition-colors">İlanlar</Link>
                        <Link to="/panel" className="text-slate-600 hover:text-navy-blue-800 font-medium transition-colors">Profilim</Link>
                    </div>
                    <div>
                        <Link to="/ilan-ver" className="bg-soft-green-500 hover:bg-soft-green-600 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-sm cursor-pointer inline-flex items-center">
                            İlan Ver
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

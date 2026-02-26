import { HeartHandshake } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-navy-blue-950 text-white/80 py-8 border-t border-white/10 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <HeartHandshake className="w-6 h-6 text-soft-green-400" />
                    <span className="text-lg font-bold text-white">GönenPaylaş</span>
                </div>
                <p className="text-sm">
                    Gönen halkının dayanışma ve yardımlaşma platformu. &copy; {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
};

export default Footer;

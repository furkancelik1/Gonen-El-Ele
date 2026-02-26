import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, ChevronLeft, Upload, Package, HandHeart } from 'lucide-react';
import { neighborhoods } from '../data/mockData';
import { useListings } from '../context/ListingsContext';

const STEPS = ['Temel Bilgiler', 'Konum & Fotoğraf', 'Önizleme'];

const initialForm = {
    title: '',
    description: '',
    category: '',
    neighborhood: '',
    imagePreview: null,
};

const StepIndicator = ({ currentStep }) => (
    <div className="flex items-center justify-center mb-10">
        {STEPS.map((step, index) => (
            <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${index < currentStep
                            ? 'bg-soft-green-500 border-soft-green-500 text-white'
                            : index === currentStep
                                ? 'bg-navy-blue-900 border-navy-blue-900 text-white'
                                : 'bg-white border-slate-300 text-slate-400'
                            }`}
                    >
                        {index < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${index === currentStep ? 'text-navy-blue-900' : 'text-slate-400'}`}>
                        {step}
                    </span>
                </div>
                {index < STEPS.length - 1 && (
                    <div className={`w-20 md:w-32 h-0.5 mb-5 mx-2 transition-all ${index < currentStep ? 'bg-soft-green-500' : 'bg-slate-200'}`} />
                )}
            </div>
        ))}
    </div>
);

// Step 1
const Step1 = ({ form, setForm }) => (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">İlan Türünü Seçin</h2>
            <p className="text-slate-500 text-sm">Paylaşmak istediğiniz şeyin türünü belirleyin.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
                { value: 'Physical Item', label: 'Eşya', subtitle: 'Kıyafet, kitap, mobilya vb.', icon: Package },
                { value: 'Voluntary Service', label: 'Hizmet', subtitle: 'Ders verme, yardım vb.', icon: HandHeart },
            ].map(({ value, label, subtitle, icon: Icon }) => (
                <button
                    key={value}
                    onClick={() => setForm({ ...form, category: value })}
                    className={`p-6 rounded-xl border-2 text-left transition-all flex items-start gap-4 ${form.category === value
                        ? 'border-soft-green-500 bg-soft-green-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                >
                    <div className={`p-3 rounded-lg ${form.category === value ? 'bg-soft-green-100 text-soft-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="font-bold text-slate-800 text-lg">{label}</div>
                        <div className="text-sm text-slate-500">{subtitle}</div>
                    </div>
                </button>
            ))}
        </div>

        <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">İlan Başlığı *</label>
            <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Örn: Az kullanılmış kışlık bot"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-soft-green-500 focus:border-transparent transition-all text-lg"
            />
        </div>

        <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Açıklama *</label>
            <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="İlan hakkında detaylı bilgi verin..."
                rows={4}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-soft-green-500 focus:border-transparent transition-all resize-none"
            />
        </div>
    </div>
);

// Step 2
const Step2 = ({ form, setForm }) => {
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setForm({ ...form, imagePreview: url });
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">Konum ve Fotoğraf</h2>
                <p className="text-slate-500 text-sm">İlanınızın mahallesini seçin ve isteğe bağlı fotoğraf ekleyin.</p>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Mahalle *</label>
                <select
                    value={form.neighborhood}
                    onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-soft-green-500 focus:border-transparent transition-all bg-white text-lg"
                >
                    <option value="">Mahalle seçin...</option>
                    {neighborhoods.map(n => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Fotoğraf Ekle (İsteğe Bağlı)</label>
                {form.imagePreview ? (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                        <img src={form.imagePreview} alt="Önizleme" className="w-full h-56 object-cover" />
                        <button
                            onClick={() => setForm({ ...form, imagePreview: null })}
                            className="absolute top-3 right-3 bg-red-500/90 text-white text-xs px-3 py-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                            Kaldır
                        </button>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                        <Upload className="w-10 h-10 text-slate-400 mb-3" />
                        <span className="text-slate-500 font-medium">Fotoğraf yüklemek için tıklayın</span>
                        <span className="text-xs text-slate-400 mt-1">JPG, PNG veya WEBP formatı</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                )}
            </div>
        </div>
    );
};

// Step 3 - Preview
const Step3 = ({ form }) => (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">İlanı Onayla</h2>
            <p className="text-slate-500 text-sm">Yayınlamadan önce ilanınızı kontrol edin.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            {form.imagePreview && (
                <img src={form.imagePreview} alt="İlan görseli" className="w-full h-56 object-cover" />
            )}
            {!form.imagePreview && (
                <div className="w-full h-32 bg-slate-100 flex items-center justify-center text-slate-400">
                    <Package className="w-10 h-10" />
                </div>
            )}
            <div className="p-6 space-y-3">
                <span className="text-xs font-semibold bg-soft-green-100 text-soft-green-700 px-3 py-1 rounded-full">
                    {form.category === 'Physical Item' ? 'Eşya' : 'Hizmet'}
                </span>
                <h3 className="text-2xl font-bold text-slate-800 mt-2">{form.title || 'Başlık girilmedi'}</h3>
                <p className="text-slate-600">{form.description || 'Açıklama girilmedi'}</p>
                <div className="flex items-center text-slate-500 text-sm pt-2">
                    <span className="font-medium text-navy-blue-900">📍 {form.neighborhood || 'Mahalle seçilmedi'}</span>
                </div>
            </div>
        </div>
    </div>
);

const CreateListing = () => {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [submittedTitle, setSubmittedTitle] = useState('');
    const navigate = useNavigate();
    const { addListing } = useListings();

    const canProceed = () => {
        if (step === 0) return form.category && form.title.trim() && form.description.trim();
        if (step === 1) return form.neighborhood;
        return true;
    };

    const handleNext = () => {
        if (step < STEPS.length - 1) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleSubmit = () => {
        addListing(form);
        setSubmittedTitle(form.title);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
                <div className="w-24 h-24 bg-soft-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-14 h-14 text-soft-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-3">İlanınız Yayınlandı!</h2>
                <p className="text-slate-500 max-w-sm mb-8">
                    "{submittedTitle}" ilanınız Gönen topluluğuyla paylaşıldı. Teşekkür ederiz!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => navigate('/listeler')} className="bg-soft-green-500 hover:bg-soft-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                        İlanlara Git
                    </button>
                    <button onClick={() => { setSubmitted(false); setForm(initialForm); setStep(0); }} className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-full font-semibold transition-colors">
                        Yeni İlan Ver
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-10">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-navy-blue-900 mb-8 text-center">İlan Ver</h1>

                <StepIndicator currentStep={step} />

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
                    {step === 0 && <Step1 form={form} setForm={setForm} />}
                    {step === 1 && <Step2 form={form} setForm={setForm} />}
                    {step === 2 && <Step3 form={form} />}

                    <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100">
                        <button
                            onClick={handleBack}
                            disabled={step === 0}
                            className="flex items-center text-slate-600 hover:text-navy-blue-800 font-medium px-5 py-3 rounded-xl border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            Geri
                        </button>

                        {step < STEPS.length - 1 ? (
                            <button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className="flex items-center bg-navy-blue-900 hover:bg-navy-blue-950 text-white font-semibold px-7 py-3 rounded-xl shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Devam Et
                                <ChevronRight className="w-5 h-5 ml-1" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="flex items-center bg-soft-green-500 hover:bg-soft-green-600 text-white font-semibold px-7 py-3 rounded-xl shadow-md transition-colors"
                            >
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Yayınla
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateListing;

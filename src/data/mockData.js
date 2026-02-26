export const categories = [
    'Physical Item',
    'Voluntary Service'
];

export const neighborhoods = [
    'Kurtuluş',
    'Gündoğdu',
    'Plevne',
    'Akçaova',
    'Malkoç',
    'Reşadiye'
];

export const mockListings = [
    {
        id: 1,
        title: 'Az Kullanılmış Bebek Arabası',
        category: 'Physical Item',
        neighborhood: 'Kurtuluş',
        image: '/images/bebek_arabasi.png',
        date: '2 saat önce',
        description: 'Çocuğumuz büyüdüğü için artık kullanmadığımız bebek arabasını ihtiyaç sahibi bir aileye vermek istiyoruz. Tekerlekleri sağlam, katlanabilir model.',
        owner: { name: 'Ayşe Y.', joined: '2023' }
    },
    {
        id: 2,
        title: 'Lise Matematik Özel Ders',
        category: 'Voluntary Service',
        neighborhood: 'Gündoğdu',
        image: '/images/matematik_ders.png',
        date: '1 gün önce',
        description: 'Hafta sonları lise öğrencilerine ücretsiz matematik konu anlatımı yapabilirim. Üniversite öğrencisiyim.',
        owner: { name: 'Mehmet K.', joined: '2024' }
    },
    {
        id: 3,
        title: 'Temiz Kışlık Mont (L Beden)',
        category: 'Physical Item',
        neighborhood: 'Plevne',
        image: '/images/kislik_mont.png',
        date: '3 gün önce',
        description: 'Kalın, rüzgar geçirmez kışlık erkek kısa mont. Çok az giyildi, yıkanmış ve temiz.',
        owner: { name: 'Hasan C.', joined: '2023' }
    },
    {
        id: 4,
        title: 'Yaşlılar İçin Market Alışverişi Desteği',
        category: 'Voluntary Service',
        neighborhood: 'Akçaova',
        image: '/images/market_yardim.png',
        date: '4 gün önce',
        description: 'Mahallemizdeki yaşlı ve dışarı çıkamayan büyüklerimiz için haftada 2 gün market ve fırın alışverişi yapabilirim.',
        owner: { name: 'Zeynep B.', joined: '2024' }
    },
    {
        id: 5,
        title: 'Ahşap Çalışma Masası',
        category: 'Physical Item',
        neighborhood: 'Malkoç',
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=400',
        date: '1 hafta önce',
        description: '120x60 ölçülerinde ahşap çalışma masası. Çekmecesi sorunsuz çalışıyor.',
        owner: { name: 'Ali V.', joined: '2023' }
    },
    {
        id: 6,
        title: 'İngilizce Pratik ve Sohbet',
        category: 'Voluntary Service',
        neighborhood: 'Reşadiye',
        image: '/images/ingilizce_pratik.png',
        date: '1 hafta önce',
        description: 'Online veya yüz yüze, İngilizce speaking pratiği yapmak isteyen lise ve üniversite öğrencilerine yardımcı olabilirim.',
        owner: { name: 'Selin T.', joined: '2024' }
    }
];

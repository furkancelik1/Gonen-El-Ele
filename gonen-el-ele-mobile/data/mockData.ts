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
        image: require('../assets/images/bebek_arabasi.png'),
        date: '2 saat önce',
        description: 'Çocuğumuz büyüdüğü için artık kullanmadığımız bebek arabasını ihtiyaç sahibi bir aileye vermek istiyoruz. Tekerlekleri sağlam, katlanabilir model.',
        owner: { name: 'Ayşe Y.', joined: '2023' }
    },
    {
        id: 2,
        title: 'Lise Matematik Özel Ders',
        category: 'Voluntary Service',
        neighborhood: 'Gündoğdu',
        image: require('../assets/images/lesson.png'),
        date: '1 gün önce',
        description: 'Hafta sonları lise öğrencilerine ücretsiz matematik konu anlatımı yapabilirim. Üniversite öğrencisiyim.',
        owner: { name: 'Mehmet K.', joined: '2024' }
    },
    {
        id: 3,
        title: 'Temiz Kışlık Mont (L Beden)',
        category: 'Physical Item',
        neighborhood: 'Plevne',
        image: require('../assets/images/mont.png'),
        date: '3 gün önce',
        description: 'Kalın, rüzgar geçirmez kışlık erkek kısa mont. Çok az giyildi, yıkanmış ve temiz.',
        owner: { name: 'Hasan C.', joined: '2023' }
    },
    {
        id: 4,
        title: 'Yaşlılar İçin Market Alışverişi Desteği',
        category: 'Voluntary Service',
        neighborhood: 'Akçaova',
        image: require('../assets/images/market.png'),
        date: '4 gün önce',
        description: 'Mahallemizdeki yaşlı ve dışarı çıkamayan büyüklerimiz için haftada 2 gün market ve fırın alışverişi yapabilirim.',
        owner: { name: 'Zeynep B.', joined: '2024' }
    },
    {
        id: 5,
        title: 'Ahşap Çalışma Masası',
        category: 'Physical Item',
        neighborhood: 'Malkoç',
        image: require('../assets/images/masa.png'),
        date: '1 hafta önce',
        description: '120x60 ölçülerinde ahşap çalışma masası. Çekmecesi sorunsuz çalışıyor.',
        owner: { name: 'Ali V.', joined: '2023' }
    },
    {
        id: 6,
        title: 'İngilizce Pratik ve Sohbet',
        category: 'Voluntary Service',
        neighborhood: 'Reşadiye',
        image: require('../assets/images/sohbet.png'),
        date: '1 hafta önce',
        description: 'Online veya yüz yüze, İngilizce speaking pratiği yapmak isteyen lise ve üniversite öğrencilerine yardımcı olabilirim.',
        owner: { name: 'Selin T.', joined: '2024' }
    },
    {
        id: 7,
        title: 'Çocuk Bisikleti (5-8 Yaş)',
        category: 'Physical Item',
        neighborhood: 'Kurtuluş',
        image: require('../assets/images/bebek_arabasi.png'),
        date: '2 gün önce',
        description: 'Kızımın büyüdüğü için artık kullanamadığı, yan tekerlekleri dahil 16 inçlik çocuk bisikleti. Lastikleri tam, boyası yerinde.',
        owner: { name: 'Fatma Ş.', joined: '2023' }
    },
    {
        id: 8,
        title: 'Hasta / Yaşlı Bakım Desteği',
        category: 'Voluntary Service',
        neighborhood: 'Plevne',
        image: require('../assets/images/market_yardim.png'),
        date: '3 gün önce',
        description: 'Sağlık meslek yüksekokulu mezunuyum. Hafta içi öğleden sonraları evde bakıma muhtaç yaşlı ya da hasta bireylere ücretsiz destek verebilirim.',
        owner: { name: 'Elif D.', joined: '2024' }
    },
    {
        id: 9,
        title: 'Temiz Buzdolabı (Küçük Boy)',
        category: 'Physical Item',
        neighborhood: 'Gündoğdu',
        image: require('../assets/images/masa.png'),
        date: '5 gün önce',
        description: 'Taşınma nedeniyle ihtiyaç fazlası olan 80 litrelik tek kapılı mini buzdolabı. Soğutması sorunsuz çalışıyor, alacak olan kendisi taşımalı.',
        owner: { name: 'Tarık M.', joined: '2022' }
    },
    {
        id: 10,
        title: 'Boyacılık / Küçük Tamirat Yardımı',
        category: 'Voluntary Service',
        neighborhood: 'Malkoç',
        image: require('../assets/images/kislik_mont.png'),
        date: '6 gün önce',
        description: 'Emekli usta olarak küçük çaplı duvar boyama ve tadilat işlerinde ihtiyaç sahibi komşulara ücretsiz yardım edebilirim. Malzeme karşı taraftan.',
        owner: { name: 'Recep A.', joined: '2021' }
    },
    {
        id: 11,
        title: 'Kitap Seti (İlkokul 3-4. Sınıf)',
        category: 'Physical Item',
        neighborhood: 'Akçaova',
        image: require('../assets/images/lesson.png'),
        date: '1 hafta önce',
        description: 'Çocuğumdan kalan temiz durumda hikaye ve etkinlik kitapları. Toplam 12 kitap, ihtiyaç sahibi öğrenciye bütün olarak verilecek.',
        owner: { name: 'Nurcan K.', joined: '2023' }
    },
    {
        id: 12,
        title: 'Bilgisayar / Telefon Teknik Destek',
        category: 'Voluntary Service',
        neighborhood: 'Reşadiye',
        image: require('../assets/images/ingilizce_pratik.png'),
        date: '2 hafta önce',
        description: 'Bilgisayar mühendisiyim. Yaşlı veya teknolojiye uzak komşularımıza telefon, tablet ve bilgisayar kullanımı konusunda ücretsiz yardım edebilirim.',
        owner: { name: 'Burak Y.', joined: '2024' }
    }
];

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockListings } from '../data/mockData';
import { Listing } from '../types';

const STORAGE_KEY = 'gonenPaylas_listings';

// AsyncStorage'dan yüklenen ilanların require() kaynaklı resimlerini geri yükler.
// JSON.stringify/parse require() sonuçlarını koruyamaz, bu yama ile düzeltilir.
const MOCK_IMAGE_MAP: Record<number, any> = {
    1: require('../assets/images/bebek_arabasi.png'),
    2: require('../assets/images/lesson.png'),
    3: require('../assets/images/mont.png'),
    4: require('../assets/images/market.png'),
    5: require('../assets/images/masa.png'),
    6: require('../assets/images/sohbet.png'),
    7: require('../assets/images/bebek_arabasi.png'),
    8: require('../assets/images/market_yardim.png'),
    9: require('../assets/images/masa.png'),
    10: require('../assets/images/kislik_mont.png'),
    11: require('../assets/images/lesson.png'),
    12: require('../assets/images/ingilizce_pratik.png'),
};

function restoreImages(items: Listing[]): Listing[] {
    return items.map((item) =>
        MOCK_IMAGE_MAP[item.id] ? { ...item, image: MOCK_IMAGE_MAP[item.id] } : item
    );
}

interface ListingsContextType {
    listings: Listing[];
    addListing: (listing: any) => Promise<Listing>;
    removeListing: (id: number) => Promise<void>;
    isLoading: boolean;
}

export const ListingsContext = createContext<ListingsContextType | null>(null);

export function ListingsProvider({ children }: { children: React.ReactNode }) {
    const [listings, setListings] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadListings = async () => {
            try {
                const stored = await AsyncStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed: Listing[] = JSON.parse(stored);
                    setListings(restoreImages(parsed));
                } else {
                    setListings(mockListings);
                }
            } catch {
                // Okuma veya parse hatası — mockData ile güvenli fallback
                setListings(mockListings);
            } finally {
                setIsLoading(false);
            }
        };

        loadListings();
    }, []);

    const addListing = async (newListing: any): Promise<Listing> => {
        const listing: Listing = {
            ...newListing,
            id: Date.now(),
            date: 'Az önce',
            owner: { name: 'Ayşe Y.', joined: '2023' },
            image: newListing.imagePreview ?? null,
        };
        const updated = [listing, ...listings];
        setListings(updated);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
            // Kaydetme hatası — state güncellendi, persistence başarısız
        }
        return listing;
    };

    const removeListing = async (id: number): Promise<void> => {
        const updated = listings.filter((l) => l.id !== id);
        setListings(updated);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
            // Kaydetme hatası — state güncellendi, persistence başarısız
        }
    };

    return (
        <ListingsContext.Provider value={{ listings, addListing, removeListing, isLoading }}>
            {children}
        </ListingsContext.Provider>
    );
}

export function useListings() {
    const ctx = useContext(ListingsContext);
    if (!ctx) throw new Error('useListings must be used within ListingsProvider');
    return ctx;
}

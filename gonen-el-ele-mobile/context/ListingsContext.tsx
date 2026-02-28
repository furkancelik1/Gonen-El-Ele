import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockListings } from '../data/mockData';

export interface Listing {
    id: number;
    title: string;
    category: string;
    neighborhood: string;
    image: string;
    date: string;
    description: string;
    owner?: any;
}

interface ListingsContextType {
    listings: Listing[];
    addListing: (listing: any) => Promise<any>;
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
                const stored = await AsyncStorage.getItem('gonenPaylas_listings');
                if (stored) {
                    let parsed = JSON.parse(stored);

                    // Geçmişten AsyncStorage'da kalan ölü linkleri veya public/images stringlerini düzeltme yaması
                    parsed = parsed.map((item: any) => {
                        if (item.id === 1) item.image = require('../assets/images/bebek_arabasi.png');
                        if (item.id === 2) item.image = require('../assets/images/lesson.png');
                        if (item.id === 3) item.image = require('../assets/images/mont.png');
                        if (item.id === 4) item.image = require('../assets/images/market.png');
                        if (item.id === 5) item.image = require('../assets/images/masa.png');
                        if (item.id === 6) item.image = require('../assets/images/sohbet.png');
                        return item;
                    });

                    setListings(parsed);
                } else {
                    setListings(mockListings);
                }
            } catch (error) {
                console.error('Error loading listings', error);
                setListings(mockListings);
            } finally {
                setIsLoading(false);
            }
        };

        loadListings();
    }, []);

    const addListing = async (newListing: any) => {
        const listing: Listing = {
            ...newListing,
            id: Date.now(),
            date: 'Az önce',
            owner: { name: 'Ayşe Y.', joined: '2023' },
            image: newListing.imagePreview, // Using the local URI from image picker
        };
        const updated = [listing, ...listings];
        setListings(updated);
        try {
            await AsyncStorage.setItem('gonenPaylas_listings', JSON.stringify(updated));
        } catch (error) {
            console.error('Error saving listing', error);
        }
        return listing;
    };

    const removeListing = async (id: number) => {
        const updated = listings.filter(l => l.id !== id);
        setListings(updated);
        try {
            await AsyncStorage.setItem('gonenPaylas_listings', JSON.stringify(updated));
        } catch (error) {
            console.error('Error removing listing', error);
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

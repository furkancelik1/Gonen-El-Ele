import React, { createContext, useContext, useState } from 'react';
import { mockListings } from '../data/mockData';

const ListingsContext = createContext(null);

export function ListingsProvider({ children }) {
    const [listings, setListings] = useState(() => {
        try {
            const stored = localStorage.getItem('gonenPaylas_listings');
            return stored ? JSON.parse(stored) : mockListings;
        } catch {
            return mockListings;
        }
    });

    const addListing = (newListing) => {
        const listing = {
            ...newListing,
            id: Date.now(),
            date: 'Az önce',
            owner: { name: 'Ayşe Y.', joined: '2023' },
            image: newListing.imagePreview || '/images/bebek_arabasi.png',
        };
        const updated = [listing, ...listings];
        setListings(updated);
        try {
            localStorage.setItem('gonenPaylas_listings', JSON.stringify(updated));
        } catch { /* ignore */ }
        return listing;
    };

    const removeListing = (id) => {
        const updated = listings.filter(l => l.id !== id);
        setListings(updated);
        try {
            localStorage.setItem('gonenPaylas_listings', JSON.stringify(updated));
        } catch { /* ignore */ }
    };

    return (
        <ListingsContext.Provider value={{ listings, addListing, removeListing }}>
            {children}
        </ListingsContext.Provider>
    );
}

export function useListings() {
    const ctx = useContext(ListingsContext);
    if (!ctx) throw new Error('useListings must be used within ListingsProvider');
    return ctx;
}

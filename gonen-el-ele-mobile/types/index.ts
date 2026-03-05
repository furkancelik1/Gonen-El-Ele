export interface Owner {
    name: string;
    joined: string;
}

export interface Listing {
    id: number;
    title: string;
    category: string;
    neighborhood: string;
    image: any; // require() sonucu veya string URI olabilir
    date: string;
    description: string;
    owner?: Owner;
    // Opsiyonel genişletme alanları
    type?: string;
    status?: string;
    duration?: string;
    participantCount?: string;
}

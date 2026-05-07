export interface Destination {
    name: string;
    image: string;
    price: number;
    slug: string;
    category: 'domestic' | 'international' | 'honeymoon' | 'religious'
}
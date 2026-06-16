export interface PopularDestination {
  name: string;
  image: string;
  price: number;
  slug: string;

  category:
    | 'domestic'
    | 'international'
    | 'honeymoon'
    | 'religious';

  duration: string;
  packageType: string;

  shortDescription?: string;
  location?: string;
}
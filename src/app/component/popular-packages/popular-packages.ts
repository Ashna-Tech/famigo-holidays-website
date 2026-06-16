import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PopularDestination } from '../../models/popular-destination.model';

@Component({
  selector: 'app-popular-packages',
  imports: [RouterLink, CommonModule],
  templateUrl: './popular-packages.html',
  styleUrl: './popular-packages.scss',
})
export class PopularPackages {
  destinations: PopularDestination[] = [

    // INDIA

    {
      name: 'Manali',
      image: '/images/manali.webp',
      price: 5999,
      slug: 'manali',
      category: 'domestic',
      duration: '4N / 5D',
      packageType: 'Couple & Family'
    },

    {
      name: 'Kerala',
      image: '/images/kerala.webp',
      price: 14999,
      slug: 'kerala',
      category: 'domestic',
      duration: '5N / 6D',
      packageType: 'Family'
    },

    {
      name: 'Jaipur',
      image: '/images/jaipur.webp',
      price: 9999,
      slug: 'jaipur',
      category: 'domestic',
      duration: '3N / 4D',
      packageType: 'Family & Friends'
    },

    {
      name: 'Meghalaya',
      image: '/images/meghalaya.webp',
      price: 16999,
      slug: 'meghalaya',
      category: 'domestic',
      duration: '6N / 7D',
      packageType: 'Nature Lovers'
    },

    // INTERNATIONAL

    {
      name: 'Thailand',
      image: '/images/thailand.webp',
      price: 13999,
      slug: 'thailand',
      category: 'international',
      duration: '4N / 5D',
      packageType: 'Friends & Couple'
    },

    {
      name: 'Bali',
      image: '/images/bali.webp',
      price: 22990,
      slug: 'bali',
      category: 'international',
      duration: '5N / 6D',
      packageType: 'Honeymoon & Couple'
    },

    {
      name: 'Vietnam',
      image: '/images/vietnam.webp',
      price: 24000,
      slug: 'vietnam',
      category: 'international',
      duration: '5N / 6D',
      packageType: 'Family & Friends'
    },

    {
      name: 'Dubai',
      slug: 'dubai',
      image: '/images/dubai.webp',
      price: 29990,
      category: 'international',
      duration: '4N / 5D',
      packageType: 'Luxury & Family'
    }

  ];
}

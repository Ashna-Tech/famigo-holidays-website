import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Destination } from '../../models/popular-packages.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-packages',
  imports: [RouterLink, CommonModule],
  templateUrl: './popular-packages.html',
  styleUrl: './popular-packages.scss',
})
export class PopularPackages {
  destinations: Destination[] = [
    
    // INDIA 
    {
      name: 'Manali',
      image: '/images/manali.jpg', /*<img src="/images/meghalaya.jpg" alt="Meghalaya Tour Package">*/
      price: 12999,
      slug: 'manali',
      category: 'domestic'

    },

    {
      name: 'Kerala',
      image: '/images/kerala.jpg',
      price: 14999,
      slug: 'kerala',
      category: 'domestic'
    },

    {
      name: 'Jaipur',
      image: '/images/jaipur.jpg',
      price: 9999,
      slug: 'jaipur',
      category: 'domestic'
    },


    {
      name: 'Meghalaya',
      image: '/images/meghalaya.jpg',
      price: 16999,
      slug: 'meghalaya',
      category: 'domestic'
    },

    // INTERNATIONAL


    {
      name: 'Thailand',
      image: '/images/thailand.jpg',
      price: 13999,
      slug: 'thailand',
      category: 'international'
    },

    {
      name: 'Bali',
      image: '/images/bali.jpg',
      price: 7499,
      slug: 'bali',
      category: 'international'

    },

    {
      name: 'Vietnam',
      image: 'images/vietnam.jpg',
      price: 8999,
      slug: 'vietnam',
      category: 'international'
    },

    {
      name: 'Dubai',
      slug: 'dubai',
      image: '/images/dubai.jpg',
      price: 39999,
      category: 'international'
    }


  ]
}

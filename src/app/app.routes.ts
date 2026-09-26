import { Routes } from '@angular/router';

import { Home } from './pages/home/home';

import { Packages } from './pages/packages/packages';

import { Contact } from './pages/contact/contact';

import { About } from './pages/about/about';

export const routes: Routes = [

  // Homepage
  {
    path: '',
    component: Home,
    pathMatch: 'full'
  },

  // Tour Packages
  {
    path: 'packages',
    component: Packages
  },

  // Package Categories
  {
    path: 'packages/domestic',
    component: Packages
  },

  {
    path: 'packages/international',
    component: Packages
  },

  {
    path: 'packages/honeymoon',
    component: Packages
  },

  {
    path: 'packages/religious',
    component: Packages
  },

  // About
  {
    path: 'about',
    component: About
  },

  // Contact
  {
    path: 'contact',
    component: Contact
  },

  // Unknown URL → Homepage
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }

];
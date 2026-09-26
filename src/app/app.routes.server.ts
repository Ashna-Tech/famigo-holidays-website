import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  // Homepage
  {
    path: '',
    renderMode: RenderMode.Prerender
  },

  // All packages
  {
    path: 'packages',
    renderMode: RenderMode.Prerender
  },

  // Domestic packages
  {
    path: 'packages/domestic',
    renderMode: RenderMode.Prerender
  },

  // International packages
  {
    path: 'packages/international',
    renderMode: RenderMode.Prerender
  },

  // Honeymoon packages
  {
    path: 'packages/honeymoon',
    renderMode: RenderMode.Prerender
  },

  // Religious packages
  {
    path: 'packages/religious',
    renderMode: RenderMode.Prerender
  },

  // About
  {
    path: 'about',
    renderMode: RenderMode.Prerender
  },

  // Contact
  {
    path: 'contact',
    renderMode: RenderMode.Prerender
  },

  // Any other route
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }

];
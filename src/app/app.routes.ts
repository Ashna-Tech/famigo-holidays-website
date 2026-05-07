import { Routes,RouterModule } from '@angular/router';
import { Home } from './pages/home/home';
import { Packages } from './pages/packages/packages';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';
import { CategoryPackages } from './pages/category-packages/category-packages';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},

    { path: 'home', component: Home},
    { path:'packages', component:Packages},
    // { path: 'packages/:category', component: CategoryPackages },
    { path: 'about', component: About},
    { path: 'contact', component:Contact},

    { path: '**', redirectTo: 'home'}
    
];

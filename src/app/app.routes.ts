import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { MainRoutesInterface } from './core-comps/comp-faces';

export const MainRoutes: MainRoutesInterface[] = [
    {
        path: '',
        loadComponent: () => import('./features/landing').then(m => m.Landing)
    },
    {
        path: 'about',
        loadComponent: () => import('./features/about').then(m => m.About)
    },
    {
        path: 'services',
        loadComponent: () => import('./features/services').then(m => m.Services)
    },
    {
        path: 'contact',
        loadComponent: () => import('./features/contact').then(m => m.Contact)
    }
];
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./page/dashobard/dashobard').then(m => m.Dashobard)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }

];

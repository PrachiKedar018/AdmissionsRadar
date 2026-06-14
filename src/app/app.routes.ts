import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'apply',
        loadComponent:()=>import('./page/apply-page/apply-page').then(m=>m.ApplyPage)
    },
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

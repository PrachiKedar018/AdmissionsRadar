import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    {
        path:'apply',
        loadComponent:()=>import('./page/apply-page/apply-page').then(m=>m.ApplyPage),
        canActivate: [authGuard]
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./page/dashobard/dashobard').then(m => m.Dashobard),
        canActivate: [authGuard]
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./page/detail/detail').then(m => m.Detail),
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

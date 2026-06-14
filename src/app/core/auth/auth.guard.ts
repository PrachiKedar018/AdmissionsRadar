import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Extract the base route path segment (e.g. 'detail/:id' becomes 'detail')
  const path = route.routeConfig?.path?.split('/:')[0] || '';
  
  if (authService.canAccessRoute(path)) {
    return true;
  }
  
  // Unauthorized: redirect depending on role
  const role = authService.currentUser().role;
  if (role === 'counselor') {
    router.navigate(['/apply']);
  } else {
    router.navigate(['/dashboard']);
  }
  
  return false;
};

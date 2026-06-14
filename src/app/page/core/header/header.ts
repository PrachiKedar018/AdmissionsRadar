import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { AuthService } from '../../../core/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { UserRole } from '../../../core/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [SelectModule, CommonModule,FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected authService = inject(AuthService);
  protected router = inject(Router)
  roles = [
    { label: 'ADMIN', value: 'admin' },
    { label: 'COUNSELOR', value: 'counselor' },
    { label: 'VIEWER', value: 'viewer' }
  ]
  onRoleChange(newRole: UserRole) {
    this.authService.changeRole(newRole);
    if(newRole === 'counselor'){
      this.router.navigate(['/apply']);
    }
    else {
      this.router.navigate(['/dashboard']);
    }
  }
}

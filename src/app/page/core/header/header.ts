import { Component } from '@angular/core';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-header',
  imports: [SelectModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  roles = [
    { label: 'ADMIN', value: 'admin' },
    { label: 'COUNSELOR', value: 'counselor' },
    { label: 'VIEWER', value: 'viewer' }
  ]
}

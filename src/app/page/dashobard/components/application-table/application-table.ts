import { Component, Input, inject, ViewChild } from '@angular/core';
import { EligibilityResponse } from '../../../../core/model/eligibility-response.interface';
import { TableModule, Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-application-table',
  imports: [TableModule, DatePipe],
  templateUrl: './application-table.html',
  styleUrl: './application-table.scss',
})
export class ApplicationTable {
  @Input() data: EligibilityResponse[]=[]
  @ViewChild('dt') table?: Table;

  private router = inject(Router);
  protected authService = inject(AuthService);

  viewDetails(studentId: string): void {
    if (this.authService.canViewDetails()) {
      this.router.navigate(['/detail', studentId]);
    }
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (this.table && inputElement) {
      this.table.filterGlobal(inputElement.value, 'contains');
    }
  }

  onEligibilityChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (this.table && selectElement) {
      const val = selectElement.value;
      if (val === 'all') {
        this.table.filter(null, 'eligible', 'equals');
      } else {
        const boolVal = val === 'true';
        this.table.filter(boolVal, 'eligible', 'equals');
      }
    }
  }
}

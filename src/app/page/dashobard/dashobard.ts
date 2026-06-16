import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { KpiCards } from './components/kpi-cards/kpi-cards';
import { EligibilityResponse } from '../../core/model/eligibility-response.interface';
import { EligibilityService } from '../../core/service/eligibility.service';
import { ApplicationTable } from './components/application-table/application-table';

@Component({
  selector: 'app-dashobard',
  imports: [ProgressSpinnerModule,KpiCards,ApplicationTable],
  templateUrl: './dashobard.html',
  styleUrl: './dashobard.scss',
})
export class Dashobard {
  protected authService = inject(AuthService);
  protected eligibilityService = inject(EligibilityService);
  isLoading = signal<boolean>(false)
  rawApplication = signal<EligibilityResponse[]>([]);

  ngOnInit():void{
    this.loadApplications();
  }
  loadApplications():void{
    this.isLoading.set(true);
    this.eligibilityService.getApplications().pipe().subscribe({
      next:(apps)=>{
        this.rawApplication.set(apps);
        this.isLoading.set(false);
      },
      error:(err)=>{
        alert("An error occurred loading the applications list");
        this.isLoading.set(false);
      }
    })
  }
}

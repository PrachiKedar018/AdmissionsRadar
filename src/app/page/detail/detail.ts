import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EligibilityService } from '../../core/service/eligibility.service';
import { EligibilityResponse } from '../../core/model/eligibility-response.interface';
import { DatePipe } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-detail',
  imports: [DatePipe, ProgressSpinnerModule],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eligibilityService = inject(EligibilityService);

  application = signal<EligibilityResponse | null>(null);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eligibilityService.getApplicationById(id).subscribe({
        next: (app) => {
          if (app) {
            this.application.set(app);
          } else {
            this.errorMessage.set('Application not found.');
          }
          this.isLoading.set(false);
        },
        error: (err) => {
          this.errorMessage.set('Error loading application details.');
          this.isLoading.set(false);
        }
      });
    } else {
      this.errorMessage.set('Invalid application ID.');
      this.isLoading.set(false);
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}

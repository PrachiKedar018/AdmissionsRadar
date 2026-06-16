import { Component, inject, Input, signal } from '@angular/core';
import { EligibilityResponse } from '../../../../core/model/eligibility-response.interface';

@Component({
  selector: 'app-kpi-cards',
  imports: [],
  templateUrl: './kpi-cards.html',
  styleUrl: './kpi-cards.scss',
})
export class KpiCards {
  private apps = signal<EligibilityResponse[]>([]);
  @Input() set data(value: EligibilityResponse[]) {
    this.apps.set(value || [])
  }

  get totalCount(): number {
    return this.apps().length
  }

  get eligibleCount():number{
    return this.apps().filter(a=>a.eligible).length
  }

  get notEligibleCount():number{
    return this.apps().filter(a=>!a.eligible).length
  }


  get avgPercentage():string{
    if(this.totalCount === 0) return '0';
    const sum = this.apps().reduce((acc,val)=>acc + val.percentage,0);
    return (sum / this.totalCount).toFixed(1)
  }
}

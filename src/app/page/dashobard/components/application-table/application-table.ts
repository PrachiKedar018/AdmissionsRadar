import { Component, Input } from '@angular/core';
import { EligibilityResponse } from '../../../../core/model/eligibility-response.interface';
import { TableModule } from 'primeng/table';
import { BaseIcon } from "primeng/icons/baseicon";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-application-table',
  imports: [TableModule,DatePipe],
  templateUrl: './application-table.html',
  styleUrl: './application-table.scss',
})
export class ApplicationTable {
  @Input() data: EligibilityResponse[]=[]
}

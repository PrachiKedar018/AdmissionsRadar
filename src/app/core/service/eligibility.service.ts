import { Injectable } from '@angular/core';
import { ApplicationPayload, EligibilityResponse } from '../model/eligibility-response.interface';
import { INITIAL_APPLICATION } from './eligibility.mock';
import { delay, Observable, of, throwError } from 'rxjs';
import { getCategoryByCourseName } from '../config/course-config';

@Injectable({
  providedIn: 'root',
})
export class EligibilityService {
  private initialApplication: EligibilityResponse[] = INITIAL_APPLICATION;
  readonly STORAGE_KEY = 'college_portal_applications';
  constructor() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.initialApplication))
    }
  }

  private getStoredApplication(): EligibilityResponse[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private setStoredApplications(apps: EligibilityResponse[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(apps))
  }

  checkEligibility(payload:ApplicationPayload):Observable<EligibilityResponse>{
    if(payload.name && payload.name.trim() === 'simulator error'){
      return throwError(()=> new Error('Simulated internal server submission failure.')).pipe(
        delay(800));
    }
    const apps = this.getStoredApplication();
    const studentId = `STU-2026-${String(apps.length + 1).padStart(4, '0')}`;
    const totalMarks = payload.subjects.reduce((sum, sub) => sum + sub.marks, 0);
    const percentage = Number((totalMarks / 6).toFixed(1));
    let eligible = true;
    const recommendations:string[]=[];
    let message = 'student is eligible';
    const catConfig = getCategoryByCourseName(payload.desiredCourse);
    const category = catConfig?.category;
    const newApp:EligibilityResponse={
      student_id:studentId,
      name:payload.name,
      age:payload.age,
      gender:payload.gender,
      eligible,
      desired_course:payload.desiredCourse,
      message,
      percentage,
      recommendations,
      timestamp:new Date().toISOString(),
      raw_payload:payload
    }
    this.setStoredApplications(apps);
    return of(newApp).pipe(delay(800));
  }

  getApplications():Observable<EligibilityResponse[]>{
    const apps = this.getStoredApplication();
    return of(apps).pipe(delay(800));
  }



}

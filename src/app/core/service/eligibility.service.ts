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
    const recommendations: string[] = [];
    
    const catConfig = getCategoryByCourseName(payload.desiredCourse);
    const requiredExam = catConfig ? catConfig.requiredExam : null;
    
    if (percentage < 60) {
      eligible = false;
      recommendations.push('Minimum aggregate percentage of 60% is required for admission.');
    }
    
    let examFailed = false;
    if (requiredExam === 'JEE') {
      const jee = payload.jeeQualification;
      if (!jee || jee.cleared !== 'yes' || !jee.score || jee.score <= 0) {
        eligible = false;
        examFailed = true;
        recommendations.push('JEE qualification is required for Engineering courses.');
        recommendations.push('Consider applying for Commerce or Humanities courses where entrance exams are not mandatory.');
      }
    } else if (requiredExam === 'NEET') {
      const neet = payload.neetQualification;
      if (!neet || neet.cleared !== 'yes' || !neet.score || neet.score <= 0) {
        eligible = false;
        examFailed = true;
        recommendations.push('NEET qualification is required for Medical courses.');
        recommendations.push('Consider applying for Commerce or Humanities courses where entrance exams are not mandatory.');
      }
    }

    let message = '';
    if (eligible) {
      if (requiredExam === 'JEE') {
        message = 'Student meets all academic and JEE qualification criteria.';
      } else if (requiredExam === 'NEET') {
        message = 'Student meets all academic and NEET qualification criteria.';
      } else {
        message = 'Student meets all academic qualification criteria.';
      }
    } else {
      if (percentage < 60 && examFailed) {
        message = `Student failed to meet both academic and ${requiredExam} qualification criteria.`;
      } else if (percentage < 60) {
        message = 'Student failed to meet minimum academic percentage criteria.';
      } else {
        message = `Student failed to meet ${requiredExam} qualification criteria.`;
      }
    }

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
    
    apps.push(newApp);
    this.setStoredApplications(apps);
    return of(newApp).pipe(delay(800));
  }

  getApplications():Observable<EligibilityResponse[]>{
    const apps = this.getStoredApplication();
    return of(apps).pipe(delay(800));
  }

  getApplicationById(id: string): Observable<EligibilityResponse | undefined> {
    const apps = this.getStoredApplication();
    const app = apps.find(a => a.student_id === id);
    return of(app).pipe(delay(300));
  }
}

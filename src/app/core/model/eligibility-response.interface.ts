export interface subjectEntry {
    name: string;
    marks: number;
}

export interface Qualification {
    cleared: string;
    score: number;
}

export interface ApplicationPayload {
    name: string;
    age: number;
    gender: string;
    desiredCourse: string;
    subjects: subjectEntry[];
    jeeQualification?: Qualification;
    neetQualification?: Qualification;
}
export interface EligibilityResponse {
    student_id: string;
    name: string;
    age: number;
    gender: string;
    eligible: boolean;
    desired_course: string;
    message: string;
    percentage: number;
    recommendations: string[];
    timestamp: string;
    raw_payload: ApplicationPayload
}
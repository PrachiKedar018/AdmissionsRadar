import { EligibilityResponse } from '../model/eligibility-response.interface';

export const INITIAL_APPLICATION: EligibilityResponse[] = [
  {
    student_id: 'STU-2026-0001',
    name: 'Aarav Meheta',
    gender: 'Male',
    age: 18,
    eligible: true,
    desired_course: 'Computer Science Engineering',
    message: 'Student meets all academic and JEE qualification criteria.',
    percentage: 84.5,
    recommendations: [],
    timestamp: '2026-06-12T10:30:00Z',
    raw_payload: {
      name: 'Aarav Mehta',
      age: 18,
      gender: 'Male',
      desiredCourse: 'Computer Science Engineering',
      subjects: [
        { name: 'Mathematics', marks: 88 },
        { name: 'Physics', marks: 85 },
        { name: 'Chemistry', marks: 82 },
        { name: 'English', marks: 90 },
        { name: 'Computer Science', marks: 92 },
        { name: 'Physical Education', marks: 70 }
      ],
      jeeQualification: { cleared: 'yes', score: 250 }
    }
  },
  {
    student_id: 'STU-2026-0002',
    name: 'Rohan Sharma',
    age: 20,
    gender: 'Male',
    eligible: false,
    desired_course: 'Mechanical Engineering',
    message: 'Student failed to meet JEE qualification criteria.',
    percentage: 72.8,
    recommendations: [
      'JEE qualification is required for Engineering courses.',
      'Consider applying for Commerce or Humanities courses where entrance exams are not mandatory.'
    ],
    timestamp: '2026-06-12T13:45:00Z',
    raw_payload: {
      name: 'Rohan Sharma',
      age: 20,
      gender: 'Male',
      desiredCourse: 'Mechanical Engineering',
      subjects: [
        { name: 'Mathematics', marks: 75 },
        { name: 'Physics', marks: 70 },
        { name: 'Chemistry', marks: 68 },
        { name: 'English', marks: 80 },
        { name: 'Computer Science', marks: 74 },
        { name: 'Physical Education', marks: 70 }
      ],
      jeeQualification: { cleared: 'no', score: 0 }
    }
  },

];


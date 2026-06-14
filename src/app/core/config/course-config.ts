export enum CourseCategory {
    Engineering = 'Engineering',
    Medicine = 'Medicine',
    Commerce = 'Commerce',
    Humanities = 'Humanities'
}
export interface Course {
  id: string;
  name: string;
  category: CourseCategory;
}

export type RequiredCourse = 'JEE' | 'NEET' | null;
export interface CourseCategoryConfig {
    category: CourseCategory;
    courses: string[];
    requiredExam: RequiredCourse;
}
export const COURSE_CATEGORIES: CourseCategoryConfig[] = [
    {
        category: CourseCategory.Engineering,
        requiredExam: 'JEE',
        courses: [
            'Computer Science Engineering',
            'Mechanical Engineering',
            'Electrical Engineering',
            'Civil Engineering',
            'Electronics and Communication Engineering'
        ]
    },
    {
        category:CourseCategory.Medicine,
        requiredExam:'NEET',
        courses:[
      'MBBS',
      'BDS',
      'BAMS',
      'BHMS',
      'BPT'
    ]
    },
     {
    category: CourseCategory.Commerce,
    requiredExam: null,
    courses: [
      'B.Com',
      'BBA',
      'BBM',
      'CA'
    ]
  },
  {
    category: CourseCategory.Humanities,
    requiredExam: null,
    courses: [
      'BA in History',
      'BA in Psychology',
      'BA in Sociology',
      'BA in Political Science',
      'BA in English'
    ]
  }
];
export function getCategoryByCourseName(courseName: string): CourseCategoryConfig | undefined {
  return COURSE_CATEGORIES.find(cat => cat.courses.includes(courseName));
}
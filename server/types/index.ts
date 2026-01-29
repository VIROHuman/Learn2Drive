// Course Categories
export type CourseCategory =
    // Teen Driver ED
    | 'teen-full-package'
    | 'teen-classroom-only'
    | 'teen-behind-the-wheel'
    | 'teen-driving-lessons'
    // Adult Driver ED
    | 'adult-classroom-only'
    | 'adult-driving-lessons'
    // Road Test
    | 'road-test-complete-deal'
    | 'road-test-practice'
    | 'road-test-dps-authorized';

export interface Course {
    id: string;
    name: string;
    content: string;
    fee: number;
    category: CourseCategory;
    categoryGroup: 'Teen Driver ED' | 'Adult Driver ED' | 'Road Test';
    categoryLabel: string;
    thumbnail: string;
    createdAt: string;
}

export interface StudentPerformance {
    enrolledCourse: string;
    status: 'Active' | 'Completed';
    progress: number; // 0-100
    quizAverageScore: number; // 0-100
    expirationDate: string;
}

export interface Student {
    id: string;
    name: string;
    email: string;
    phone: string;
    amountPaid: number | null;
    datePaid: string | null;
    status: 'paid' | 'unpaid';
    performance: StudentPerformance | null;
}

export interface CreateCourseDTO {
    name: string;
    content: string;
    fee: number;
    category: CourseCategory;
    thumbnail?: string;
}

export interface SendInviteDTO {
    studentId: string;
}

// Category mapping helper
export const categoryConfig: Record<CourseCategory, { group: string; label: string }> = {
    'teen-full-package': { group: 'Teen Driver ED', label: 'Full Package' },
    'teen-classroom-only': { group: 'Teen Driver ED', label: 'Classroom Only' },
    'teen-behind-the-wheel': { group: 'Teen Driver ED', label: 'Behind-the-Wheel' },
    'teen-driving-lessons': { group: 'Teen Driver ED', label: 'Driving Lessons' },
    'adult-classroom-only': { group: 'Adult Driver ED', label: 'Classroom Only' },
    'adult-driving-lessons': { group: 'Adult Driver ED', label: 'Driving Lessons' },
    'road-test-complete-deal': { group: 'Road Test', label: 'DPS Authorized Complete Deal' },
    'road-test-practice': { group: 'Road Test', label: 'Practice Road Test' },
    'road-test-dps-authorized': { group: 'Road Test', label: 'DPS Authorized Road Test' },
};

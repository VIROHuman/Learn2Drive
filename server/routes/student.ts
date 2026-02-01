import { Router, Request, Response } from 'express';

const router = Router();

// ==================== MOCK DATA ====================

// Mock student data (simulating logged-in user)
const currentStudent = {
    id: 'student-1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    avatar: 'JS',
};

// Mock enrolled courses with progress
const enrolledCourses = [
    {
        id: 'course-1',
        name: 'Teen Complete Driving Package',
        thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
        progress: 45,
        totalLessons: 24,
        completedLessons: 11,
        lastAccessed: '2026-01-28T10:30:00Z',
        instructor: 'Michael Roberts',
        duration: '32 hours',
    },
    {
        id: 'course-2',
        name: 'Traffic Laws & Road Signs',
        thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400',
        progress: 100,
        totalLessons: 12,
        completedLessons: 12,
        lastAccessed: '2026-01-20T14:00:00Z',
        instructor: 'Sarah Johnson',
        duration: '8 hours',
    },
    {
        id: 'course-3',
        name: 'Defensive Driving Techniques',
        thumbnail: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400',
        progress: 20,
        totalLessons: 18,
        completedLessons: 4,
        lastAccessed: '2026-01-25T09:15:00Z',
        instructor: 'David Chen',
        duration: '14 hours',
    },
    {
        id: 'course-4',
        name: 'Highway & Night Driving',
        thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
        progress: 0,
        totalLessons: 10,
        completedLessons: 0,
        lastAccessed: null,
        instructor: 'Emily Martinez',
        duration: '6 hours',
    },
];

// Mock course syllabus data
const courseSyllabi: Record<string, object> = {
    'course-1': {
        id: 'course-1',
        name: 'Teen Complete Driving Package',
        description: 'Comprehensive driving education for teenagers including classroom instruction, behind-the-wheel training, and DMV test preparation.',
        instructor: 'Michael Roberts',
        thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
        totalDuration: '32 hours',
        modules: [
            {
                id: 'mod-1',
                title: 'Introduction to Driving',
                duration: '2 hours',
                lessons: [
                    { id: 'les-1-1', title: 'Course Overview & Goals', duration: '15 min', completed: true, type: 'video' },
                    { id: 'les-1-2', title: 'Understanding Your Vehicle', duration: '25 min', completed: true, type: 'video' },
                    { id: 'les-1-3', title: 'Basic Controls & Dashboard', duration: '20 min', completed: true, type: 'video' },
                    { id: 'les-1-4', title: 'Module 1 Quiz', duration: '15 min', completed: true, type: 'quiz' },
                ],
            },
            {
                id: 'mod-2',
                title: 'Traffic Laws & Regulations',
                duration: '4 hours',
                lessons: [
                    { id: 'les-2-1', title: 'Texas Traffic Laws Overview', duration: '30 min', completed: true, type: 'video' },
                    { id: 'les-2-2', title: 'Right of Way Rules', duration: '25 min', completed: true, type: 'video' },
                    { id: 'les-2-3', title: 'Speed Limits & Zones', duration: '20 min', completed: true, type: 'video' },
                    { id: 'les-2-4', title: 'Traffic Signs & Signals', duration: '35 min', completed: true, type: 'video' },
                    { id: 'les-2-5', title: 'Module 2 Quiz', duration: '20 min', completed: true, type: 'quiz' },
                ],
            },
            {
                id: 'mod-3',
                title: 'Road Signs & Markings',
                duration: '3 hours',
                lessons: [
                    { id: 'les-3-1', title: 'Warning Signs', duration: '25 min', completed: true, type: 'video' },
                    { id: 'les-3-2', title: 'Regulatory Signs', duration: '25 min', completed: true, type: 'video' },
                    { id: 'les-3-3', title: 'Guide Signs & Lane Markings', duration: '30 min', completed: false, type: 'video' },
                    { id: 'les-3-4', title: 'Module 3 Quiz', duration: '15 min', completed: false, type: 'quiz' },
                ],
            },
            {
                id: 'mod-4',
                title: 'Defensive Driving',
                duration: '5 hours',
                lessons: [
                    { id: 'les-4-1', title: 'What is Defensive Driving?', duration: '20 min', completed: false, type: 'video' },
                    { id: 'les-4-2', title: 'Anticipating Hazards', duration: '35 min', completed: false, type: 'video' },
                    { id: 'les-4-3', title: 'Safe Following Distance', duration: '25 min', completed: false, type: 'video' },
                    { id: 'les-4-4', title: 'Managing Road Rage', duration: '20 min', completed: false, type: 'video' },
                    { id: 'les-4-5', title: 'Module 4 Quiz', duration: '20 min', completed: false, type: 'quiz' },
                ],
            },
            {
                id: 'mod-5',
                title: 'Behind-the-Wheel Preparation',
                duration: '6 hours',
                lessons: [
                    { id: 'les-5-1', title: 'Pre-Drive Checklist', duration: '15 min', completed: false, type: 'video' },
                    { id: 'les-5-2', title: 'Starting & Stopping', duration: '30 min', completed: false, type: 'video' },
                    { id: 'les-5-3', title: 'Steering Techniques', duration: '25 min', completed: false, type: 'video' },
                    { id: 'les-5-4', title: 'Parallel Parking Guide', duration: '40 min', completed: false, type: 'video' },
                    { id: 'les-5-5', title: 'Highway Merging', duration: '35 min', completed: false, type: 'video' },
                    { id: 'les-5-6', title: 'Module 5 Quiz', duration: '20 min', completed: false, type: 'quiz' },
                ],
            },
        ],
    },
};

// Mock driving roster
const drivingRoster = {
    upcoming: [
        {
            id: 'lesson-1',
            date: '2026-02-01',
            time: '10:00 AM - 12:00 PM',
            instructor: {
                name: 'Michael Roberts',
                avatar: 'MR',
                phone: '+1 (555) 123-4567',
            },
            location: 'Learn2Drive - Main Campus',
            type: 'Behind-the-Wheel',
            vehicle: 'Toyota Camry #12',
        },
        {
            id: 'lesson-2',
            date: '2026-02-05',
            time: '2:00 PM - 4:00 PM',
            instructor: {
                name: 'Michael Roberts',
                avatar: 'MR',
                phone: '+1 (555) 123-4567',
            },
            location: 'Learn2Drive - Main Campus',
            type: 'Highway Driving',
            vehicle: 'Toyota Camry #12',
        },
        {
            id: 'lesson-3',
            date: '2026-02-10',
            time: '9:00 AM - 11:00 AM',
            instructor: {
                name: 'Sarah Johnson',
                avatar: 'SJ',
                phone: '+1 (555) 234-5678',
            },
            location: 'Learn2Drive - Downtown',
            type: 'Night Driving',
            vehicle: 'Honda Civic #08',
        },
    ],
    past: [
        {
            id: 'lesson-past-1',
            date: '2026-01-20',
            time: '10:00 AM - 12:00 PM',
            instructor: {
                name: 'Michael Roberts',
                avatar: 'MR',
            },
            type: 'Basic Controls',
            status: 'Completed',
            feedback: 'Excellent progress with basic controls and parking.',
        },
        {
            id: 'lesson-past-2',
            date: '2026-01-15',
            time: '2:00 PM - 4:00 PM',
            instructor: {
                name: 'Michael Roberts',
                avatar: 'MR',
            },
            type: 'Introduction',
            status: 'Completed',
            feedback: 'Great first lesson! Good understanding of vehicle controls.',
        },
    ],
};

// Mock certificates
const certificates = [
    {
        id: 'cert-1',
        courseName: 'Traffic Laws & Road Signs',
        issueDate: '2026-01-20',
        certificateNumber: 'L2D-2026-TL-001234',
        instructorName: 'Sarah Johnson',
        validUntil: '2029-01-20',
    },
    {
        id: 'cert-2',
        courseName: 'Defensive Driving Basics',
        issueDate: '2025-12-15',
        certificateNumber: 'L2D-2025-DD-005678',
        instructorName: 'David Chen',
        validUntil: '2028-12-15',
    },
];

// ==================== ROUTES ====================

// GET /api/student/dashboard - Get student dashboard data
router.get('/student/dashboard', (req: Request, res: Response) => {
    // Sort courses by last accessed (most recent first)
    const sortedCourses = [...enrolledCourses].sort((a, b) => {
        if (!a.lastAccessed) return 1;
        if (!b.lastAccessed) return -1;
        return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime();
    });

    // Get the most recently accessed in-progress course
    const inProgressCourse = sortedCourses.find(c => c.progress > 0 && c.progress < 100);

    res.json({
        success: true,
        data: {
            student: currentStudent,
            inProgress: inProgressCourse || null,
            courses: enrolledCourses,
            stats: {
                totalCourses: enrolledCourses.length,
                completedCourses: enrolledCourses.filter(c => c.progress === 100).length,
                inProgressCourses: enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length,
                upcomingLessons: drivingRoster.upcoming.length,
            },
        },
    });
});

// GET /api/course/:id - Get course details with syllabus
router.get('/course/:id', (req: Request, res: Response) => {
    const id = req.params.id as string;

    const syllabus = courseSyllabi[id];

    if (!syllabus) {
        // Return a generic course structure for any course
        const course = enrolledCourses.find(c => c.id === id);

        if (!course) {
            res.status(404).json({
                success: false,
                error: 'Course not found',
            });
            return;
        }

        // Generate a generic syllabus
        res.json({
            success: true,
            data: {
                id: course.id,
                name: course.name,
                description: 'Professional driving course content.',
                instructor: course.instructor,
                thumbnail: course.thumbnail,
                totalDuration: course.duration,
                progress: course.progress,
                modules: [
                    {
                        id: 'mod-1',
                        title: 'Getting Started',
                        duration: '1 hour',
                        lessons: [
                            { id: 'les-1', title: 'Introduction', duration: '15 min', completed: course.progress > 0, type: 'video' },
                            { id: 'les-2', title: 'Course Overview', duration: '20 min', completed: course.progress > 10, type: 'video' },
                        ],
                    },
                ],
            },
        });
        return;
    }

    res.json({
        success: true,
        data: syllabus,
    });
});

// GET /api/student/roster - Get driving lesson schedule
router.get('/student/roster', (req: Request, res: Response) => {
    res.json({
        success: true,
        data: drivingRoster,
    });
});

// GET /api/student/certificates - Get earned certificates
router.get('/student/certificates', (req: Request, res: Response) => {
    res.json({
        success: true,
        data: certificates,
    });
});

// POST /api/student/roster/:id/cancel - Cancel a driving lesson
router.post('/student/roster/:id/cancel', (req: Request, res: Response) => {
    const { id } = req.params;
    const lesson = drivingRoster.upcoming.find(l => l.id === id);

    if (!lesson) {
        res.status(404).json({
            success: false,
            error: 'Lesson not found',
        });
        return;
    }

    console.log(`📅 Cancellation request for lesson: ${lesson.type} on ${lesson.date}`);

    res.json({
        success: true,
        message: 'Lesson cancellation request submitted. You will receive a confirmation email shortly.',
    });
});

export default router;

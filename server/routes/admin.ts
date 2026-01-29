import { Router, Request, Response } from 'express';
import { courses, students, addCourse, findStudentById } from '../data/mockData';
import { CreateCourseDTO, SendInviteDTO, categoryConfig } from '../types';

const router = Router();

// ==================== COURSES ====================

// GET /api/courses - List all courses
router.get('/courses', (req: Request, res: Response) => {
    res.json({
        success: true,
        data: courses,
        total: courses.length,
    });
});

// POST /api/courses - Add new course
router.post('/courses', (req: Request, res: Response) => {
    const { name, content, fee, category, thumbnail }: CreateCourseDTO = req.body;

    // Validation
    if (!name || !content || !fee || !category) {
        res.status(400).json({
            success: false,
            error: 'Missing required fields: name, content, fee, category',
        });
        return;
    }

    if (!categoryConfig[category]) {
        res.status(400).json({
            success: false,
            error: 'Invalid category',
        });
        return;
    }

    const newCourse = addCourse({
        name,
        content,
        fee: Number(fee),
        category,
        thumbnail: thumbnail || 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
    });

    console.log(`✅ New course created: "${newCourse.name}" (${newCourse.categoryLabel})`);

    res.status(201).json({
        success: true,
        data: newCourse,
    });
});

// GET /api/categories - Get category structure for dropdown
router.get('/categories', (req: Request, res: Response) => {
    const categoryGroups = [
        {
            group: 'Teen Driver ED',
            options: [
                { value: 'teen-full-package', label: 'Full Package' },
                { value: 'teen-classroom-only', label: 'Classroom Only' },
                { value: 'teen-behind-the-wheel', label: 'Behind-the-Wheel' },
                { value: 'teen-driving-lessons', label: 'Driving Lessons' },
            ],
        },
        {
            group: 'Adult Driver ED',
            options: [
                { value: 'adult-classroom-only', label: 'Classroom Only' },
                { value: 'adult-driving-lessons', label: 'Driving Lessons' },
            ],
        },
        {
            group: 'Road Test',
            options: [
                { value: 'road-test-complete-deal', label: 'DPS Authorized Complete Deal' },
                { value: 'road-test-practice', label: 'Practice Road Test' },
                { value: 'road-test-dps-authorized', label: 'DPS Authorized Road Test' },
            ],
        },
    ];

    res.json({
        success: true,
        data: categoryGroups,
    });
});

// ==================== SALES ====================

// GET /api/sales - List all students with payment status
router.get('/sales', (req: Request, res: Response) => {
    res.json({
        success: true,
        data: students,
        total: students.length,
        summary: {
            paid: students.filter(s => s.status === 'paid').length,
            unpaid: students.filter(s => s.status === 'unpaid').length,
            totalRevenue: students.reduce((sum, s) => sum + (s.amountPaid || 0), 0),
        },
    });
});

// POST /api/sales/invite - Send payment reminder email
router.post('/sales/invite', (req: Request, res: Response) => {
    const { studentId }: SendInviteDTO = req.body;

    if (!studentId) {
        res.status(400).json({
            success: false,
            error: 'Missing studentId',
        });
        return;
    }

    const student = findStudentById(studentId);

    if (!student) {
        res.status(404).json({
            success: false,
            error: 'Student not found',
        });
        return;
    }

    if (student.status === 'paid') {
        res.status(400).json({
            success: false,
            error: 'Student has already paid',
        });
        return;
    }

    // Simulate sending email
    console.log(`📧 Sending payment reminder email to: ${student.name} <${student.email}>`);
    console.log(`   Subject: Complete Your Learn2Drive Enrollment`);
    console.log(`   Message: Hi ${student.name}, please complete your payment to start your driving course!`);

    res.json({
        success: true,
        message: `Payment reminder sent to ${student.email}`,
        student: {
            id: student.id,
            name: student.name,
            email: student.email,
        },
    });
});

export default router;

import { Router, Request, Response } from 'express';

const router = Router();

// Mock schools data
let schools = [
    {
        id: '1',
        name: 'Pacific Coast Driving Academy',
        email: 'contact@pacificdriving.com',
        phone: '(415) 555-0123',
        employees: '6-20',
        state: 'California',
        street: '123 Pacific Ave',
        city: 'San Francisco',
        zip: '94102',
        registeredAt: '2026-01-28',
        status: 'pending' as const,
    },
    {
        id: '2',
        name: 'Metro Drive School',
        email: 'info@metrodrive.com',
        phone: '(212) 555-0456',
        employees: '20+',
        state: 'New York',
        street: '456 Broadway',
        city: 'New York',
        zip: '10012',
        registeredAt: '2026-01-27',
        status: 'pending' as const,
    },
    {
        id: '3',
        name: 'Sunshine Driving Institute',
        email: 'hello@sunshinedriving.com',
        phone: '(305) 555-0789',
        employees: '6-20',
        state: 'Florida',
        street: '789 Ocean Dr',
        city: 'Miami',
        zip: '33139',
        registeredAt: '2026-01-25',
        status: 'active' as const,
        subscriptionFee: 299,
    },
    {
        id: '4',
        name: 'Mountain View Auto School',
        email: 'admin@mvautoshool.com',
        phone: '(303) 555-0321',
        employees: '1-5',
        state: 'Colorado',
        street: '321 Mountain Rd',
        city: 'Denver',
        zip: '80202',
        registeredAt: '2026-01-20',
        status: 'active' as const,
        subscriptionFee: 199,
    },
    {
        id: '5',
        name: 'Gateway Driving Center',
        email: 'team@gatewaydriving.com',
        phone: '(314) 555-0654',
        employees: '1-5',
        state: 'Missouri',
        street: '654 Gateway Blvd',
        city: 'St. Louis',
        zip: '63101',
        registeredAt: '2026-01-15',
        status: 'inactive' as const,
        rejectionRemarks: 'Incomplete documentation provided.',
    },
];

// Super Admin Login
router.post('/super-admin/login', (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Demo login - accept any credentials
    if (email && password) {
        res.json({
            success: true,
            token: 'demo-super-admin-token-' + Date.now(),
            user: {
                email,
                role: 'super_admin',
                name: 'Super Admin',
            },
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Email and password are required',
        });
    }
});

// Register new school (public endpoint)
router.post('/schools/register', (req: Request, res: Response) => {
    const { schoolName, phone, email, employees, state, street, city, zip } = req.body;

    const newSchool = {
        id: String(schools.length + 1),
        name: schoolName,
        email,
        phone,
        employees,
        state,
        street,
        city,
        zip,
        registeredAt: new Date().toISOString().split('T')[0],
        status: 'pending' as const,
    };

    schools.push(newSchool);

    res.status(201).json({
        success: true,
        message: 'School registration submitted successfully',
        school: newSchool,
    });
});

// Get all schools (with optional status filter)
router.get('/super-admin/schools', (req: Request, res: Response) => {
    const { status } = req.query;

    let filteredSchools = schools;
    if (status && typeof status === 'string') {
        filteredSchools = schools.filter((s) => s.status === status);
    }

    res.json({
        success: true,
        schools: filteredSchools,
    });
});

// Get dashboard stats
router.get('/super-admin/stats', (req: Request, res: Response) => {
    const activeSchools = schools.filter((s) => s.status === 'active');
    const totalMRR = activeSchools.reduce((sum, s) => sum + ((s as any).subscriptionFee || 0), 0);
    const pendingCount = schools.filter((s) => s.status === 'pending').length;

    res.json({
        success: true,
        stats: {
            totalLicensedSchools: activeSchools.length,
            totalMRR,
            pendingApprovals: pendingCount,
        },
    });
});

// Approve school
router.post('/super-admin/schools/:id/approve', (req: Request, res: Response) => {
    const { id } = req.params;
    const { subscriptionFee } = req.body;

    const schoolIndex = schools.findIndex((s) => s.id === id);

    if (schoolIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'School not found',
        });
    }

    schools[schoolIndex] = {
        ...schools[schoolIndex],
        status: 'active',
        subscriptionFee: parseFloat(subscriptionFee),
    } as any;

    res.json({
        success: true,
        message: 'School approved successfully',
        school: schools[schoolIndex],
    });
});

// Reject school
router.post('/super-admin/schools/:id/reject', (req: Request, res: Response) => {
    const { id } = req.params;
    const { rejectionRemarks } = req.body;

    const schoolIndex = schools.findIndex((s) => s.id === id);

    if (schoolIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'School not found',
        });
    }

    schools[schoolIndex] = {
        ...schools[schoolIndex],
        status: 'inactive',
        rejectionRemarks,
    } as any;

    res.json({
        success: true,
        message: 'School rejected',
        school: schools[schoolIndex],
    });
});

export default router;

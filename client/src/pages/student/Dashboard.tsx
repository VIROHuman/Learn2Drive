import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Play,
    Clock,
    BookOpen,
    Calendar,
    Award,
    TrendingUp,
    ChevronRight
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface Course {
    id: string
    name: string
    thumbnail: string
    progress: number
    totalLessons: number
    completedLessons: number
    lastAccessed: string | null
    instructor: string
    duration: string
}

interface DashboardData {
    student: {
        id: string
        name: string
        email: string
        avatar: string
    }
    inProgress: Course | null
    courses: Course[]
    stats: {
        totalCourses: number
        completedCourses: number
        inProgressCourses: number
        upcomingLessons: number
    }
}

// Mock data fallback (used when backend is unavailable)
const MOCK_DASHBOARD_DATA: DashboardData = {
    student: {
        id: 'student-demo',
        name: 'Demo Student',
        email: 'demo@learn2drive.com',
        avatar: 'DS',
    },
    inProgress: {
        id: 'course-1',
        name: 'Teen Complete Driving Package',
        thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
        progress: 65,
        totalLessons: 12,
        completedLessons: 8,
        lastAccessed: '2026-01-30',
        instructor: 'Michael Rodriguez',
        duration: '32 hours',
    },
    courses: [
        {
            id: 'course-1',
            name: 'Teen Complete Driving Package',
            thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
            progress: 65,
            totalLessons: 12,
            completedLessons: 8,
            lastAccessed: '2026-01-30',
            instructor: 'Michael Rodriguez',
            duration: '32 hours',
        },
        {
            id: 'course-2',
            name: 'Defensive Driving Course',
            thumbnail: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400',
            progress: 100,
            totalLessons: 6,
            completedLessons: 6,
            lastAccessed: '2026-01-15',
            instructor: 'Sarah Johnson',
            duration: '6 hours',
        },
        {
            id: 'course-3',
            name: 'Road Test Preparation',
            thumbnail: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
            progress: 30,
            totalLessons: 8,
            completedLessons: 2,
            lastAccessed: '2026-01-28',
            instructor: 'David Chen',
            duration: '4 hours',
        },
    ],
    stats: {
        totalCourses: 3,
        completedCourses: 1,
        inProgressCourses: 2,
        upcomingLessons: 3,
    },
}

export default function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:5000/api/student/dashboard')
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    setData(response.data)
                } else {
                    // Fallback to mock data
                    setData(MOCK_DASHBOARD_DATA)
                }
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to fetch dashboard, using mock data:', err)
                // Fallback to mock data when backend is unavailable
                setData(MOCK_DASHBOARD_DATA)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-slate-500">Failed to load dashboard</p>
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                    Welcome back, {data.student.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-slate-600">Continue your learning journey where you left off.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">{data.stats.totalCourses}</p>
                                <p className="text-xs text-slate-500">Total Courses</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">{data.stats.inProgressCourses}</p>
                                <p className="text-xs text-slate-500">In Progress</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                <Award className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">{data.stats.completedCourses}</p>
                                <p className="text-xs text-slate-500">Completed</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">{data.stats.upcomingLessons}</p>
                                <p className="text-xs text-slate-500">Upcoming Lessons</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* In Progress Section */}
            {data.inProgress && (
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-slate-900">Continue Learning</h2>
                    </div>
                    <Card className="bg-white border-0 shadow-sm overflow-hidden">
                        <div className="flex flex-col lg:flex-row">
                            {/* Course Thumbnail */}
                            <div className="lg:w-80 h-48 lg:h-auto relative">
                                <img
                                    src={data.inProgress.thumbnail}
                                    alt={data.inProgress.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r" />
                                <div className="absolute bottom-4 left-4 lg:hidden">
                                    <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded">
                                        {data.inProgress.progress}% Complete
                                    </span>
                                </div>
                            </div>

                            {/* Course Info */}
                            <div className="flex-1 p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                            {data.inProgress.name}
                                        </h3>
                                        <p className="text-sm text-slate-600 mb-1">
                                            Instructor: {data.inProgress.instructor}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {data.inProgress.duration}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <BookOpen className="w-4 h-4" />
                                                {data.inProgress.completedLessons}/{data.inProgress.totalLessons} lessons
                                            </span>
                                        </div>
                                    </div>
                                    <span className="hidden lg:inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                                        {data.inProgress.progress}% Complete
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-6">
                                    <Progress
                                        value={data.inProgress.progress}
                                        className="h-2 bg-slate-100"
                                        indicatorClassName="bg-emerald-500"
                                    />
                                </div>

                                <Link
                                    to={`/student/course/${data.inProgress.id}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                                >
                                    <Play className="w-4 h-4" />
                                    Continue Learning
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* All Courses Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-900">All Courses</h2>
                    <Link
                        to="/student/courses"
                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                    >
                        View All
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {data.courses.map((course) => (
                        <Link
                            key={course.id}
                            to={`/student/course/${course.id}`}
                            className="group"
                        >
                            <Card className="bg-white border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                {/* Thumbnail */}
                                <div className="relative h-36 overflow-hidden">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {course.progress === 100 && (
                                        <div className="absolute top-2 right-2 px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded">
                                            Completed
                                        </div>
                                    )}
                                </div>

                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                        {course.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 mb-3">{course.instructor}</p>

                                    {/* Progress */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-slate-500">
                                                {course.completedLessons}/{course.totalLessons} lessons
                                            </span>
                                            <span className="font-medium text-emerald-600">
                                                {course.progress}%
                                            </span>
                                        </div>
                                        <Progress
                                            value={course.progress}
                                            className="h-1.5 bg-slate-100"
                                            indicatorClassName="bg-emerald-500"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

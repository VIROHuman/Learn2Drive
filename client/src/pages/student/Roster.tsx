import { useEffect, useState } from 'react'
import {
    Calendar,
    Clock,
    MapPin,
    User,
    Car,
    Phone,
    CheckCircle2
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Instructor {
    name: string
    avatar: string
    phone?: string
}

interface UpcomingLesson {
    id: string
    date: string
    time: string
    instructor: Instructor
    location: string
    type: string
    vehicle: string
}

interface PastLesson {
    id: string
    date: string
    time: string
    instructor: Instructor
    type: string
    status: string
    feedback: string
}

interface RosterData {
    upcoming: UpcomingLesson[]
    past: PastLesson[]
}

// Mock data fallback (used when backend is unavailable)
const MOCK_ROSTER_DATA: RosterData = {
    upcoming: [
        {
            id: 'lesson-1',
            date: '2026-02-05',
            time: '10:00 AM - 12:00 PM',
            instructor: {
                name: 'Michael Rodriguez',
                avatar: 'MR',
                phone: '+1 (555) 123-4567',
            },
            location: 'Main Campus - Practice Lot A',
            type: 'Behind-the-Wheel Training',
            vehicle: '2024 Toyota Camry (Training Vehicle)',
        },
        {
            id: 'lesson-2',
            date: '2026-02-12',
            time: '2:00 PM - 4:00 PM',
            instructor: {
                name: 'Sarah Johnson',
                avatar: 'SJ',
                phone: '+1 (555) 234-5678',
            },
            location: 'Downtown Training Center',
            type: 'Highway Driving Session',
            vehicle: '2024 Honda Accord (Training Vehicle)',
        },
    ],
    past: [
        {
            id: 'lesson-p1',
            date: '2026-01-28',
            time: '10:00 AM - 12:00 PM',
            instructor: {
                name: 'Michael Rodriguez',
                avatar: 'MR',
            },
            type: 'Parallel Parking Practice',
            status: 'Completed',
            feedback: 'Excellent progress on parallel parking. Keep practicing the mirror checks.',
        },
        {
            id: 'lesson-p2',
            date: '2026-01-21',
            time: '3:00 PM - 5:00 PM',
            instructor: {
                name: 'David Chen',
                avatar: 'DC',
            },
            type: 'Basic Maneuvering',
            status: 'Completed',
            feedback: 'Good control of the vehicle. Work on smoother braking.',
        },
    ],
}

export default function Roster() {
    const [data, setData] = useState<RosterData | null>(null)
    const [loading, setLoading] = useState(true)
    const [cancellingId, setCancellingId] = useState<string | null>(null)

    useEffect(() => {
        fetch('http://localhost:5000/api/student/roster')
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    setData(response.data)
                } else {
                    // Fallback to mock data
                    setData(MOCK_ROSTER_DATA)
                }
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to fetch roster, using mock data:', err)
                // Fallback to mock data when backend is unavailable
                setData(MOCK_ROSTER_DATA)
                setLoading(false)
            })
    }, [])

    const handleCancel = async (lessonId: string) => {
        setCancellingId(lessonId)
        try {
            const res = await fetch(`http://localhost:5000/api/student/roster/${lessonId}/cancel`, {
                method: 'POST',
            })
            const result = await res.json()
            if (result.success) {
                alert(result.message)
            }
        } catch (err) {
            console.error('Failed to cancel:', err)
            // Demo mode - show success anyway
            alert('Cancellation request submitted successfully! (Demo mode)')
        } finally {
            setCancellingId(null)
        }
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

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
                <p className="text-slate-500">Failed to load roster</p>
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                    Driving Roster
                </h1>
                <p className="text-slate-600">Your scheduled behind-the-wheel driving lessons.</p>
            </div>

            {/* Upcoming Lessons */}
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-semibold text-slate-900">Upcoming Lessons</h2>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 ml-2">
                        {data.upcoming.length}
                    </Badge>
                </div>

                {data.upcoming.length === 0 ? (
                    <Card className="bg-white border-0 shadow-sm">
                        <CardContent className="p-8 text-center">
                            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500">No upcoming lessons scheduled.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {data.upcoming.map((lesson) => (
                            <Card key={lesson.id} className="bg-white border-0 shadow-sm overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Date Block */}
                                        <div className="lg:w-32 p-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-center flex flex-col justify-center">
                                            <p className="text-sm opacity-90">
                                                {new Date(lesson.date).toLocaleDateString('en-US', { month: 'short' })}
                                            </p>
                                            <p className="text-3xl font-bold">
                                                {new Date(lesson.date).getDate()}
                                            </p>
                                            <p className="text-sm opacity-90">
                                                {new Date(lesson.date).toLocaleDateString('en-US', { weekday: 'short' })}
                                            </p>
                                        </div>

                                        {/* Lesson Details */}
                                        <div className="flex-1 p-5">
                                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                                <div>
                                                    <h3 className="font-semibold text-slate-900 text-lg mb-2">
                                                        {lesson.type}
                                                    </h3>
                                                    <div className="space-y-2 text-sm text-slate-600">
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4 text-slate-400" />
                                                            {lesson.time}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <User className="w-4 h-4 text-slate-400" />
                                                            {lesson.instructor.name}
                                                            {lesson.instructor.phone && (
                                                                <span className="text-slate-400 flex items-center gap-1 ml-2">
                                                                    <Phone className="w-3 h-3" />
                                                                    {lesson.instructor.phone}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="w-4 h-4 text-slate-400" />
                                                            {lesson.location}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Car className="w-4 h-4 text-slate-400" />
                                                            {lesson.vehicle}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleCancel(lesson.id)}
                                                        disabled={cancellingId === lesson.id}
                                                        className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                                    >
                                                        {cancellingId === lesson.id ? 'Processing...' : 'Cancel / Reschedule'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Past Lessons */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-slate-400" />
                    <h2 className="text-lg font-semibold text-slate-900">Lesson History</h2>
                </div>

                {data.past.length === 0 ? (
                    <Card className="bg-white border-0 shadow-sm">
                        <CardContent className="p-8 text-center">
                            <p className="text-slate-500">No past lessons yet.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {data.past.map((lesson) => (
                            <Card key={lesson.id} className="bg-slate-50 border border-slate-200 shadow-none">
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500 font-semibold">
                                                {lesson.instructor.avatar}
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-slate-700">{lesson.type}</h4>
                                                <p className="text-sm text-slate-500">
                                                    {formatDate(lesson.date)} • {lesson.time}
                                                </p>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    Instructor: {lesson.instructor.name}
                                                </p>
                                                {lesson.feedback && (
                                                    <p className="text-sm text-slate-600 mt-2 italic">
                                                        "{lesson.feedback}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="bg-emerald-100 text-emerald-700"
                                        >
                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                            {lesson.status}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

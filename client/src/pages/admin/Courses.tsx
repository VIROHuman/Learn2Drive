import { useState, useEffect } from 'react'
import { BookOpen, Loader2, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CourseCard } from '@/components/admin/course-card'
import { AddCourseDialog } from '@/components/admin/add-course-dialog'

interface Course {
    id: string
    name: string
    content: string
    fee: number
    category: string
    categoryGroup: string
    categoryLabel: string
    thumbnail: string
    createdAt: string
}

// Mock data fallback (used when backend is unavailable)
const MOCK_COURSES: Course[] = [
    {
        id: 'course-1',
        name: 'Teen Complete Driving Package',
        content: 'Comprehensive driving education for teenagers including 32 hours of classroom instruction.',
        fee: 699,
        category: 'teen-full-package',
        categoryGroup: 'Teen Driver ED',
        categoryLabel: 'Full Package',
        thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
        createdAt: '2025-01-15T10:00:00Z',
    },
    {
        id: 'course-2',
        name: 'Teen Classroom Course',
        content: '32 hours of comprehensive classroom instruction covering traffic laws and road signs.',
        fee: 299,
        category: 'teen-classroom-only',
        categoryGroup: 'Teen Driver ED',
        categoryLabel: 'Classroom Only',
        thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400',
        createdAt: '2025-01-14T10:00:00Z',
    },
    {
        id: 'course-3',
        name: 'Teen Behind-the-Wheel Training',
        content: '14 hours of professional behind-the-wheel instruction with certified instructors.',
        fee: 449,
        category: 'teen-behind-the-wheel',
        categoryGroup: 'Teen Driver ED',
        categoryLabel: 'Behind-the-Wheel',
        thumbnail: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400',
        createdAt: '2025-01-13T10:00:00Z',
    },
    {
        id: 'course-4',
        name: 'Adult Classroom Refresher',
        content: '6-hour adult driver education course covering Texas traffic laws.',
        fee: 149,
        category: 'adult-classroom-only',
        categoryGroup: 'Adult Driver ED',
        categoryLabel: 'Classroom Only',
        thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
        createdAt: '2025-01-12T10:00:00Z',
    },
    {
        id: 'course-5',
        name: 'Adult Driving Lessons',
        content: 'Professional one-on-one driving lessons for adults. Flexible scheduling.',
        fee: 89,
        category: 'adult-driving-lessons',
        categoryGroup: 'Adult Driver ED',
        categoryLabel: 'Driving Lessons',
        thumbnail: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400',
        createdAt: '2025-01-11T10:00:00Z',
    },
    {
        id: 'course-6',
        name: 'DPS Complete Road Test Package',
        content: 'Everything you need to pass your DPS road test!',
        fee: 299,
        category: 'road-test-complete-deal',
        categoryGroup: 'Road Test',
        categoryLabel: 'DPS Authorized Complete Deal',
        thumbnail: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
        createdAt: '2025-01-10T10:00:00Z',
    },
]

export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const fetchCourses = async () => {
        try {
            setLoading(true)
            const response = await fetch('http://localhost:5000/api/courses')
            const data = await response.json()

            if (data.success) {
                setCourses(data.data)
            } else {
                // Fallback to mock data
                setCourses(MOCK_COURSES)
            }
        } catch (err) {
            console.error('Error fetching courses, using mock data:', err)
            // Fallback to mock data when backend is unavailable
            setCourses(MOCK_COURSES)
            setError(null) // Clear error since we have fallback data
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    // Filter courses by search query
    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Course Management</h1>
                    <p className="text-slate-600 mt-2">Manage and organize all available driving courses.</p>
                </div>
                <AddCourseDialog onCourseAdded={fetchCourses} />
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                    type="text"
                    placeholder="Search by course name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        ×
                    </button>
                )}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#c83d18]" />
                    <span className="ml-2 text-slate-600">Loading courses...</span>
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={fetchCourses}
                        className="mt-2 text-sm text-red-700 underline hover:no-underline"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && courses.length === 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-12 text-center">
                    <BookOpen className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700">No courses yet</h3>
                    <p className="text-slate-500 mt-1">Create your first course to get started.</p>
                </div>
            )}

            {/* No Search Results */}
            {!loading && !error && courses.length > 0 && filteredCourses.length === 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-12 text-center">
                    <Search className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700">No courses found</h3>
                    <p className="text-slate-500 mt-1">
                        No courses match "{searchQuery}". Try a different search term.
                    </p>
                </div>
            )}

            {/* Course Grid */}
            {!loading && !error && filteredCourses.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            id={course.id}
                            name={course.name}
                            categoryLabel={course.categoryLabel}
                            categoryGroup={course.categoryGroup}
                            fee={course.fee}
                            thumbnail={course.thumbnail}
                        />
                    ))}
                </div>
            )}

            {/* Stats */}
            {!loading && !error && courses.length > 0 && (
                <div className="flex items-center gap-6 pt-4 border-t border-slate-200 text-sm text-slate-500">
                    <span>
                        <strong className="text-slate-900">
                            {filteredCourses.length}
                            {searchQuery && ` of ${courses.length}`}
                        </strong> courses
                    </span>
                    <span>
                        <strong className="text-slate-900">
                            {courses.filter(c => c.categoryGroup === 'Teen Driver ED').length}
                        </strong> Teen Driver ED
                    </span>
                    <span>
                        <strong className="text-slate-900">
                            {courses.filter(c => c.categoryGroup === 'Adult Driver ED').length}
                        </strong> Adult Driver ED
                    </span>
                    <span>
                        <strong className="text-slate-900">
                            {courses.filter(c => c.categoryGroup === 'Road Test').length}
                        </strong> Road Test
                    </span>
                </div>
            )}
        </div>
    )
}

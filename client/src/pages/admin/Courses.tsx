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
                setError('Failed to fetch courses')
            }
        } catch (err) {
            console.error('Error fetching courses:', err)
            setError('Failed to connect to server')
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

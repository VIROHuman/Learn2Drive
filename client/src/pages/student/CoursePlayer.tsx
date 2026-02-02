import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
    Play,
    Pause,
    ChevronDown,
    ChevronRight,
    CheckCircle2,
    Circle,
    Clock,
    FileText,
    MessageSquare,
    StickyNote,
    Volume2,
    Maximize,
    Settings,
    SkipBack,
    SkipForward,
    ArrowLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Lesson {
    id: string
    title: string
    duration: string
    completed: boolean
    type: 'video' | 'quiz'
}

interface Module {
    id: string
    title: string
    duration: string
    lessons: Lesson[]
}

interface CourseData {
    id: string
    name: string
    description: string
    instructor: string
    thumbnail: string
    totalDuration: string
    modules: Module[]
}

// Mock data fallback (used when backend is unavailable)
const createMockCourse = (id: string): CourseData => ({
    id: id || 'course-1',
    name: 'Teen Complete Driving Package',
    description: 'Comprehensive driving education for teenagers including 32 hours of classroom instruction, 14 hours of behind-the-wheel training, and full DMV test preparation. This course covers all essential skills for safe driving.',
    instructor: 'Michael Rodriguez',
    thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
    totalDuration: '32 hours',
    modules: [
        {
            id: 'mod-1',
            title: 'Module 1: Introduction to Driving',
            duration: '2 hours',
            lessons: [
                { id: 'les-1', title: 'Welcome & Course Overview', duration: '10:00', completed: true, type: 'video' },
                { id: 'les-2', title: 'Understanding Your Vehicle', duration: '25:00', completed: true, type: 'video' },
                { id: 'les-3', title: 'Basic Controls & Dashboard', duration: '20:00', completed: false, type: 'video' },
                { id: 'les-4', title: 'Module 1 Quiz', duration: '15:00', completed: false, type: 'quiz' },
            ],
        },
        {
            id: 'mod-2',
            title: 'Module 2: Traffic Laws & Regulations',
            duration: '4 hours',
            lessons: [
                { id: 'les-5', title: 'Traffic Signs & Signals', duration: '30:00', completed: false, type: 'video' },
                { id: 'les-6', title: 'Right of Way Rules', duration: '25:00', completed: false, type: 'video' },
                { id: 'les-7', title: 'Speed Limits & Zones', duration: '20:00', completed: false, type: 'video' },
                { id: 'les-8', title: 'Module 2 Quiz', duration: '20:00', completed: false, type: 'quiz' },
            ],
        },
        {
            id: 'mod-3',
            title: 'Module 3: Defensive Driving',
            duration: '3 hours',
            lessons: [
                { id: 'les-9', title: 'Hazard Recognition', duration: '30:00', completed: false, type: 'video' },
                { id: 'les-10', title: 'Safe Following Distance', duration: '20:00', completed: false, type: 'video' },
                { id: 'les-11', title: 'Weather Conditions', duration: '25:00', completed: false, type: 'video' },
            ],
        },
    ],
})

export default function CoursePlayer() {
    const { id } = useParams<{ id: string }>()
    const [course, setCourse] = useState<CourseData | null>(null)
    const [loading, setLoading] = useState(true)
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
    const [activeTab, setActiveTab] = useState<'overview' | 'qna' | 'notes'>('overview')
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)

    useEffect(() => {
        fetch(`http://localhost:5000/api/course/${id}`)
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    setCourse(response.data)
                    // Expand first module by default
                    if (response.data.modules.length > 0) {
                        setExpandedModules(new Set([response.data.modules[0].id]))
                        // Set first incomplete lesson as current
                        for (const mod of response.data.modules) {
                            const incomplete = mod.lessons.find((l: Lesson) => !l.completed)
                            if (incomplete) {
                                setCurrentLesson(incomplete)
                                break
                            }
                        }
                    }
                } else {
                    // Fallback to mock data
                    const mockCourse = createMockCourse(id || 'course-1')
                    setCourse(mockCourse)
                    setExpandedModules(new Set([mockCourse.modules[0].id]))
                    const incomplete = mockCourse.modules[0].lessons.find(l => !l.completed)
                    if (incomplete) setCurrentLesson(incomplete)
                }
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to fetch course, using mock data:', err)
                // Fallback to mock data when backend is unavailable
                const mockCourse = createMockCourse(id || 'course-1')
                setCourse(mockCourse)
                setExpandedModules(new Set([mockCourse.modules[0].id]))
                const incomplete = mockCourse.modules[0].lessons.find(l => !l.completed)
                if (incomplete) setCurrentLesson(incomplete)
                setLoading(false)
            })
    }, [id])

    const toggleModule = (moduleId: string) => {
        const newExpanded = new Set(expandedModules)
        if (newExpanded.has(moduleId)) {
            newExpanded.delete(moduleId)
        } else {
            newExpanded.add(moduleId)
        }
        setExpandedModules(newExpanded)
    }

    const getCompletedCount = (lessons: Lesson[]) => {
        return lessons.filter(l => l.completed).length
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full bg-slate-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="flex items-center justify-center h-full bg-slate-900">
                <p className="text-slate-400">Course not found</p>
            </div>
        )
    }

    return (
        <div className="flex h-full bg-white">
            {/* Left Side - Video Player & Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Video Player */}
                <div className="bg-black">
                    {/* Back Button */}
                    <div className="px-4 py-2 bg-slate-900">
                        <Link
                            to="/student/dashboard"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Link>
                    </div>

                    {/* Video Container - 16:9 Aspect Ratio */}
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                            {/* Video Placeholder */}
                            <div className="text-center">
                                <div
                                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
                                    onClick={() => setIsPlaying(!isPlaying)}
                                >
                                    {isPlaying ? (
                                        <Pause className="w-8 h-8 text-white" />
                                    ) : (
                                        <Play className="w-8 h-8 text-white ml-1" />
                                    )}
                                </div>
                                <p className="text-slate-400 text-sm">
                                    {currentLesson?.title || 'Select a lesson to start'}
                                </p>
                            </div>

                            {/* Video Controls Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                {/* Progress Bar */}
                                <div className="w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer group">
                                    <div className="h-full w-1/3 bg-emerald-500 rounded-full relative">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <button className="text-white/80 hover:text-white transition-colors">
                                            <SkipBack className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="text-white"
                                            onClick={() => setIsPlaying(!isPlaying)}
                                        >
                                            {isPlaying ? (
                                                <Pause className="w-6 h-6" />
                                            ) : (
                                                <Play className="w-6 h-6" />
                                            )}
                                        </button>
                                        <button className="text-white/80 hover:text-white transition-colors">
                                            <SkipForward className="w-5 h-5" />
                                        </button>
                                        <span className="text-white/80 text-sm ml-2">0:00 / {currentLesson?.duration || '0:00'}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button className="text-white/80 hover:text-white transition-colors">
                                            <Volume2 className="w-5 h-5" />
                                        </button>
                                        <button className="text-white/80 hover:text-white transition-colors">
                                            <Settings className="w-5 h-5" />
                                        </button>
                                        <button className="text-white/80 hover:text-white transition-colors">
                                            <Maximize className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Tabs */}
                <div className="flex-1 overflow-auto">
                    {/* Tab Headers */}
                    <div className="border-b border-slate-200 px-6">
                        <div className="flex gap-6">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={cn(
                                    "py-4 px-1 text-sm font-medium border-b-2 transition-colors",
                                    activeTab === 'overview'
                                        ? 'border-emerald-600 text-emerald-600'
                                        : 'border-transparent text-slate-600 hover:text-slate-900'
                                )}
                            >
                                <FileText className="w-4 h-4 inline mr-2" />
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('qna')}
                                className={cn(
                                    "py-4 px-1 text-sm font-medium border-b-2 transition-colors",
                                    activeTab === 'qna'
                                        ? 'border-emerald-600 text-emerald-600'
                                        : 'border-transparent text-slate-600 hover:text-slate-900'
                                )}
                            >
                                <MessageSquare className="w-4 h-4 inline mr-2" />
                                Q&A
                            </button>
                            <button
                                onClick={() => setActiveTab('notes')}
                                className={cn(
                                    "py-4 px-1 text-sm font-medium border-b-2 transition-colors",
                                    activeTab === 'notes'
                                        ? 'border-emerald-600 text-emerald-600'
                                        : 'border-transparent text-slate-600 hover:text-slate-900'
                                )}
                            >
                                <StickyNote className="w-4 h-4 inline mr-2" />
                                Notes
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900 mb-4">{course.name}</h2>
                                <p className="text-slate-600 mb-6">{course.description}</p>

                                <div className="flex items-center gap-6 text-sm text-slate-500">
                                    <span>Instructor: <span className="text-slate-900">{course.instructor}</span></span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {course.totalDuration}
                                    </span>
                                </div>
                            </div>
                        )}

                        {activeTab === 'qna' && (
                            <div className="text-center py-12">
                                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="font-medium text-slate-900 mb-2">Ask a Question</h3>
                                <p className="text-sm text-slate-500 mb-4">
                                    Have a question about this lesson? Post it here and get help from instructors and peers.
                                </p>
                                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">
                                    Ask New Question
                                </button>
                            </div>
                        )}

                        {activeTab === 'notes' && (
                            <div>
                                <div className="border border-slate-200 rounded-lg p-4">
                                    <textarea
                                        placeholder="Add your notes for this lesson..."
                                        className="w-full h-40 resize-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
                                    />
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">
                                        Save Note
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side - Course Content Sidebar */}
            <div className="w-96 border-l border-slate-200 flex flex-col bg-slate-50 hidden lg:flex">
                <div className="p-4 border-b border-slate-200 bg-white">
                    <h3 className="font-semibold text-slate-900">Course Content</h3>
                    <p className="text-sm text-slate-500 mt-1">
                        {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons • {course.totalDuration}
                    </p>
                </div>

                {/* Modules Accordion */}
                <div className="flex-1 overflow-auto">
                    {course.modules.map((module) => (
                        <div key={module.id} className="border-b border-slate-200">
                            {/* Module Header */}
                            <button
                                onClick={() => toggleModule(module.id)}
                                className="w-full px-4 py-3 bg-white hover:bg-slate-50 flex items-center justify-between text-left transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    {expandedModules.has(module.id) ? (
                                        <ChevronDown className="w-5 h-5 text-slate-400" />
                                    ) : (
                                        <ChevronRight className="w-5 h-5 text-slate-400" />
                                    )}
                                    <div>
                                        <h4 className="font-medium text-slate-900 text-sm">{module.title}</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            {getCompletedCount(module.lessons)}/{module.lessons.length} • {module.duration}
                                        </p>
                                    </div>
                                </div>
                            </button>

                            {/* Lessons */}
                            {expandedModules.has(module.id) && (
                                <div className="bg-slate-50">
                                    {module.lessons.map((lesson) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() => setCurrentLesson(lesson)}
                                            className={cn(
                                                "w-full px-4 py-3 flex items-start gap-3 text-left hover:bg-slate-100 transition-colors border-l-2",
                                                currentLesson?.id === lesson.id
                                                    ? 'bg-emerald-50 border-emerald-500'
                                                    : 'border-transparent'
                                            )}
                                        >
                                            {lesson.completed ? (
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className={cn(
                                                    "text-sm",
                                                    lesson.completed ? 'text-slate-500' : 'text-slate-900',
                                                    currentLesson?.id === lesson.id && 'font-medium text-emerald-700'
                                                )}>
                                                    {lesson.title}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {lesson.type === 'video' ? (
                                                        <Play className="w-3 h-3 text-slate-400" />
                                                    ) : (
                                                        <FileText className="w-3 h-3 text-slate-400" />
                                                    )}
                                                    <span className="text-xs text-slate-400">{lesson.duration}</span>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

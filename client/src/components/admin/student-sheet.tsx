import { X, BookOpen, Calendar, Award, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface StudentPerformance {
    enrolledCourse: string
    status: 'Active' | 'Completed'
    progress: number
    quizAverageScore: number
    expirationDate: string
}

interface StudentSheetProps {
    student: {
        id: string
        name: string
        email: string
        phone: string
        amountPaid: number | null
        datePaid: string | null
        performance: StudentPerformance | null
    }
    isOpen: boolean
    onClose: () => void
}

export function StudentSheet({ student, isOpen, onClose }: StudentSheetProps) {
    if (!isOpen) return null

    const performance = student.performance

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Sheet */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl transform transition-transform duration-300 overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
                            <p className="text-sm text-slate-500">{student.email}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-500" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Payment Info */}
                    <Card className="p-4 border-slate-200 bg-green-50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-full">
                                <Award className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-green-600 font-medium">Payment Received</p>
                                <p className="text-xl font-bold text-green-700">
                                    ${student.amountPaid?.toLocaleString()}
                                </p>
                                <p className="text-xs text-green-600">on {student.datePaid}</p>
                            </div>
                        </div>
                    </Card>

                    {performance && (
                        <>
                            {/* Enrolled Course */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-slate-500" />
                                    <span className="text-sm font-medium text-slate-700">Enrolled Course</span>
                                </div>
                                <Card className="p-4 border-slate-200">
                                    <h3 className="font-semibold text-slate-900">{performance.enrolledCourse}</h3>
                                    <Badge
                                        className={
                                            performance.status === 'Completed'
                                                ? 'bg-green-100 text-green-800 border-green-200 mt-2'
                                                : 'bg-blue-100 text-blue-800 border-blue-200 mt-2'
                                        }
                                    >
                                        {performance.status}
                                    </Badge>
                                </Card>
                            </div>

                            {/* Progress */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-slate-500" />
                                        <span className="text-sm font-medium text-slate-700">Course Progress</span>
                                    </div>
                                    <span className="text-sm font-bold text-[#c83d18]">{performance.progress}%</span>
                                </div>
                                <Progress value={performance.progress} className="h-3" />
                            </div>

                            {/* Quiz Score */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-slate-500" />
                                    <span className="text-sm font-medium text-slate-700">Quiz Average Score</span>
                                </div>
                                <Card className="p-4 border-slate-200 text-center">
                                    <span className="text-3xl font-bold text-slate-900">{performance.quizAverageScore}</span>
                                    <span className="text-lg text-slate-500">/100</span>
                                    <p className="text-sm text-slate-500 mt-1">
                                        {performance.quizAverageScore >= 90
                                            ? 'Excellent!'
                                            : performance.quizAverageScore >= 80
                                                ? 'Great job!'
                                                : performance.quizAverageScore >= 70
                                                    ? 'Good progress'
                                                    : 'Needs improvement'}
                                    </p>
                                </Card>
                            </div>

                            {/* Expiration Date */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-slate-500" />
                                    <span className="text-sm font-medium text-slate-700">Course Expiration</span>
                                </div>
                                <Card className="p-4 border-slate-200">
                                    <p className="text-lg font-semibold text-slate-900">
                                        {new Date(performance.expirationDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                    {new Date(performance.expirationDate) < new Date() && (
                                        <Badge className="bg-red-100 text-red-800 border-red-200 mt-2">Expired</Badge>
                                    )}
                                </Card>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

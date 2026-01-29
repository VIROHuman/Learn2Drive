import { useState, useEffect } from 'react'
import { Mail, Loader2, MoreVertical, Eye, Send, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { StudentSheet } from '@/components/admin/student-sheet'

interface StudentPerformance {
    enrolledCourse: string
    status: 'Active' | 'Completed'
    progress: number
    quizAverageScore: number
    expirationDate: string
}

interface Student {
    id: string
    name: string
    email: string
    phone: string
    amountPaid: number | null
    datePaid: string | null
    status: 'paid' | 'unpaid'
    performance: StudentPerformance | null
}

export default function Sales() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
    const [sendingInvite, setSendingInvite] = useState<string | null>(null)

    const fetchStudents = async () => {
        try {
            setLoading(true)
            const response = await fetch('http://localhost:5000/api/sales')
            const data = await response.json()

            if (data.success) {
                setStudents(data.data)
            } else {
                setError('Failed to fetch sales data')
            }
        } catch (err) {
            console.error('Error fetching sales:', err)
            setError('Failed to connect to server')
        } finally {
            setLoading(false)
        }
    }

    const handleSendInvite = async (studentId: string, studentName: string) => {
        setSendingInvite(studentId)

        try {
            const response = await fetch('http://localhost:5000/api/sales/invite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ studentId }),
            })

            const data = await response.json()

            if (data.success) {
                alert(`Payment reminder sent to ${studentName}!`)
            } else {
                alert(data.error || 'Failed to send invite')
            }
        } catch (err) {
            console.error('Error sending invite:', err)
            alert('Failed to connect to server')
        } finally {
            setSendingInvite(null)
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    const handleRowClick = (student: Student) => {
        if (student.status === 'paid') {
            setSelectedStudent(student)
        }
    }

    const paidCount = students.filter(s => s.status === 'paid').length
    const unpaidCount = students.filter(s => s.status === 'unpaid').length
    const totalRevenue = students.reduce((sum, s) => sum + (s.amountPaid || 0), 0)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Sales</h1>
                <p className="text-slate-600 mt-2">Manage and track all sales transactions and student payments.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 border-slate-200">
                    <p className="text-sm text-slate-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-[#c83d18]">${totalRevenue.toLocaleString()}</p>
                </Card>
                <Card className="p-4 border-slate-200">
                    <p className="text-sm text-slate-500">Paid Students</p>
                    <p className="text-2xl font-bold text-green-600">{paidCount}</p>
                </Card>
                <Card className="p-4 border-slate-200">
                    <p className="text-sm text-slate-500">Pending Payments</p>
                    <p className="text-2xl font-bold text-red-600">{unpaidCount}</p>
                </Card>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#c83d18]" />
                    <span className="ml-2 text-slate-600">Loading sales data...</span>
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={fetchStudents}
                        className="mt-2 text-sm text-red-700 underline hover:no-underline"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Sales Table */}
            {!loading && !error && (
                <Card className="border-slate-200">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-200 hover:bg-slate-50">
                                <TableHead className="text-slate-700 font-semibold">Name</TableHead>
                                <TableHead className="text-slate-700 font-semibold">Email</TableHead>
                                <TableHead className="text-slate-700 font-semibold">Phone</TableHead>
                                <TableHead className="text-slate-700 font-semibold">Amount Paid</TableHead>
                                <TableHead className="text-slate-700 font-semibold">Date Paid</TableHead>
                                <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                                <TableHead className="w-10 text-right" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow
                                    key={student.id}
                                    className={`border-slate-200 transition-colors ${student.status === 'paid'
                                            ? 'hover:bg-blue-50 cursor-pointer'
                                            : 'hover:bg-slate-50'
                                        }`}
                                    onClick={() => handleRowClick(student)}
                                >
                                    <TableCell className="font-medium text-slate-900">{student.name}</TableCell>
                                    <TableCell className="text-slate-600">{student.email}</TableCell>
                                    <TableCell className="text-slate-600">{student.phone}</TableCell>
                                    <TableCell className="font-medium text-slate-900">
                                        {student.amountPaid ? `$${student.amountPaid.toLocaleString()}` : '-'}
                                    </TableCell>
                                    <TableCell className="text-slate-600">
                                        {student.datePaid || '-'}
                                    </TableCell>
                                    <TableCell>
                                        {student.status === 'paid' ? (
                                            <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                                                <span className="w-2 h-2 bg-green-600 rounded-full mr-2 inline-block" />
                                                Paid
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">
                                                <span className="w-2 h-2 bg-red-600 rounded-full mr-2 inline-block" />
                                                Unpaid
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                                                    <MoreVertical className="w-4 h-4 text-slate-600" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                {student.status === 'paid' && (
                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center gap-2"
                                                        onClick={() => setSelectedStudent(student)}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        View Performance
                                                    </DropdownMenuItem>
                                                )}
                                                {student.status === 'unpaid' && (
                                                    <DropdownMenuItem
                                                        className="cursor-pointer flex items-center gap-2 text-blue-600"
                                                        onClick={() => handleSendInvite(student.id, student.name)}
                                                        disabled={sendingInvite === student.id}
                                                    >
                                                        {sendingInvite === student.id ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <Mail className="w-4 h-4" />
                                                        )}
                                                        Send Invite
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                                                    <Send className="w-4 h-4" />
                                                    Send Email
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-red-600">
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            )}

            {/* Student Performance Sheet */}
            {selectedStudent && (
                <StudentSheet
                    student={selectedStudent}
                    isOpen={!!selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                />
            )}

            {/* Help Text */}
            {!loading && !error && students.length > 0 && (
                <p className="text-sm text-slate-500">
                    💡 Click on a <strong>Paid</strong> row to view student performance details.
                </p>
            )}
        </div>
    )
}

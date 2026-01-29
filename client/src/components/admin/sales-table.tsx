import { useState } from 'react'
import { Mail, Download, Filter, MoreVertical, Eye, Send, Pencil, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

const salesData = [
    {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        amtPaid: '$2,500',
        datePaid: 'Jan 15, 2025',
        status: 'paid',
        courseDetails: {
            courseName: 'Advanced Driving Techniques',
            progress: '85%',
            status: 'In Progress',
        },
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 234-5678',
        amtPaid: '$1,500',
        datePaid: 'Jan 10, 2025',
        status: 'paid',
        courseDetails: {
            courseName: 'Defensive Driving',
            progress: '100%',
            status: 'Completed',
        },
    },
    {
        id: 3,
        name: 'Mike Davis',
        email: 'mike.davis@email.com',
        phone: '+1 (555) 345-6789',
        amtPaid: '-',
        datePaid: '-',
        status: 'unpaid',
        courseDetails: null,
    },
    {
        id: 4,
        name: 'Emily Chen',
        email: 'emily.chen@email.com',
        phone: '+1 (555) 456-7890',
        amtPaid: '$3,000',
        datePaid: 'Jan 12, 2025',
        status: 'paid',
        courseDetails: {
            courseName: 'Professional Fleet Management',
            progress: '65%',
            status: 'In Progress',
        },
    },
    {
        id: 5,
        name: 'Robert Wilson',
        email: 'robert.w@email.com',
        phone: '+1 (555) 567-8901',
        amtPaid: '-',
        datePaid: '-',
        status: 'unpaid',
        courseDetails: null,
    },
]

export function SalesTable() {
    const [expandedRow, setExpandedRow] = useState<number | null>(null)
    const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'unpaid'>('all')
    const [sortBy, setSortBy] = useState<'name' | 'date' | 'amount'>('date')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const filteredData = salesData.filter((item) => {
        if (statusFilter === 'all') return true
        return item.status === statusFilter
    })

    const sortedData = [...filteredData].sort((a, b) => {
        let compareA: any = a[sortBy as keyof typeof a]
        let compareB: any = b[sortBy as keyof typeof b]

        if (sortBy === 'amount') {
            compareA = parseInt(a.amtPaid.replace(/[^0-9]/g, '')) || 0
            compareB = parseInt(b.amtPaid.replace(/[^0-9]/g, '')) || 0
        }

        if (sortOrder === 'asc') {
            return compareA > compareB ? 1 : -1
        } else {
            return compareA < compareB ? 1 : -1
        }
    })

    const totalPages = Math.ceil(sortedData.length / rowsPerPage)
    const paginatedData = sortedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

    const handleSort = (column: 'name' | 'date' | 'amount') => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(column)
            setSortOrder('desc')
        }
    }

    return (
        <Card className="p-6 border-slate-200">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Sales Management</h3>
                <p className="text-sm text-slate-500 mt-1">Track and manage all transactions</p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 pb-6 border-b border-slate-200">
                {/* Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-600" />
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value as any)
                            setCurrentPage(1)
                        }}
                        className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83d18] focus:ring-offset-2"
                    >
                        <option value="all">All Status</option>
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                    </select>
                </div>

                {/* Date Range Picker Placeholder */}
                <input
                    type="date"
                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c83d18] focus:ring-offset-2"
                    placeholder="Select date range"
                />

                {/* Export Button */}
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors ml-auto">
                    <Download className="w-4 h-4" />
                    Download CSV
                </button>
            </div>

            {/* Rows Per Page */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-slate-600">Show</span>
                <select
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(Number(e.target.value))
                        setCurrentPage(1)
                    }}
                    className="px-3 py-1 border border-slate-200 rounded-lg text-sm bg-white text-slate-700"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
                <span className="text-sm text-slate-600">rows per page</span>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-slate-200 hover:bg-slate-50">
                            <TableHead className="text-slate-700 font-semibold cursor-pointer hover:text-slate-900" onClick={() => handleSort('name')}>
                                <div className="flex items-center gap-2">
                                    Name
                                    {sortBy === 'name' && <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                                </div>
                            </TableHead>
                            <TableHead className="text-slate-700 font-semibold">Email</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Phone</TableHead>
                            <TableHead className="text-slate-700 font-semibold cursor-pointer hover:text-slate-900" onClick={() => handleSort('amount')}>
                                <div className="flex items-center gap-2">
                                    Amt Paid
                                    {sortBy === 'amount' && <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                                </div>
                            </TableHead>
                            <TableHead className="text-slate-700 font-semibold cursor-pointer hover:text-slate-900" onClick={() => handleSort('date')}>
                                <div className="flex items-center gap-2">
                                    Date Paid
                                    {sortBy === 'date' && <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                                </div>
                            </TableHead>
                            <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                            <TableHead className="w-10 text-right" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.flatMap((row) => {
                            const rows = [
                                <TableRow key={`row-${row.id}`} className="border-slate-200 hover:bg-slate-50 transition-colors">
                                    <TableCell className="font-medium text-slate-900">{row.name}</TableCell>
                                    <TableCell className="text-slate-600">{row.email}</TableCell>
                                    <TableCell className="text-slate-600">{row.phone}</TableCell>
                                    <TableCell className="font-medium text-slate-900">{row.amtPaid}</TableCell>
                                    <TableCell className="text-slate-600">{row.datePaid}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {row.status === 'paid' ? (
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
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                                                    <MoreVertical className="w-4 h-4 text-slate-600" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                                                    <Eye className="w-4 h-4" />
                                                    View Details
                                                </DropdownMenuItem>
                                                {row.status === 'paid' && (
                                                    <>
                                                        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                                                            <Send className="w-4 h-4" />
                                                            Resend Invoice
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                                                            <Pencil className="w-4 h-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                                {row.status === 'unpaid' && (
                                                    <>
                                                        <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-blue-600">
                                                            <Mail className="w-4 h-4" />
                                                            Invite Email
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                                <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-red-600">
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>,
                            ]

                            if (expandedRow === row.id && row.courseDetails) {
                                rows.push(
                                    <TableRow key={`details-${row.id}`} className="bg-slate-50 border-slate-200">
                                        <TableCell colSpan={8} className="py-4">
                                            <div className="pl-4 space-y-3">
                                                <div className="grid grid-cols-3 gap-6">
                                                    <div>
                                                        <p className="text-xs font-semibold text-slate-600 uppercase">Course Name</p>
                                                        <p className="text-sm font-medium text-slate-900 mt-1">
                                                            {row.courseDetails.courseName}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-semibold text-slate-600 uppercase">Progress</p>
                                                        <p className="text-sm font-medium text-slate-900 mt-1">
                                                            {row.courseDetails.progress}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-semibold text-slate-600 uppercase">Status</p>
                                                        <p className="text-sm font-medium text-slate-900 mt-1">
                                                            {row.courseDetails.status}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            }

                            return rows
                        })}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-6">
                <div className="text-sm text-slate-600">
                    Showing <strong>{(currentPage - 1) * rowsPerPage + 1}</strong> to <strong>{Math.min(currentPage * rowsPerPage, sortedData.length)}</strong> of <strong>{sortedData.length}</strong> results
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            const isCurrentPage = currentPage === page
                            const pageClass = isCurrentPage ? 'bg-[#c83d18] text-white' : 'text-slate-700 border border-slate-200 hover:bg-slate-50'
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${pageClass}`}
                                >
                                    {page}
                                </button>
                            )
                        })}
                    </div>

                    <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </Card>
    )
}

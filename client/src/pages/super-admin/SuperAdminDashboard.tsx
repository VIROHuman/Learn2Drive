import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Building2,
    DollarSign,
    CheckCircle,
    XCircle,
    Clock,
    TrendingUp,
    Search,
    Loader2,
} from 'lucide-react'

// Types
interface School {
    id: string
    name: string
    email: string
    phone: string
    state: string
    registeredAt: string
    status: 'active' | 'pending' | 'inactive'
    subscriptionFee?: number
    rejectionRemarks?: string
}

// Mock data
const initialSchools: School[] = [
    {
        id: '1',
        name: 'Pacific Coast Driving Academy',
        email: 'contact@pacificdriving.com',
        phone: '(415) 555-0123',
        state: 'California',
        registeredAt: '2026-01-28',
        status: 'pending',
    },
    {
        id: '2',
        name: 'Metro Drive School',
        email: 'info@metrodrive.com',
        phone: '(212) 555-0456',
        state: 'New York',
        registeredAt: '2026-01-27',
        status: 'pending',
    },
    {
        id: '3',
        name: 'Sunshine Driving Institute',
        email: 'hello@sunshinedriving.com',
        phone: '(305) 555-0789',
        state: 'Florida',
        registeredAt: '2026-01-25',
        status: 'active',
        subscriptionFee: 299,
    },
    {
        id: '4',
        name: 'Mountain View Auto School',
        email: 'admin@mvautoshool.com',
        phone: '(303) 555-0321',
        state: 'Colorado',
        registeredAt: '2026-01-20',
        status: 'active',
        subscriptionFee: 199,
    },
    {
        id: '5',
        name: 'Gateway Driving Center',
        email: 'team@gatewaydriving.com',
        phone: '(314) 555-0654',
        state: 'Missouri',
        registeredAt: '2026-01-15',
        status: 'inactive',
        rejectionRemarks: 'Incomplete documentation provided.',
    },
    {
        id: '6',
        name: 'Coastal Driving Academy',
        email: 'info@coastaldriving.com',
        phone: '(843) 555-0987',
        state: 'South Carolina',
        registeredAt: '2026-01-29',
        status: 'pending',
    },
]

export default function SuperAdminDashboard() {
    const [schools, setSchools] = useState<School[]>(initialSchools)
    const [activeTab, setActiveTab] = useState('pending')
    const [searchQuery, setSearchQuery] = useState('')

    // Modal states
    const [approveModalOpen, setApproveModalOpen] = useState(false)
    const [rejectModalOpen, setRejectModalOpen] = useState(false)
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null)
    const [subscriptionFee, setSubscriptionFee] = useState('')
    const [rejectionRemarks, setRejectionRemarks] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    // Filter schools
    const filteredSchools = useMemo(() => {
        return schools.filter((school) => {
            const matchesTab = school.status === activeTab
            const matchesSearch =
                school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                school.email.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesTab && matchesSearch
        })
    }, [schools, activeTab, searchQuery])

    // Stats calculation
    const stats = useMemo(() => {
        const activeSchools = schools.filter((s) => s.status === 'active')
        const totalMRR = activeSchools.reduce((sum, s) => sum + (s.subscriptionFee || 0), 0)
        const pendingCount = schools.filter((s) => s.status === 'pending').length

        return {
            totalLicensedSchools: activeSchools.length,
            totalMRR,
            pendingApprovals: pendingCount,
        }
    }, [schools])

    // Handle approve
    const handleApprove = (school: School) => {
        setSelectedSchool(school)
        setSubscriptionFee('')
        setApproveModalOpen(true)
    }

    const confirmApprove = async () => {
        if (!selectedSchool || !subscriptionFee) return

        setIsProcessing(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setSchools((prev) =>
            prev.map((s) =>
                s.id === selectedSchool.id
                    ? { ...s, status: 'active' as const, subscriptionFee: parseFloat(subscriptionFee) }
                    : s
            )
        )

        setIsProcessing(false)
        setApproveModalOpen(false)
        setSelectedSchool(null)
    }

    // Handle reject
    const handleReject = (school: School) => {
        setSelectedSchool(school)
        setRejectionRemarks('')
        setRejectModalOpen(true)
    }

    const confirmReject = async () => {
        if (!selectedSchool || !rejectionRemarks) return

        setIsProcessing(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setSchools((prev) =>
            prev.map((s) =>
                s.id === selectedSchool.id
                    ? { ...s, status: 'inactive' as const, rejectionRemarks }
                    : s
            )
        )

        setIsProcessing(false)
        setRejectModalOpen(false)
        setSelectedSchool(null)
    }

    // Format currency
    const formatCurrency = (value: string) => {
        const num = value.replace(/[^\d.]/g, '')
        return num
    }

    // Status badge component
    const StatusBadge = ({ status }: { status: School['status'] }) => {
        const config = {
            active: {
                className: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                icon: CheckCircle,
                label: 'Active',
            },
            pending: {
                className: 'bg-amber-100 text-amber-700 border-amber-200',
                icon: Clock,
                label: 'Pending',
            },
            inactive: {
                className: 'bg-slate-100 text-slate-600 border-slate-200',
                icon: XCircle,
                label: 'Inactive',
            },
        }

        const { className, icon: Icon, label } = config[status]

        return (
            <Badge className={`${className} border hover:${className}`}>
                <Icon className="w-3 h-3 mr-1" />
                {label}
            </Badge>
        )
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Licensed Schools */}
                <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Licensed Schools</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">
                                    {stats.totalLicensedSchools}
                                </p>
                            </div>
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                                <Building2 className="w-7 h-7 text-blue-600" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4 text-sm text-emerald-600">
                            <TrendingUp className="w-4 h-4" />
                            <span>+2 this month</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Monthly Recurring Revenue */}
                <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Monthly Recurring Revenue</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">
                                    ${stats.totalMRR.toLocaleString()}
                                </p>
                            </div>
                            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
                                <DollarSign className="w-7 h-7 text-emerald-600" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4 text-sm text-emerald-600">
                            <TrendingUp className="w-4 h-4" />
                            <span>+12% from last month</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Pending Approvals */}
                <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Pending Approvals</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">
                                    {stats.pendingApprovals}
                                </p>
                            </div>
                            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center">
                                <Clock className="w-7 h-7 text-amber-600" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4 text-sm text-amber-600">
                            <span>Requires attention</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* School Approvals Table */}
            <Card className="border-0 shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <CardTitle className="text-lg font-semibold text-slate-900">
                            School Applications
                        </CardTitle>
                        <div className="relative max-w-xs w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search schools..."
                                className="pl-10 h-10 border-slate-200"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="mb-6 bg-slate-100">
                            <TabsTrigger value="active" className="data-[state=active]:bg-white">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Active
                            </TabsTrigger>
                            <TabsTrigger value="pending" className="data-[state=active]:bg-white">
                                <Clock className="w-4 h-4 mr-2" />
                                Pending
                            </TabsTrigger>
                            <TabsTrigger value="inactive" className="data-[state=active]:bg-white">
                                <XCircle className="w-4 h-4 mr-2" />
                                Inactive
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value={activeTab} className="mt-0">
                            <div className="rounded-lg border border-slate-200 overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50">
                                            <TableHead className="font-semibold text-slate-700">School Name</TableHead>
                                            <TableHead className="font-semibold text-slate-700">Contact Email</TableHead>
                                            <TableHead className="font-semibold text-slate-700">State</TableHead>
                                            <TableHead className="font-semibold text-slate-700">Date Registered</TableHead>
                                            <TableHead className="font-semibold text-slate-700">Status</TableHead>
                                            {activeTab === 'active' && (
                                                <TableHead className="font-semibold text-slate-700">Subscription</TableHead>
                                            )}
                                            {activeTab === 'pending' && (
                                                <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                                            )}
                                            {activeTab === 'inactive' && (
                                                <TableHead className="font-semibold text-slate-700">Remarks</TableHead>
                                            )}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredSchools.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                                                    No schools found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredSchools.map((school) => (
                                                <TableRow
                                                    key={school.id}
                                                    className="hover:bg-slate-50/50 transition-colors"
                                                >
                                                    <TableCell className="font-medium text-slate-900">
                                                        {school.name}
                                                    </TableCell>
                                                    <TableCell className="text-slate-600">
                                                        {school.email}
                                                    </TableCell>
                                                    <TableCell className="text-slate-600">
                                                        {school.state}
                                                    </TableCell>
                                                    <TableCell className="text-slate-600">
                                                        {new Date(school.registeredAt).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        })}
                                                    </TableCell>
                                                    <TableCell>
                                                        <StatusBadge status={school.status} />
                                                    </TableCell>
                                                    {activeTab === 'active' && (
                                                        <TableCell className="font-semibold text-emerald-600">
                                                            ${school.subscriptionFee}/mo
                                                        </TableCell>
                                                    )}
                                                    {activeTab === 'pending' && (
                                                        <TableCell>
                                                            <div className="flex items-center justify-end gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => handleApprove(school)}
                                                                    className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-3"
                                                                >
                                                                    <CheckCircle className="w-4 h-4 mr-1" />
                                                                    Approve
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => handleReject(school)}
                                                                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-8 px-3"
                                                                >
                                                                    <XCircle className="w-4 h-4 mr-1" />
                                                                    Reject
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    )}
                                                    {activeTab === 'inactive' && (
                                                        <TableCell className="text-slate-500 text-sm max-w-xs truncate">
                                                            {school.rejectionRemarks || '-'}
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Approve Modal */}
            <Dialog open={approveModalOpen} onOpenChange={setApproveModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                            </div>
                            Approve School
                        </DialogTitle>
                        <DialogDescription>
                            Set the monthly subscription fee for{' '}
                            <span className="font-semibold text-slate-900">{selectedSchool?.name}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <Label htmlFor="subscription-fee" className="text-slate-700 font-medium">
                            Monthly Subscription Fee
                        </Label>
                        <div className="relative mt-2">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                id="subscription-fee"
                                type="text"
                                placeholder="299.00"
                                className="pl-11 h-12 text-lg font-semibold"
                                value={subscriptionFee}
                                onChange={(e) => setSubscriptionFee(formatCurrency(e.target.value))}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                                /month
                            </span>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setApproveModalOpen(false)}
                            disabled={isProcessing}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmApprove}
                            disabled={!subscriptionFee || isProcessing}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Confirm Approval
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reject Modal */}
            <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-600" />
                            </div>
                            Reject School
                        </DialogTitle>
                        <DialogDescription>
                            Provide a reason for rejecting{' '}
                            <span className="font-semibold text-slate-900">{selectedSchool?.name}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <Label htmlFor="rejection-remarks" className="text-slate-700 font-medium">
                            Rejection Remarks
                        </Label>
                        <Textarea
                            id="rejection-remarks"
                            placeholder="Please provide a reason for the rejection..."
                            className="mt-2 min-h-[120px] resize-none"
                            value={rejectionRemarks}
                            onChange={(e) => setRejectionRemarks(e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setRejectModalOpen(false)}
                            disabled={isProcessing}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmReject}
                            disabled={!rejectionRemarks || isProcessing}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Confirm Rejection
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

import { SummaryCards } from '@/components/admin/summary-cards'
import { RevenueChart } from '@/components/admin/revenue-chart'
import { RecentActivity } from '@/components/admin/recent-activity'

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-600 mt-2">Welcome back! Here's your performance overview.</p>
            </div>

            {/* Summary Cards */}
            <SummaryCards />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RevenueChart />
                <RecentActivity />
            </div>
        </div>
    )
}

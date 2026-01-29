import { Card } from '@/components/ui/card'

const chartData = [
    { month: 'Jan', revenue: 4000, enrollments: 2400 },
    { month: 'Feb', revenue: 3000, enrollments: 1398 },
    { month: 'Mar', revenue: 2000, enrollments: 9800 },
    { month: 'Apr', revenue: 2780, enrollments: 3908 },
    { month: 'May', revenue: 1890, enrollments: 4800 },
    { month: 'Jun', revenue: 2390, enrollments: 3800 },
    { month: 'Jul', revenue: 3490, enrollments: 4300 },
]

export function RevenueChart() {
    const maxRevenue = Math.max(...chartData.map(d => d.revenue))

    return (
        <Card className="col-span-1 lg:col-span-2 p-6 border-slate-200">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Revenue vs. Enrollments</h3>
                <p className="text-sm text-slate-500 mt-1">Monthly performance overview</p>
            </div>

            {/* Simple bar chart */}
            <div className="h-[300px] flex items-end gap-4">
                {chartData.map((data) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex gap-1 items-end h-[250px]">
                            <div
                                className="flex-1 bg-[#c83d18] rounded-t"
                                style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                                title={`Revenue: $${data.revenue}`}
                            />
                            <div
                                className="flex-1 bg-[#79afce] rounded-t"
                                style={{ height: `${(data.enrollments / 10000) * 100}%` }}
                                title={`Enrollments: ${data.enrollments}`}
                            />
                        </div>
                        <span className="text-xs text-slate-500">{data.month}</span>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#c83d18] rounded" />
                    <span className="text-sm text-slate-600">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#79afce] rounded" />
                    <span className="text-sm text-slate-600">Enrollments</span>
                </div>
            </div>
        </Card>
    )
}

import { Card } from '@/components/ui/card'
import { DollarSign, UserPlus, BookOpen } from 'lucide-react'

const activities = [
    {
        id: 1,
        type: 'payment',
        message: 'John Doe paid $500',
        course: 'Teen Driver ED',
        time: '2 hours ago',
        icon: DollarSign,
        color: 'text-green-600',
    },
    {
        id: 2,
        type: 'enrollment',
        message: 'Sarah enrolled in a course',
        course: 'Adult Driving School',
        time: '4 hours ago',
        icon: UserPlus,
        color: 'text-blue-600',
    },
    {
        id: 3,
        type: 'payment',
        message: 'Mike Johnson completed payment',
        course: 'Commercial License',
        time: '6 hours ago',
        icon: DollarSign,
        color: 'text-green-600',
    },
    {
        id: 4,
        type: 'course',
        message: 'New course added',
        course: 'Defensive Driving',
        time: '1 day ago',
        icon: BookOpen,
        color: 'text-purple-600',
    },
]

export function RecentActivity() {
    return (
        <Card className="col-span-1 p-6 border-slate-200">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
                <p className="text-sm text-slate-500 mt-1">Latest events and updates</p>
            </div>

            <div className="space-y-4">
                {activities.map((activity) => {
                    const Icon = activity.icon

                    return (
                        <div
                            key={activity.id}
                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            <div className={`p-2 rounded-lg bg-slate-100 flex-shrink-0`}>
                                <Icon className={`w-5 h-5 ${activity.color}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                                <p className="text-xs text-slate-500 mt-1">{activity.course}</p>
                            </div>

                            <p className="text-xs text-slate-500 flex-shrink-0 whitespace-nowrap">
                                {activity.time}
                            </p>
                        </div>
                    )
                })}
            </div>

            <button className="w-full mt-4 py-2 text-sm font-medium text-[#c83d18] hover:bg-slate-100 rounded-lg transition-colors">
                View All Activity
            </button>
        </Card>
    )
}

import { Users, TrendingUp, DollarSign, BookOpen } from 'lucide-react'
import { Card } from '@/components/ui/card'

const cards = [
    {
        title: 'Total Learners',
        value: '2,847',
        change: '+12% from last month',
        changePositive: true,
        icon: Users,
        color: 'bg-blue-100',
        iconColor: 'text-blue-600',
    },
    {
        title: 'Active Learners',
        value: '1,263',
        change: '+8% from last month',
        changePositive: true,
        icon: TrendingUp,
        color: 'bg-green-100',
        iconColor: 'text-green-600',
    },
    {
        title: 'Total Revenue',
        value: '$94,532',
        change: '+24% from last month',
        changePositive: true,
        icon: DollarSign,
        color: 'bg-[#fef2e8]',
        iconColor: 'text-[#c83d18]',
    },
    {
        title: 'Total Courses',
        value: '24',
        change: '+2 new courses',
        changePositive: true,
        icon: BookOpen,
        color: 'bg-purple-100',
        iconColor: 'text-purple-600',
    },
]

export function SummaryCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card) => {
                const Icon = card.icon

                return (
                    <Card key={card.title} className="p-6 border-slate-200 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-600">{card.title}</p>
                                <p className="text-3xl font-bold text-slate-900 mt-2">{card.value}</p>
                                <p className={`text-xs mt-2 font-medium ${card.changePositive ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {card.change}
                                </p>
                            </div>
                            <div className={`${card.color} p-3 rounded-lg flex-shrink-0`}>
                                <Icon className={`w-6 h-6 ${card.iconColor}`} />
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

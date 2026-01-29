import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CourseCardProps {
    id: string
    name: string
    categoryLabel: string
    categoryGroup: string
    fee: number
    thumbnail: string
}

export function CourseCard({ name, categoryLabel, categoryGroup, fee, thumbnail }: CourseCardProps) {
    const getCategoryColor = (group: string) => {
        switch (group) {
            case 'Teen Driver ED':
                return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'Adult Driver ED':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'Road Test':
                return 'bg-purple-100 text-purple-800 border-purple-200'
            default:
                return 'bg-slate-100 text-slate-800 border-slate-200'
        }
    }

    return (
        <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            {/* Thumbnail */}
            <div className="aspect-video relative overflow-hidden bg-slate-100">
                <img
                    src={thumbnail}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-slate-900 line-clamp-2">{name}</h3>
                </div>

                <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(categoryGroup)}>
                        {categoryLabel}
                    </Badge>
                    <span className="text-lg font-bold text-[#c83d18]">
                        ${fee.toLocaleString()}
                    </span>
                </div>
            </div>
        </Card>
    )
}

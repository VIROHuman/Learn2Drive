import { Card } from '@/components/ui/card'

export default function Roster() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Roster</h1>
                <p className="text-slate-600 mt-2">View and manage student enrollment and attendance records.</p>
            </div>

            <Card className="p-12 border-slate-200 text-center">
                <p className="text-slate-600">Roster management coming soon...</p>
            </Card>
        </div>
    )
}

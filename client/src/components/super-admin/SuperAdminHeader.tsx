import { useLocation } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Shield, Bell } from 'lucide-react'

const routeTitles: Record<string, string> = {
    '/super-admin/dashboard': 'School Management',
    '/super-admin/subscriptions': 'Subscriptions',
    '/super-admin/reports': 'Reports',
}

export function SuperAdminHeader() {
    const location = useLocation()
    const title = routeTitles[location.pathname] || 'Dashboard'

    return (
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
                <Badge className="bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-100">
                    <Shield className="w-3 h-3 mr-1" />
                    Platform Admin
                </Badge>
            </div>

            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Admin Profile */}
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold text-sm">
                        SA
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-medium text-slate-900">Super Admin</p>
                        <p className="text-xs text-slate-500">admin@learn2drive.com</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    Award,
    ChevronLeft,
    GraduationCap
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/student/courses', label: 'My Courses', icon: BookOpen },
    { href: '/student/roster', label: 'Driving Roster', icon: Calendar },
    { href: '/student/certificates', label: 'Certificates', icon: Award },
]

export function StudentSidebar() {
    const location = useLocation()
    const pathname = location.pathname
    const [collapsed, setCollapsed] = useState(false)

    const sidebarWidth = collapsed ? "w-20" : "w-64"
    const logoPadding = collapsed ? "p-3" : "p-6"

    return (
        <div className={cn(
            "hidden md:flex flex-col bg-white border-r border-slate-200 h-screen sticky top-0 transition-all duration-300",
            sidebarWidth
        )}>
            {/* Logo */}
            <div className={cn(
                "border-b border-slate-200 flex items-center justify-between transition-all duration-300",
                logoPadding
            )}>
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-800">Learn2Drive</span>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                    title={collapsed ? "Expand" : "Collapse"}
                >
                    <ChevronLeft className={cn(
                        "w-5 h-5 text-slate-600 transition-transform duration-300",
                        collapsed && "rotate-180"
                    )} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                                isActive
                                    ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon className={cn(
                                "w-5 h-5 flex-shrink-0",
                                isActive && "text-emerald-600"
                            )} />
                            {!collapsed && (
                                <span className={cn(
                                    "font-medium text-sm",
                                    isActive && "font-semibold"
                                )}>
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Help Section */}
            {!collapsed && (
                <div className="p-4 border-t border-slate-200">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4">
                        <h4 className="font-semibold text-slate-800 text-sm mb-1">Need Help?</h4>
                        <p className="text-xs text-slate-600 mb-3">Contact your instructor or support team.</p>
                        <button className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">
                            Get Support
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

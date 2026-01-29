import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { LayoutDashboard, BookOpen, DollarSign, Users, BarChart3, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/courses', label: 'Courses', icon: BookOpen },
    { href: '/admin/sales', label: 'Sales', icon: DollarSign },
    { href: '/admin/roster', label: 'Roster', icon: Users },
    { href: '/admin/report', label: 'Report', icon: BarChart3 },
]

export function Sidebar() {
    const location = useLocation()
    const pathname = location.pathname
    const [collapsed, setCollapsed] = useState(false)

    const sidebarWidth = collapsed ? "w-20" : "w-64"
    const logoPadding = collapsed ? "p-3" : "p-6"

    return (
        <div className={`hidden md:flex flex-col bg-white border-r border-slate-200 h-screen sticky top-0 transition-all duration-300 ${sidebarWidth}`}>
            {/* Logo */}
            <div className={`border-b border-slate-200 flex items-center justify-between transition-all duration-300 ${logoPadding}`}>
                {!collapsed && <h1 className="text-2xl font-bold text-[#c83d18]">Admin</h1>}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                    title={collapsed ? "Expand" : "Collapse"}
                >
                    <ChevronLeft className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = item.href === '/admin'
                        ? pathname === '/admin'
                        : pathname === item.href || pathname.startsWith(item.href + '/')
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-[#c83d18] text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            {!collapsed && <span className="font-medium">{item.label}</span>}
                        </Link>
                    )
                })}
            </nav>

            {/* User Profile */}
            {!collapsed && (
                <div className="p-4 border-t border-slate-200">
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-[#c83d18] text-white flex items-center justify-center font-semibold">
                            A
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-900">Admin User</p>
                            <p className="text-xs text-slate-500">admin@drive.com</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

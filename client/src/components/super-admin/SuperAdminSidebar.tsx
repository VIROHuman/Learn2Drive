import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Building2, CreditCard, BarChart3, ChevronLeft, Shield, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { href: '/super-admin/dashboard', label: 'Schools', icon: Building2 },
    { href: '/super-admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
    { href: '/super-admin/reports', label: 'Reports', icon: BarChart3 },
]

export function SuperAdminSidebar() {
    const location = useLocation()
    const pathname = location.pathname
    const [collapsed, setCollapsed] = useState(false)

    const sidebarWidth = collapsed ? 'w-20' : 'w-64'
    const logoPadding = collapsed ? 'p-3' : 'p-6'

    const handleLogout = () => {
        localStorage.removeItem('superAdminToken')
        window.location.href = '/super-admin/login'
    }

    return (
        <div className={`hidden md:flex flex-col bg-slate-950 border-r border-slate-800 h-screen sticky top-0 transition-all duration-300 ${sidebarWidth}`}>
            {/* Logo / Brand */}
            <div className={`border-b border-slate-800 flex items-center justify-between transition-all duration-300 ${logoPadding}`}>
                {!collapsed && (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white">Super Admin</h1>
                            <p className="text-xs text-slate-500">Platform Control</p>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
                    title={collapsed ? 'Expand' : 'Collapse'}
                >
                    <ChevronLeft className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                                isActive
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            {!collapsed && <span className="font-medium">{item.label}</span>}
                        </Link>
                    )
                })}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                    title={collapsed ? 'Logout' : undefined}
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </div>
    )
}

import { useState } from 'react'
import { LogOut, User, Bell, Moon, Sun, Search, MoreVertical } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
    const [isDark, setIsDark] = useState(false)
    const [searchFocus, setSearchFocus] = useState(false)

    const searchBorderClass = searchFocus ? 'border-[#c83d18] bg-slate-50' : 'border-slate-200 bg-slate-100'

    return (
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between backdrop-blur-sm sticky top-0 z-40">
            {/* Global Search */}
            <div className="flex-1 max-w-md">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${searchBorderClass}`}>
                    <Search className="w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search students, transactions..."
                        className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-500"
                        onFocus={() => setSearchFocus(true)}
                        onBlur={() => setSearchFocus(false)}
                    />
                    <span className="text-xs text-slate-500 px-2 py-1 bg-slate-200 rounded">⌘K</span>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 ml-auto">
                {/* Notifications */}
                <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5 text-slate-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    {isDark ? (
                        <Sun className="w-5 h-5 text-slate-600" />
                    ) : (
                        <Moon className="w-5 h-5 text-slate-600" />
                    )}
                </button>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <div className="w-8 h-8 rounded-full bg-[#c83d18] flex items-center justify-center text-white font-medium text-sm">
                                A
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-medium text-slate-900">Admin</p>
                                <p className="text-xs text-slate-500">admin@drive.com</p>
                            </div>
                            <MoreVertical className="w-4 h-4 text-slate-400" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem className="cursor-pointer">
                            <User className="w-4 h-4 mr-2" />
                            Profile Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Bell className="w-4 h-4 mr-2" />
                            Notifications
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

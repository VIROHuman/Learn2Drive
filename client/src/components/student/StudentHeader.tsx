import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, User, Bell, Search, ChevronDown, BookOpen, Settings } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function StudentHeader() {
    const navigate = useNavigate()
    const [searchFocus, setSearchFocus] = useState(false)

    // Mock student data - in real app this would come from auth context
    const student = {
        name: 'John Smith',
        email: 'john.smith@email.com',
        avatar: 'JS',
    }

    const handleLogout = () => {
        // Clear all auth-related data from localStorage
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        localStorage.removeItem('studentId')
        localStorage.clear() // Clear everything to be safe

        // Redirect to login page
        navigate('/login')
    }

    return (
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
            {/* Left: My Learning Link & Search */}
            <div className="flex items-center gap-6">
                <Link
                    to="/student/dashboard"
                    className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition-colors font-medium"
                >
                    <BookOpen className="w-5 h-5" />
                    <span>My Learning</span>
                </Link>

                {/* Search */}
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${searchFocus
                        ? 'border-emerald-400 bg-white shadow-sm w-80'
                        : 'border-slate-200 bg-slate-50 w-64'
                    }`}>
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                        onFocus={() => setSearchFocus(true)}
                        onBlur={() => setSearchFocus(false)}
                    />
                </div>
            </div>

            {/* Right: Notifications & Profile */}
            <div className="flex items-center gap-3">
                {/* Notifications */}
                <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <Bell className="w-5 h-5 text-slate-600" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm">
                                {student.avatar}
                            </div>
                            <div className="hidden lg:block text-left">
                                <p className="text-sm font-medium text-slate-900">{student.name}</p>
                                <p className="text-xs text-slate-500">Student</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-slate-400 hidden lg:block" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="px-3 py-2 border-b border-slate-100">
                            <p className="text-sm font-medium text-slate-900">{student.name}</p>
                            <p className="text-xs text-slate-500">{student.email}</p>
                        </div>
                        <DropdownMenuItem className="cursor-pointer">
                            <User className="w-4 h-4 mr-2" />
                            My Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Bell className="w-4 h-4 mr-2" />
                            Notifications
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

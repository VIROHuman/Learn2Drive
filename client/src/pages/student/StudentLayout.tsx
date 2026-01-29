import { Outlet } from 'react-router-dom'
import { StudentSidebar } from '@/components/student/StudentSidebar'
import { StudentHeader } from '@/components/student/StudentHeader'

export default function StudentLayout() {
    return (
        <div className="flex h-screen bg-slate-50">
            <StudentSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <StudentHeader />
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

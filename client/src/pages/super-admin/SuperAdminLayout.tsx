import { Outlet } from 'react-router-dom'
import { SuperAdminSidebar } from '@/components/super-admin/SuperAdminSidebar'
import { SuperAdminHeader } from '@/components/super-admin/SuperAdminHeader'

export default function SuperAdminLayout() {
    return (
        <div className="flex h-screen bg-slate-50">
            <SuperAdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <SuperAdminHeader />
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

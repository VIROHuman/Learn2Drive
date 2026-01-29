import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/admin/sidebar'
import { Header } from '@/components/admin/header'

export default function AdminLayout() {
    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

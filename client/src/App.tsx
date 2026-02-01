import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Courses from './pages/admin/Courses'
import Sales from './pages/admin/Sales'
import Roster from './pages/admin/Roster'
import Report from './pages/admin/Report'

// Student imports
import StudentLayout from './pages/student/StudentLayout'
import StudentDashboard from './pages/student/Dashboard'
import CoursePlayer from './pages/student/CoursePlayer'
import StudentRoster from './pages/student/Roster'
import Certificates from './pages/student/Certificates'

// Super Admin imports
import RegisterSchoolPage from './pages/super-admin/RegisterSchoolPage'
import SuperAdminLoginPage from './pages/super-admin/SuperAdminLoginPage'
import SuperAdminLayout from './pages/super-admin/SuperAdminLayout'
import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register-school" element={<RegisterSchoolPage />} />

      {/* Super Admin routes */}
      <Route path="/super-admin/login" element={<SuperAdminLoginPage />} />
      <Route path="/super-admin" element={<SuperAdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="sales" element={<Sales />} />
        <Route path="roster" element={<Roster />} />
        <Route path="report" element={<Report />} />
      </Route>

      {/* Student routes */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="course/:id" element={<CoursePlayer />} />
        <Route path="courses" element={<StudentDashboard />} />
        <Route path="roster" element={<StudentRoster />} />
        <Route path="certificates" element={<Certificates />} />
      </Route>
    </Routes>
  )
}

export default App


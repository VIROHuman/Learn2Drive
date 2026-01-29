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

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />

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

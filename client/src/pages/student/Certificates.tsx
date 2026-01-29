import { useEffect, useState } from 'react'
import { Award, Download, Calendar, User, Shield, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Certificate {
    id: string
    courseName: string
    issueDate: string
    certificateNumber: string
    instructorName: string
    validUntil: string
}

export default function Certificates() {
    const [certificates, setCertificates] = useState<Certificate[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:5000/api/student/certificates')
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    setCertificates(response.data)
                }
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to fetch certificates:', err)
                setLoading(false)
            })
    }, [])

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const handleDownload = (cert: Certificate) => {
        // Simulate PDF download
        alert(`Downloading certificate for "${cert.courseName}"...\n\nCertificate #: ${cert.certificateNumber}`)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                    My Certificates
                </h1>
                <p className="text-slate-600">Download and share your earned certificates.</p>
            </div>

            {certificates.length === 0 ? (
                <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-12 text-center">
                        <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="font-semibold text-slate-900 mb-2">No Certificates Yet</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            Complete your courses to earn certificates. They will appear here for you to download and share.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                        <Card
                            key={cert.id}
                            className="bg-white border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                        >
                            {/* Certificate Preview */}
                            <div className="h-40 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 relative overflow-hidden">
                                {/* Decorative Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-0 left-0 w-32 h-32 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                                    <div className="absolute bottom-0 right-0 w-48 h-48 border-4 border-white rounded-full translate-x-1/4 translate-y-1/4"></div>
                                </div>

                                {/* Certificate Icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                        <Award className="w-10 h-10 text-white" />
                                    </div>
                                </div>

                                {/* Verification Badge */}
                                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                                    <Shield className="w-3 h-3 text-white" />
                                    <span className="text-xs text-white font-medium">Verified</span>
                                </div>
                            </div>

                            <CardContent className="p-5">
                                <h3 className="font-semibold text-slate-900 mb-3 line-clamp-2">
                                    {cert.courseName}
                                </h3>

                                <div className="space-y-2 text-sm mb-4">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        Issued on {formatDate(cert.issueDate)}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <User className="w-4 h-4 text-slate-400" />
                                        {cert.instructorName}
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        Certificate #: {cert.certificateNumber}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDownload(cert)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download PDF
                                    </button>
                                    <button
                                        className="px-3 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors"
                                        title="Share Certificate"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Info Section */}
            <div className="mt-10 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-1">About Your Certificates</h4>
                        <p className="text-sm text-slate-600">
                            All certificates issued by Learn2Drive are digitally verified and can be shared with employers,
                            insurance companies, or the DMV. Each certificate includes a unique verification number that
                            can be validated on our website.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

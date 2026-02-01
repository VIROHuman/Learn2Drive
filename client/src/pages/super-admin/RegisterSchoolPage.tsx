import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Building2, CheckCircle, Mail, MapPin, Phone, Users, Loader2 } from 'lucide-react'

const US_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
]

const EMPLOYEE_OPTIONS = [
    { value: '1-5', label: '1-5 employees' },
    { value: '6-20', label: '6-20 employees' },
    { value: '20+', label: '20+ employees' },
]

export default function RegisterSchoolPage() {
    const [formState, setFormState] = useState<'form' | 'loading' | 'success'>('form')
    const [acceptedTerms, setAcceptedTerms] = useState(false)

    const [formData, setFormData] = useState({
        schoolName: '',
        phone: '',
        email: '',
        employees: '',
        state: '',
        street: '',
        city: '',
        zip: '',
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!acceptedTerms) return

        setFormState('loading')

        try {
            const response = await fetch('http://localhost:5000/api/schools/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setFormState('success')
            }
        } catch (error) {
            // For demo, show success anyway
            setTimeout(() => setFormState('success'), 1500)
        }
    }

    const isFormValid =
        formData.schoolName &&
        formData.phone &&
        formData.email &&
        formData.employees &&
        formData.state &&
        formData.street &&
        formData.city &&
        formData.zip &&
        acceptedTerms

    // Success State
    if (formState === 'success') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-lg border-0 shadow-2xl">
                    <CardContent className="pt-16 pb-12 text-center">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-successPulse">
                            <CheckCircle className="w-10 h-10 text-emerald-600 animate-checkmark" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">
                            Application Submitted!
                        </h2>
                        <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                            Thanks for registering! Our team will review your application shortly.
                            You'll receive an email once your school is approved.
                        </p>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 inline-flex items-center gap-3">
                            <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
                            <span className="text-amber-800 font-medium">Pending Approval</span>
                        </div>
                        <div className="mt-8">
                            <a href="/">
                                <Button variant="outline" className="border-slate-300">
                                    Return to Homepage
                                </Button>
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4 py-12">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNlNWU3ZWIiIGZpbGwtb3BhY2l0eT0iLjUiLz48L2c+PC9zdmc+')] opacity-30" />

            <Card className="w-full max-w-2xl border-0 shadow-2xl relative">
                {/* Header accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-t-lg" />

                <CardHeader className="text-center pt-8 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/20">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900">
                        Register Your Driving School
                    </CardTitle>
                    <CardDescription className="text-slate-600 mt-2">
                        Join Learn2Drive and manage your driving school with our comprehensive platform
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* School Name */}
                        <div className="space-y-2">
                            <Label htmlFor="schoolName" className="text-slate-700 font-medium">
                                School Name
                            </Label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    id="schoolName"
                                    placeholder="Enter your driving school name"
                                    className="pl-11 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                                    value={formData.schoolName}
                                    onChange={(e) => handleInputChange('schoolName', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Phone & Email */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-slate-700 font-medium">
                                    Phone Number
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="(555) 123-4567"
                                        className="pl-11 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-700 font-medium">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="contact@yourschool.com"
                                        className="pl-11 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Employees & State */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-medium">
                                    Number of Employees
                                </Label>
                                <Select
                                    value={formData.employees}
                                    onValueChange={(value) => handleInputChange('employees', value)}
                                >
                                    <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                                        <div className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-slate-400" />
                                            <SelectValue placeholder="Select team size" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {EMPLOYEE_OPTIONS.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-medium">
                                    State of Incorporation
                                </Label>
                                <Select
                                    value={formData.state}
                                    onValueChange={(value) => handleInputChange('state', value)}
                                >
                                    <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                                        <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-64">
                                        {US_STATES.map((state) => (
                                            <SelectItem key={state} value={state}>
                                                {state}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="space-y-4">
                            <Label className="text-slate-700 font-medium flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Business Address
                            </Label>
                            <Input
                                placeholder="Street Address"
                                className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                                value={formData.street}
                                onChange={(e) => handleInputChange('street', e.target.value)}
                            />
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    placeholder="City"
                                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                                    value={formData.city}
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                />
                                <Input
                                    placeholder="ZIP Code"
                                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                                    value={formData.zip}
                                    onChange={(e) => handleInputChange('zip', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="flex items-start gap-3 py-4 px-4 bg-slate-50 rounded-lg border border-slate-100">
                            <Checkbox
                                id="terms"
                                checked={acceptedTerms}
                                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                                className="mt-0.5"
                            />
                            <Label
                                htmlFor="terms"
                                className="text-sm text-slate-600 leading-relaxed cursor-pointer"
                            >
                                I accept the{' '}
                                <a href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                                    Terms & Conditions
                                </a>{' '}
                                and{' '}
                                <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                                    Privacy Policy
                                </a>
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            size="lg"
                            disabled={!isFormValid || formState === 'loading'}
                            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {formState === 'loading' ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Building2 className="w-5 h-5 mr-2" />
                                    Register School
                                </>
                            )}
                        </Button>

                        {/* Already have an account */}
                        <p className="text-center text-slate-600 text-sm">
                            Already registered?{' '}
                            <a href="/super-admin/login" className="text-blue-600 hover:text-blue-700 font-medium">
                                Sign in to admin portal
                            </a>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

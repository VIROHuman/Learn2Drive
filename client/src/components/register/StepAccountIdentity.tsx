import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { RegistrationFormData } from "@/lib/registrationSchema";
import { Eye, EyeOff, User, Mail, Lock, Phone, Calendar } from "lucide-react";
import { useState } from "react";

interface StepAccountIdentityProps {
    form: UseFormReturn<RegistrationFormData>;
}

export function StepAccountIdentity({ form }: StepAccountIdentityProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        formState: { errors },
        setValue,
        watch,
    } = form;

    return (
        <div className="space-y-6 animate-slideIn">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Account & Identity</h2>
                <p className="text-slate-500">Create your account and provide basic information</p>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-500" />
                        First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="firstName"
                        placeholder="John"
                        {...register("firstName")}
                        className={errors.firstName ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    {errors.firstName && (
                        <p className="text-sm text-red-500">{errors.firstName.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input
                        id="middleName"
                        placeholder="William"
                        {...register("middleName")}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lastName">
                        Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="lastName"
                        placeholder="Doe"
                        {...register("lastName")}
                        className={errors.lastName ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    {errors.lastName && (
                        <p className="text-sm text-red-500">{errors.lastName.message}</p>
                    )}
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-500" />
                    Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    {...register("email")}
                    className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                <p className="text-xs text-slate-500">This will be your username for logging in</p>
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-slate-500" />
                        Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...register("password")}
                            className={`pr-10 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    <p className="text-xs text-slate-500">Minimum 8 characters</p>
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-slate-500" />
                        Confirm Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...register("confirmPassword")}
                            className={`pr-10 ${errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                        >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                    )}
                </div>
            </div>

            {/* Phone, DOB, Gender */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-500" />
                        Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...register("phoneNumber")}
                        className={errors.phoneNumber ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    {errors.phoneNumber && (
                        <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        Date of Birth <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="dateOfBirth"
                        type="date"
                        {...register("dateOfBirth")}
                        className={errors.dateOfBirth ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    {errors.dateOfBirth && (
                        <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="gender">
                        Gender <span className="text-red-500">*</span>
                    </Label>
                    <Select
                        value={watch("gender")}
                        onValueChange={(value) => setValue("gender", value, { shouldValidate: true })}
                    >
                        <SelectTrigger className={errors.gender ? "border-red-500 focus:ring-red-500" : ""}>
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="non-binary">Non-binary</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.gender && (
                        <p className="text-sm text-red-500">{errors.gender.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

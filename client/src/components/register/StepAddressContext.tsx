import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { RegistrationFormData } from "@/lib/registrationSchema";
import { MapPin, Phone, Heart, MessageSquare } from "lucide-react";

interface StepAddressContextProps {
    form: UseFormReturn<RegistrationFormData>;
}

export function StepAddressContext({ form }: StepAddressContextProps) {
    const {
        register,
        formState: { errors },
        setValue,
        watch,
    } = form;

    return (
        <div className="space-y-6 animate-slideIn">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Address & Context</h2>
                <p className="text-slate-500">Tell us where you're located and a bit more about yourself</p>
            </div>

            {/* Address */}
            <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    Street Address <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="address"
                    placeholder="123 Main Street, Apt 4B"
                    {...register("address")}
                    className={errors.address ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                )}
            </div>

            {/* City, State, Zip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="city">
                        City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="city"
                        placeholder="New York"
                        {...register("city")}
                        className={errors.city ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    {errors.city && (
                        <p className="text-sm text-red-500">{errors.city.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="state">
                        State <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="state"
                        placeholder="NY"
                        {...register("state")}
                        className={errors.state ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    {errors.state && (
                        <p className="text-sm text-red-500">{errors.state.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="zipCode">
                        Zip/Pincode <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="zipCode"
                        placeholder="10001"
                        {...register("zipCode")}
                        className={errors.zipCode ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    {errors.zipCode && (
                        <p className="text-sm text-red-500">{errors.zipCode.message}</p>
                    )}
                </div>
            </div>

            {/* Emergency Phone */}
            <div className="space-y-2">
                <Label htmlFor="emergencyPhone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-500" />
                    Emergency Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="emergencyPhone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    {...register("emergencyPhone")}
                    className={errors.emergencyPhone ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                <p className="text-xs text-slate-500">Contact number in case of emergency</p>
                {errors.emergencyPhone && (
                    <p className="text-sm text-red-500">{errors.emergencyPhone.message}</p>
                )}
            </div>

            {/* Medical Conditions */}
            <div className="space-y-2">
                <Label htmlFor="medicalConditions" className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-slate-500" />
                    Medical/Physical Conditions
                    <span className="text-xs text-slate-400 ml-2">(Optional)</span>
                </Label>
                <Textarea
                    id="medicalConditions"
                    placeholder="Please let us know about any medical or physical conditions that our instructors should be aware of..."
                    {...register("medicalConditions")}
                    className="min-h-[80px]"
                />
            </div>

            {/* How did you hear about us */}
            <div className="space-y-2">
                <Label htmlFor="howHeardAboutUs" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-slate-500" />
                    How did you hear about us? <span className="text-red-500">*</span>
                </Label>
                <Select
                    value={watch("howHeardAboutUs")}
                    onValueChange={(value) => setValue("howHeardAboutUs", value, { shouldValidate: true })}
                >
                    <SelectTrigger className={errors.howHeardAboutUs ? "border-red-500 focus:ring-red-500" : ""}>
                        <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="google">Google Search</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="friend">Friend/Family Referral</SelectItem>
                        <SelectItem value="billboard">Billboard/Signage</SelectItem>
                        <SelectItem value="newspaper">Newspaper/Magazine</SelectItem>
                        <SelectItem value="radio">Radio</SelectItem>
                        <SelectItem value="tv">Television</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
                {errors.howHeardAboutUs && (
                    <p className="text-sm text-red-500">{errors.howHeardAboutUs.message}</p>
                )}
            </div>

            {/* Student Notes */}
            <div className="space-y-2">
                <Label htmlFor="studentNotes">
                    Student Notes
                    <span className="text-xs text-slate-400 ml-2">(Optional)</span>
                </Label>
                <Textarea
                    id="studentNotes"
                    placeholder="Any additional information you'd like us to know..."
                    {...register("studentNotes")}
                    className="min-h-[80px]"
                />
            </div>
        </div>
    );
}

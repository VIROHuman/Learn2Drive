import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
    registrationSchema,
    defaultFormValues,
} from "@/lib/registrationSchema";
import type { RegistrationFormData } from "@/lib/registrationSchema";
import { StepAccountIdentity } from "@/components/register/StepAccountIdentity";
import { StepAddressContext } from "@/components/register/StepAddressContext";
import { StepPayment } from "@/components/register/StepPayment";
import { StepSuccess } from "@/components/register/StepSuccess";
import {
    User,
    MapPin,
    CreditCard,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Loader2,
} from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Account & Identity",
        description: "Create your credentials",
        icon: User,
    },
    {
        id: 2,
        title: "Address & Context",
        description: "Your location & info",
        icon: MapPin,
    },
    {
        id: 3,
        title: "Payment",
        description: "Complete registration",
        icon: CreditCard,
    },
    {
        id: 4,
        title: "Success",
        description: "You're all set!",
        icon: CheckCircle2,
    },
];

export default function RegisterPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: defaultFormValues,
        mode: "onChange",
    });

    const validateCurrentStep = async () => {
        let isValid = false;

        if (currentStep === 1) {
            // Validate step 1 fields
            isValid = await form.trigger([
                "firstName",
                "lastName",
                "email",
                "password",
                "confirmPassword",
                "phoneNumber",
                "dateOfBirth",
                "gender",
            ]);
        } else if (currentStep === 2) {
            // Validate step 2 fields
            isValid = await form.trigger([
                "address",
                "city",
                "state",
                "zipCode",
                "emergencyPhone",
                "howHeardAboutUs",
            ]);
        } else if (currentStep === 3) {
            // Validate step 3 fields
            isValid = await form.trigger([
                "cardholderName",
                "cardNumber",
                "expiryDate",
                "cvc",
            ]);
        }

        return isValid;
    };

    const handleNext = async () => {
        const isValid = await validateCurrentStep();
        if (isValid && currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        const isValid = await validateCurrentStep();
        if (!isValid) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setCurrentStep(4);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <StepAccountIdentity form={form} />;
            case 2:
                return <StepAddressContext form={form} />;
            case 3:
                return <StepPayment form={form} />;
            case 4:
                return <StepSuccess email={form.getValues("email")} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                            Student Registration
                        </h1>
                        <p className="text-slate-600">
                            Join Learn2Drive Academy and start your journey to becoming a confident driver
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Stepper */}
                        <div className="lg:w-80 shrink-0">
                            <Card className="p-6 sticky top-24 bg-white/80 backdrop-blur-sm border-slate-200">
                                <div className="space-y-1">
                                    {steps.map((step, index) => {
                                        const isActive = currentStep === step.id;
                                        const isCompleted = currentStep > step.id;
                                        const Icon = step.icon;

                                        return (
                                            <div key={step.id}>
                                                <div
                                                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${isActive
                                                        ? "bg-gradient-to-r from-[#c83d18]/10 to-[#79afce]/10 border-2 border-[#c83d18]/20"
                                                        : isCompleted
                                                            ? "bg-green-50 border-2 border-green-200"
                                                            : "bg-slate-50 border-2 border-transparent"
                                                        }`}
                                                >
                                                    <div
                                                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isActive
                                                            ? "bg-gradient-to-br from-[#c83d18] to-[#79afce] text-white shadow-lg"
                                                            : isCompleted
                                                                ? "bg-green-500 text-white"
                                                                : "bg-slate-200 text-slate-500"
                                                            }`}
                                                    >
                                                        {isCompleted ? (
                                                            <CheckCircle2 className="h-6 w-6" />
                                                        ) : (
                                                            <Icon className="h-6 w-6" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p
                                                            className={`font-semibold truncate ${isActive
                                                                ? "text-[#c83d18]"
                                                                : isCompleted
                                                                    ? "text-green-700"
                                                                    : "text-slate-600"
                                                                }`}
                                                        >
                                                            {step.title}
                                                        </p>
                                                        <p className="text-sm text-slate-500 truncate">
                                                            {step.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                {index < steps.length - 1 && (
                                                    <div className="flex justify-start ml-10 py-1">
                                                        <div
                                                            className={`w-0.5 h-6 transition-colors duration-300 ${currentStep > step.id
                                                                ? "bg-green-500"
                                                                : "bg-slate-200"
                                                                }`}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-6 pt-6 border-t border-slate-200">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-600">Progress</span>
                                        <span className="font-semibold text-[#c83d18]">
                                            {Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#c83d18] to-[#79afce] transition-all duration-500 ease-out"
                                            style={{
                                                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Main Form Area */}
                        <div className="flex-1">
                            <Card className="p-6 md:p-8 bg-white border-slate-200 shadow-sm">
                                <form onSubmit={(e) => e.preventDefault()}>
                                    {/* Step Content */}
                                    <div className="min-h-[400px]">{renderStepContent()}</div>

                                    {/* Navigation Buttons */}
                                    {currentStep < 4 && (
                                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={handleBack}
                                                disabled={currentStep === 1}
                                                className="border-slate-300 text-slate-700 hover:bg-slate-100"
                                            >
                                                <ArrowLeft className="mr-2 h-4 w-4" />
                                                Back
                                            </Button>

                                            {currentStep === 3 ? (
                                                <Button
                                                    type="button"
                                                    onClick={handleSubmit}
                                                    disabled={isSubmitting}
                                                    className="bg-[#c83d18] hover:bg-[#c83d18]/90 text-white px-8"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Processing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CreditCard className="mr-2 h-4 w-4" />
                                                            Pay & Register
                                                        </>
                                                    )}
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    onClick={handleNext}
                                                    className="bg-[#c83d18] hover:bg-[#c83d18]/90 text-white px-8"
                                                >
                                                    Next
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

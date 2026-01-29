import { Button } from "@/components/ui/button";
import { CheckCircle2, LogIn, Mail, PartyPopper } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StepSuccessProps {
    email: string;
}

export function StepSuccess({ email }: StepSuccessProps) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-8 animate-slideIn">
            {/* Success Animation */}
            <div className="relative">
                <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center animate-successPulse">
                    <CheckCircle2 className="h-16 w-16 text-green-500 animate-checkmark" />
                </div>
                <div className="absolute -top-2 -right-2">
                    <PartyPopper className="h-8 w-8 text-[#c83d18] animate-bounce" />
                </div>
            </div>

            {/* Success Message */}
            <div className="text-center space-y-4 max-w-md">
                <h2 className="text-3xl font-bold text-slate-900">
                    Account Created Successfully!
                </h2>
                <p className="text-slate-600 text-lg">
                    Welcome to Learn2Drive Academy! Your account has been created and your payment has been processed.
                </p>
            </div>

            {/* Account Details Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 w-full max-w-md space-y-4 border border-slate-200">
                <h3 className="font-semibold text-slate-900">Your Account Details</h3>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                    <Mail className="h-5 w-5 text-[#c83d18]" />
                    <div>
                        <p className="text-xs text-slate-500">Login Email</p>
                        <p className="font-medium text-slate-900">{email}</p>
                    </div>
                </div>
                <p className="text-sm text-slate-600">
                    You can now log in with the password you just set. A confirmation email has been sent to your inbox.
                </p>
            </div>

            {/* What's Next */}
            <div className="bg-[#c83d18]/5 rounded-xl p-6 w-full max-w-md space-y-3 border border-[#c83d18]/20">
                <h3 className="font-semibold text-slate-900">What's Next?</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Check your email for the confirmation and course details</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Log in to your account to schedule your first lesson</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Our team will contact you within 24 hours</span>
                    </li>
                </ul>
            </div>

            {/* Action Button */}
            <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="bg-[#c83d18] hover:bg-[#c83d18]/90 text-white text-lg px-8 py-6"
            >
                <LogIn className="mr-2 h-5 w-5" />
                Go to Login
            </Button>
        </div>
    );
}

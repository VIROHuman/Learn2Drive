import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { RegistrationFormData } from "@/lib/registrationSchema";
import { CreditCard, Calendar, Lock, User, CheckCircle2 } from "lucide-react";

interface StepPaymentProps {
    form: UseFormReturn<RegistrationFormData>;
}

export function StepPayment({ form }: StepPaymentProps) {
    const {
        register,
        formState: { errors },
    } = form;

    // Format card number with spaces
    const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
        if (value.length > 16) value = value.slice(0, 16);
        const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
        e.target.value = formatted;
    };

    // Format expiry date
    const formatExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length >= 2) {
            value = value.slice(0, 2) + "/" + value.slice(2);
        }
        e.target.value = value;
    };

    return (
        <div className="space-y-6 animate-slideIn">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Payment</h2>
                <p className="text-slate-500">Complete your registration with a secure payment</p>
            </div>

            {/* Order Summary */}
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
                <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        Order Summary
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Complete Driving Course</span>
                            <span className="font-medium">$299.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Road Test Preparation</span>
                            <span className="font-medium">$49.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Registration Fee</span>
                            <span className="font-medium">$25.00</span>
                        </div>
                        <div className="border-t border-slate-300 pt-3 mt-3">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-lg">Total</span>
                                <span className="font-bold text-2xl text-[#c83d18]">$373.00</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="border-2 border-slate-200">
                <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <CreditCard className="h-5 w-5 text-[#c83d18]" />
                        <span className="font-semibold">Card Details</span>
                        <div className="ml-auto flex gap-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 object-contain" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain" />
                        </div>
                    </div>

                    {/* Cardholder Name */}
                    <div className="space-y-2">
                        <Label htmlFor="cardholderName" className="flex items-center gap-2">
                            <User className="h-4 w-4 text-slate-500" />
                            Cardholder Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="cardholderName"
                            placeholder="JOHN DOE"
                            {...register("cardholderName")}
                            className={`uppercase ${errors.cardholderName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        />
                        {errors.cardholderName && (
                            <p className="text-sm text-red-500">{errors.cardholderName.message}</p>
                        )}
                    </div>

                    {/* Card Number */}
                    <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-slate-500" />
                            Card Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="cardNumber"
                            placeholder="4242 4242 4242 4242"
                            {...register("cardNumber")}
                            onInput={formatCardNumber}
                            maxLength={19}
                            className={errors.cardNumber ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {errors.cardNumber && (
                            <p className="text-sm text-red-500">{errors.cardNumber.message}</p>
                        )}
                    </div>

                    {/* Expiry and CVC */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiryDate" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-slate-500" />
                                Expiry Date <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                {...register("expiryDate")}
                                onInput={formatExpiryDate}
                                maxLength={5}
                                className={errors.expiryDate ? "border-red-500 focus-visible:ring-red-500" : ""}
                            />
                            {errors.expiryDate && (
                                <p className="text-sm text-red-500">{errors.expiryDate.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cvc" className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-slate-500" />
                                CVC <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="cvc"
                                type="password"
                                placeholder="•••"
                                {...register("cvc")}
                                maxLength={4}
                                className={errors.cvc ? "border-red-500 focus-visible:ring-red-500" : ""}
                            />
                            {errors.cvc && (
                                <p className="text-sm text-red-500">{errors.cvc.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500 pt-2">
                        <Lock className="h-4 w-4" />
                        <span>Your payment is secured with SSL encryption</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

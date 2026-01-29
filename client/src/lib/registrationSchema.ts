import { z } from "zod";

// Step 1: Account & Identity Schema
const accountIdentitySchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Please select your gender"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

// Step 2: Address & Context Schema
const addressContextSchema = z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip/Pincode is required"),
    emergencyPhone: z.string().min(1, "Emergency phone number is required"),
    medicalConditions: z.string().optional(),
    howHeardAboutUs: z.string().min(1, "Please tell us how you heard about us"),
    studentNotes: z.string().optional(),
});

// Step 3: Payment Schema
const paymentSchema = z.object({
    cardNumber: z.string().min(16, "Please enter a valid card number").max(19, "Invalid card number"),
    expiryDate: z.string().min(5, "Please enter expiry date (MM/YY)"),
    cvc: z.string().min(3, "CVC must be 3 digits").max(4, "CVC must be 3-4 digits"),
    cardholderName: z.string().min(1, "Cardholder name is required"),
});

// Combined full registration schema
export const registrationSchema = z.object({
    // Step 1
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Please select your gender"),
    // Step 2
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip/Pincode is required"),
    emergencyPhone: z.string().min(1, "Emergency phone number is required"),
    medicalConditions: z.string().optional(),
    howHeardAboutUs: z.string().min(1, "Please tell us how you heard about us"),
    studentNotes: z.string().optional(),
    // Step 3
    cardNumber: z.string().min(16, "Please enter a valid card number").max(19, "Invalid card number"),
    expiryDate: z.string().min(5, "Please enter expiry date (MM/YY)"),
    cvc: z.string().min(3, "CVC must be 3 digits").max(4, "CVC must be 3-4 digits"),
    cardholderName: z.string().min(1, "Cardholder name is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

// Export individual schemas for per-step validation
export const step1Schema = accountIdentitySchema;
export const step2Schema = addressContextSchema;
export const step3Schema = paymentSchema;

// Type inference
export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;

// Default values
export const defaultFormValues: RegistrationFormData = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyPhone: "",
    medicalConditions: "",
    howHeardAboutUs: "",
    studentNotes: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardholderName: "",
};

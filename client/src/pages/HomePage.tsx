import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
    Car,
    Shield,
    Clock,
    Award,
    Users,
    CheckCircle2,
    Star,
    Calendar,
    BookOpen,
    Target,
    ArrowRight,
    Phone,
    GraduationCap,
    Zap
} from "lucide-react";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Hero Section - Clean & Fast */}
            <section className="relative bg-gradient-to-br from-[#79afce]/10 via-background to-[#c83d18]/10 py-20 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <Badge className="bg-[#b8350f] text-white border-[#b8350f] shadow-md hover:bg-[#c83d18]">
                                <Award className="h-4 w-4 mr-2" />
                                Trusted by 5,000+ Students Since 2009
                            </Badge>

                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                    Learn to Drive with
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#b8350f] via-[#c83d18] to-[#4a90a6] drop-shadow-md [text-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
                                        Confidence & Safety
                                    </span>
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                                    Professional driving instruction with certified instructors. Master the road with our proven teaching methods and pass your test on the first try.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="/register">
                                    <Button
                                        size="lg"
                                        className="bg-[#c83d18] hover:bg-[#c83d18]/90 text-white text-lg px-8"
                                    >
                                        <Calendar className="mr-2 h-5 w-5" />
                                        Book Your First Lesson
                                    </Button>
                                </a>

                                <a href="/courses">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-2 border-[#79afce] text-[#79afce] hover:bg-[#79afce]/10 text-lg px-8"
                                    >
                                        <BookOpen className="mr-2 h-5 w-5" />
                                        View Courses
                                    </Button>
                                </a>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex items-center gap-8 flex-wrap pt-6 border-t">
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className="h-5 w-5 fill-[#c83d18] text-[#c83d18]" />
                                        ))}
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-bold">4.9/5</div>
                                        <div className="text-muted-foreground text-xs">Google Rating</div>
                                    </div>
                                </div>
                                <div className="h-10 w-px bg-border" />
                                <div className="text-sm">
                                    <div className="font-bold text-[#79afce]">95%</div>
                                    <div className="text-muted-foreground text-xs">Pass Rate</div>
                                </div>
                                <div className="h-10 w-px bg-border" />
                                <div className="text-sm">
                                    <div className="font-bold text-[#c83d18]">15+</div>
                                    <div className="text-muted-foreground text-xs">Years Experience</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative lg:h-[550px]">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="/driving-school-handsome-man-instructor-600nw-2360709207.jpg"
                                    alt="Professional driving instructor with student"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>

                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#c83d18]/10 p-3 rounded-full">
                                        <Users className="h-6 w-6 text-[#c83d18]" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">5,000+</div>
                                        <div className="text-sm text-muted-foreground">Students Trained</div>
                                    </div>
                                </div>
                            </div>

                            {/* Another Floating Card */}
                            <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    <span className="font-medium">DMV Certified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: Users, value: "5,000+", label: "Students Trained", color: "text-[#c83d18]" },
                            { icon: Award, value: "95%", label: "Pass Rate", color: "text-[#79afce]" },
                            { icon: Star, value: "4.9", label: "Average Rating", color: "text-[#c83d18]" },
                            { icon: Clock, value: "15+", label: "Years Experience", color: "text-[#79afce]" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#79afce]/10 to-[#c83d18]/10 mb-4`}>
                                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                                <div className="text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/pexels-sebastian-palomino-933481-1955134.jpg"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm" />
                </div>

                <div className="container mx-auto px-4 relative">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-[#c83d18]/20 text-[#c83d18] border-[#c83d18]/30">
                            Why Choose Us
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            The <span className="text-[#c83d18]">Learn2Drive</span> Advantage
                        </h2>
                        <p className="text-slate-300 max-w-2xl mx-auto">
                            We combine expert instruction with modern teaching methods to ensure you become a safe, confident driver
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Shield,
                                title: "Safety First Approach",
                                description: "Comprehensive safety training with defensive driving techniques taught by certified professionals"
                            },
                            {
                                icon: Target,
                                title: "95% Pass Rate",
                                description: "Our proven curriculum and patient instructors help you pass your driving test on the first attempt"
                            },
                            {
                                icon: Calendar,
                                title: "Flexible Scheduling",
                                description: "Book lessons that fit your schedule with our easy online booking system"
                            },
                            {
                                icon: GraduationCap,
                                title: "Certified Instructors",
                                description: "All instructors are DMV-certified with extensive teaching experience"
                            },
                            {
                                icon: Car,
                                title: "Modern Training Vehicles",
                                description: "Learn on well-maintained, dual-control vehicles with the latest safety features"
                            },
                            {
                                icon: Zap,
                                title: "Personalized Learning",
                                description: "Customized lesson plans tailored to your skill level and learning pace"
                            }
                        ].map((feature, i) => (
                            <Card key={i} className="bg-white/95 backdrop-blur border-none hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <CardContent className="p-6">
                                    <div className="bg-gradient-to-br from-[#c83d18]/10 to-[#79afce]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                                        <feature.icon className="h-7 w-7 text-[#c83d18]" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-[#79afce]/20 text-[#79afce] border-[#79afce]/30">
                            Simple Process
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Start Your Journey in <span className="text-[#c83d18]">4 Easy Steps</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Sign Up", description: "Create your account and choose your course", icon: Users },
                            { step: "02", title: "Schedule", description: "Pick convenient times for your lessons", icon: Calendar },
                            { step: "03", title: "Learn", description: "Practice with expert instructors", icon: Car },
                            { step: "04", title: "Get Licensed", description: "Pass your test with confidence", icon: Award },
                        ].map((item, i) => (
                            <div key={i} className="relative">
                                <Card className="text-center p-6 hover:shadow-lg transition-shadow border-2 hover:border-[#c83d18]/20">
                                    <div className="text-5xl font-bold text-[#c83d18]/20 mb-4">{item.step}</div>
                                    <div className="bg-gradient-to-br from-[#c83d18] to-[#79afce] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <item.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm">{item.description}</p>
                                </Card>
                                {i < 3 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                        <ArrowRight className="h-8 w-8 text-[#c83d18]/30" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-[#c83d18]/20 text-[#c83d18] border-[#c83d18]/30">
                            Student Stories
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            What Our <span className="text-[#79afce]">Students</span> Say
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Johnson",
                                role: "First-Time Driver",
                                quote: "I was terrified of driving, but my instructor made me feel comfortable and confident. Passed on my first try!",
                                rating: 5
                            },
                            {
                                name: "Michael Chen",
                                role: "Teen Driver",
                                quote: "The online booking system is so convenient. My instructor was patient and really helped me understand the rules of the road.",
                                rating: 5
                            },
                            {
                                name: "Emily Rodriguez",
                                role: "Adult Learner",
                                quote: "As someone learning to drive later in life, I appreciated the judgment-free environment. Highly recommend!",
                                rating: 5
                            }
                        ].map((testimonial, i) => (
                            <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, j) => (
                                        <Star key={j} className="h-5 w-5 fill-[#c83d18] text-[#c83d18]" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c83d18] to-[#79afce] flex items-center justify-center text-white font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Start Your
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c83d18] to-[#79afce]"> Driving Journey</span>?
                    </h2>
                    <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                        Join thousands of successful students who learned to drive with confidence at Learn2Drive Academy
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/register">
                            <Button size="lg" className="bg-[#c83d18] hover:bg-[#c83d18]/90 text-white text-lg px-8">
                                <Calendar className="mr-2 h-5 w-5" />
                                Book Your First Lesson
                            </Button>
                        </a>
                        <a href="tel:+1234567890">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                                <Phone className="mr-2 h-5 w-5" />
                                Call Us Now
                            </Button>
                        </a>
                    </div>
                    <div className="flex items-center justify-center gap-8 mt-8 text-white/80">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                            <span>No Hidden Fees</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                            <span>Flexible Cancellation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                            <span>Money-Back Guarantee</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

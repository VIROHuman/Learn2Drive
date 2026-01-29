import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Menu,
  Phone,
  Mail,
  MapPin,
  Car,
  Calendar,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  X,
} from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Phone className="h-4 w-4" />
                <span>(123) 456-7890</span>
              </a>
              <a href="mailto:info@learn2drive.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Mail className="h-4 w-4" />
                <span>info@learn2drive.com</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Multiple Locations Available</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Mon-Sun: 7AM - 8PM
              </span>
              <div className="flex items-center gap-2">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md"
            : "bg-background"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Car className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">Learn2Drive</span>
                <span className="text-xs text-muted-foreground">Academy</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </a>
              <a href="/services" className="text-sm font-medium hover:text-primary transition-colors">
                Services
              </a>
              <a href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
                Courses & Pricing
              </a>
              <a href="/instructors" className="text-sm font-medium hover:text-primary transition-colors">
                Our Instructors
              </a>
              <a href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                About Us
              </a>
              <a href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
                <a href="/register">Sign Up</a>
              </Button>
              <Button size="sm" className="hidden md:flex group" asChild>
                <a href="/book">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </a>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="/" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
                Home
              </a>
              <a href="/services" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
                Services
              </a>
              <a href="/courses" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
                Courses & Pricing
              </a>
              <a href="/instructors" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
                Our Instructors
              </a>
              <a href="/about" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
                About Us
              </a>
              <a href="/contact" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
                Contact
              </a>
              <div className="pt-4 border-t space-y-2">
                <Button className="w-full" asChild>
                  <a href="/book" onClick={() => setMobileOpen(false)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book a Lesson
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/register" onClick={() => setMobileOpen(false)}>
                    Sign Up
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Send,
  Award,
  Shield,
  Star,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Instructors", href: "/instructors" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
  ];

  const services = [
    { name: "Beginner Lessons", href: "/services/beginner" },
    { name: "Refresher Course", href: "/services/refresher" },
    { name: "Test Preparation", href: "/services/test-prep" },
    { name: "Defensive Driving", href: "/services/defensive" },
    { name: "Highway Training", href: "/services/highway" },
    { name: "Night Driving", href: "/services/night" },
  ];

  const courses = [
    { name: "Standard Package", href: "/courses/standard" },
    { name: "Premium Package", href: "/courses/premium" },
    { name: "Intensive Course", href: "/courses/intensive" },
    { name: "Gift Vouchers", href: "/gift-vouchers" },
  ];

  const locations = [
    { name: "Downtown Center", address: "123 Main St, City" },
    { name: "North Branch", address: "456 Oak Ave, City" },
    { name: "South Branch", address: "789 Pine Rd, City" },
  ];

  return (
    <footer className="bg-muted/30 border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Car className="h-10 w-10 text-primary" />
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl">Learn2Drive</span>
                <span className="text-sm text-muted-foreground">Academy</span>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Your trusted partner in learning to drive safely and confidently. 
              With over 15 years of experience and 5,000+ successful students, 
              we're committed to making you a skilled, responsible driver.
            </p>

            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                Certified Instructors
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                100% Safety Record
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                4.9/5 Rating
              </Badge>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors group"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-muted-foreground">(123) 456-7890</p>
                </div>
              </a>

              <a
                href="mailto:info@learn2drive.com"
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors group"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-muted-foreground">info@learn2drive.com</p>
                </div>
              </a>

              <div className="flex items-center gap-3 text-sm">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Operating Hours</p>
                  <p className="text-muted-foreground">Mon-Sun: 7AM - 8PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses & Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Courses</h3>
            <ul className="space-y-3 mb-6">
              {courses.map((course) => (
                <li key={course.name}>
                  <a
                    href={course.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="font-semibold mb-3">Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Get driving tips & special offers
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="h-9"
                />
                <Button size="sm" className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="my-8 border-t pt-8">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Our Locations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {locations.map((location) => (
              <div
                key={location.name}
                className="p-4 rounded-lg bg-background border hover:border-primary transition-colors"
              >
                <p className="font-medium mb-1">{location.name}</p>
                <p className="text-sm text-muted-foreground">{location.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-background/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Learn2Drive Academy. All rights reserved. |{" "}
              <a href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground mr-2">Follow Us:</span>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Shield, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const footerLinks = {
    platform: [
      { name: "Learning Center", href: "/learning" },
      { name: "Threat Intelligence", href: "/threats" },
      { name: "Security Quiz", href: "/quiz" },
      { name: "News Center", href: "/news" },
    ],
  };

  return (
    <footer className="bg-muted/20 border-t border-border/40">
      <div className="container px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 animate-fade-up">
            <Link to="/" className="inline-flex items-center space-x-2.5 mb-5 group">
              <Shield className="h-5 w-5 text-primary transition-transform duration-200 group-hover:scale-110" />
              <span className="text-lg font-semibold tracking-tight">CyberSafe</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-md leading-relaxed">
              Empowering individuals and organizations with comprehensive
              cybersecurity education, threat intelligence, and practical
              security knowledge.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200 p-1.5"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200 p-1.5"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200 p-1.5"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200 p-1.5"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="animate-fade-up delay-100">
            <h3 className="text-sm font-semibold mb-4 text-foreground">Platform</h3>
            <ul className="space-y-2.5">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center animate-fade-up delay-200">
          <p className="text-sm text-muted-foreground/80">
            © 2024 CyberSafe Portal. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground/80 mt-2 md:mt-0">
            Built with security and privacy in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}

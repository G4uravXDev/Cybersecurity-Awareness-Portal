import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Shield,
  HelpCircle,
  Newspaper,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export function FeatureCards() {
  const features = [
    {
      title: "Learning Center",
      description:
        "Comprehensive cybersecurity courses from foundational concepts to advanced red-team exercises.",
      icon: BookOpen,
      href: "/learning",
      stats: "50+ Courses",
      delay: "delay-100",
    },
    {
      title: "Threat Intelligence",
      description:
        "Live CVE tracking, emerging attack vectors, and MITRE ATT&CK mitigation playbooks.",
      icon: Shield,
      href: "/threats",
      stats: "Real-time Telemetry",
      delay: "delay-200",
    },
    {
      title: "Security Quiz",
      description:
        "Assess your tactical security posture with scenario-driven interactive evaluations.",
      icon: HelpCircle,
      href: "/quiz",
      stats: "100+ Scenarios",
      delay: "delay-300",
    },
    {
      title: "News Center",
      description:
        "Aggregated global threat disclosures, zero-day advisories, and breach analyses.",
      icon: Newspaper,
      href: "/news",
      stats: "24/7 Intel Feed",
      delay: "delay-400",
    },
    {
      title: "Defender Dashboard",
      description:
        "Track certification status, security clearance progression, and completed modules.",
      icon: BarChart3,
      href: "/dashboard",
      stats: "Personal Metrics",
      delay: "delay-500",
    },
  ];

  return (
    <section className="py-24 bg-background relative">
      <div className="container px-4">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-1.5 text-xs text-primary font-medium uppercase tracking-wider mb-2">
            Defense Capabilities
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-foreground">
            Complete Cybersecurity Platform
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Everything your organization needs to build defensive resilience, assess risks, and stay ahead of adversaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {features.map((feature) => {
            const IconComponent = feature.icon;

            return (
              <Card
                key={feature.title}
                className={`group border border-border/80 bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300 animate-fade-up ${feature.delay}`}
              >
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 text-primary group-hover:scale-105 transition-transform">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <span className="text-xs font-mono text-muted-foreground">
                      {feature.stats}
                    </span>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="group/btn h-8 px-2 text-xs font-medium text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Link to={feature.href}>
                        Explore
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fade-up">
          <div className="inline-block p-8 md:p-10 rounded-2xl bg-gradient-to-b from-primary/10 via-card to-card border border-primary/25 max-w-lg shadow-xl shadow-primary/5">
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Ready to Upgrade Your Threat Posture?
            </h3>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              Join thousands of SOC operators, threat hunters, and security professionals worldwide.
            </p>
            <Button size="lg" className="rounded-full px-8 h-10 text-sm shadow-md shadow-primary/20" asChild>
              <Link to="/learning">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

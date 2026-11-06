import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Deep Midnight & Cobalt Atmospheric Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(59,130,246,0.18),rgba(0,0,0,0))]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />

      <div className="container relative px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border px-3.5 py-1 text-xs font-medium bg-primary/10 text-primary border-primary/25 mb-8 animate-fade-down shadow-sm backdrop-blur-sm">
            <Shield className="mr-1.5 h-3.5 w-3.5" />
            Enterprise Threat Defense & Training
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-up text-foreground">
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Cybersecurity
            </span>{" "}
            Awareness Portal
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up delay-100">
            Learn, simulate, and defend against modern cyber threats with enterprise-grade interactive modules and live intelligence feeds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center mb-16 animate-fade-up delay-200">
            <Button
              size="lg"
              className="rounded-full px-8 h-12 text-base font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
              asChild
            >
              <Link to="/learning">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-12 text-base border-border/80 hover:bg-muted/50 hover:border-border transition-all hover:-translate-y-0.5"
              asChild
            >
              <Link to="/quiz">Take Security Quiz</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto pt-8 border-t border-border/60 animate-fade-up delay-300">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground font-mono mb-1">50+</div>
              <div className="text-xs text-muted-foreground font-medium">Defense Tracks</div>
            </div>
            <div className="text-center border-x border-border/60">
              <div className="text-2xl md:text-3xl font-bold text-foreground font-mono mb-1">10K+</div>
              <div className="text-xs text-muted-foreground font-medium">SecOps Trained</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground font-mono mb-1">24/7</div>
              <div className="text-xs text-muted-foreground font-medium">Live Telemetry</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

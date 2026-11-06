import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import {
  TrendingUp,
  AlertTriangle,
  Shield,
  Users,
  Clock,
  Target,
  Activity,
  Award,
} from "lucide-react";

export function StatsSection() {
  const [activeLearners, setActiveLearners] = useState(2847);
  const [threatsBlocked, setThreatsBlocked] = useState(45921);
  const [courseCompletion, setCourseCompletion] = useState(87.3);
  const [threatLevel, setThreatLevel] = useState("Medium");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(
      () => {
        setActiveLearners((prev) => prev + Math.floor(Math.random() * 3) - 1);
        setThreatsBlocked((prev) => prev + Math.floor(Math.random() * 5) + 1);
        setCourseCompletion((prev) => {
          const change = (Math.random() - 0.5) * 0.2;
          return Math.max(85, Math.min(95, prev + change));
        });

        if (Math.random() < 0.1) {
          const levels = ["Low", "Medium", "High"];
          setThreatLevel(levels[Math.floor(Math.random() * levels.length)]);
        }

        setLastUpdate(new Date());
      },
      3000 + Math.random() * 2000,
    );

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      title: "Active Threat Index",
      value: threatLevel,
      change: `Updated ${Math.floor((Date.now() - lastUpdate.getTime()) / 1000)}s ago`,
      icon: AlertTriangle,
    },
    {
      title: "Concurrent Defenders",
      value: activeLearners.toLocaleString(),
      change: `+${Math.floor(Math.random() * 50) + 100} active today`,
      icon: Users,
    },
    {
      title: "IOCs Mitigated",
      value: threatsBlocked.toLocaleString(),
      change: `+${Math.floor(Math.random() * 100) + 1000} this cycle`,
      icon: Shield,
    },
    {
      title: "Benchmark Pass Rate",
      value: `${courseCompletion.toFixed(1)}%`,
      change: `+${(Math.random() * 2 + 3).toFixed(1)}% this month`,
      icon: Award,
    },
  ];

  const [recentThreats] = useState([
    {
      name: "Spear Phishing / C2 Callback",
      severity: "High",
      time: Date.now() - 2 * 60 * 60 * 1000,
    },
    {
      name: "Polymorphic Ransomware Dropper",
      severity: "Critical",
      time: Date.now() - 4 * 60 * 60 * 1000,
    },
    {
      name: "AWS IAM Token Exfiltration",
      severity: "Critical",
      time: Date.now() - 6 * 60 * 60 * 1000,
    },
    {
      name: "Kerberoasting AD Attack",
      severity: "High",
      time: Date.now() - 8 * 60 * 60 * 1000,
    },
  ]);

  const getTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);

    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  const getSeverityVariant = (severity: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (severity) {
      case "Critical":
        return "destructive";
      case "High":
        return "destructive";
      case "Medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <section className="py-24 bg-card/40 border-t border-border/80 relative">
      <div className="container px-4">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-medium text-emerald-400 tracking-wider uppercase">
              Live SOC Telemetry
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-foreground">
            Real-Time Security Intelligence
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Autonomous global network monitoring, honeypot telemetry, and enterprise defense posture metrics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-6xl mx-auto">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;

            return (
              <Card
                key={stat.title}
                className={`border border-border/80 bg-card/80 hover:border-primary/40 transition-all duration-300 animate-fade-up delay-${(i + 1) * 100}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold font-mono tracking-tight mb-1 text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Threats & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-6xl mx-auto animate-fade-up delay-400">
          <Card className="border border-border/80 bg-card/80">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Active Threat Advisories</h3>
                </div>
                <span className="text-xs font-mono text-muted-foreground">SOC Feed #1</span>
              </div>

              <div className="divide-y divide-border/60">
                {recentThreats.map((threat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-sm text-foreground">{threat.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" />
                        {getTimeAgo(threat.time)}
                      </p>
                    </div>
                    <Badge
                      variant={getSeverityVariant(threat.severity)}
                      className="text-xs font-normal"
                    >
                      {threat.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/80 bg-card/80">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Security Posture Status</h3>
                </div>
                <Badge variant="outline" className="text-xs font-normal text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                  Defenses Nominal
                </Badge>
              </div>

              <div className="divide-y divide-border/60 text-sm">
                <div className="flex items-center justify-between py-3 first:pt-0">
                  <span className="text-muted-foreground text-xs">Zero-Trust WAF Filter</span>
                  <span className="font-medium text-xs font-mono text-emerald-400">Enforcing (100%)</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground text-xs">Last Automated Vulnerability Scan</span>
                  <span className="font-medium text-xs text-foreground font-mono">
                    {Math.floor((Date.now() - lastUpdate.getTime()) / 1000)}s ago
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground text-xs">Composite Defense Score</span>
                  <span className="font-semibold text-xs text-primary font-mono">9.4 / 10.0</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground text-xs">Patch Compliance Rating</span>
                  <span className="font-medium text-xs text-emerald-400 font-mono">98.2% Tier-1</span>
                </div>
                <div className="flex items-center justify-between py-3 last:pb-0">
                  <span className="text-muted-foreground text-xs">Immutable Snapshots</span>
                  <span className="font-medium text-xs text-foreground">Verified Offline</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

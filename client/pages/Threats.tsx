import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Search,
  Shield,
  Zap,
  Bug,
  Lock,
  Eye,
  Wifi,
  Globe,
  Database,
  ArrowRight,
  TrendingUp,
  Clock,
  Target,
  Activity,
  CheckCircle2,
} from "lucide-react";
import {
  threatsData,
  getCurrentThreatLevel,
  getAllThreatCategories,
} from "@/lib/threatsData";

export default function Threats() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filteredThreats = threatsData.filter((threat) => {
    const matchesSearch =
      threat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || threat.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const currentThreatLevel = getCurrentThreatLevel();

  const categoryData = [
    {
      name: "Malware",
      icon: Bug,
      count: threatsData.filter((t) => t.category.includes("Malware")).length,
      trend: "+12%",
      description: "Malicious payloads, worms, trojans, and credential stealers.",
    },
    {
      name: "Social Engineering",
      icon: Eye,
      count: threatsData.filter((t) =>
        t.category.includes("Social Engineering"),
      ).length,
      trend: "+8%",
      description: "Phishing, spear-phishing, and impersonation attempts.",
    },
    {
      name: "Ransomware",
      icon: Lock,
      count: threatsData.filter((t) => t.category.includes("Ransomware"))
        .length,
      trend: "+23%",
      description: "Cryptographic extortion vectors and double-extortion campaigns.",
    },
    {
      name: "Network Security",
      icon: Wifi,
      count: threatsData.filter((t) => t.category.includes("Network")).length,
      trend: "+5%",
      description: "Volumetric DDoS, MitM interception, and port exploits.",
    },
    {
      name: "Cloud Security",
      icon: Database,
      count: threatsData.filter((t) => t.category.includes("Cloud")).length,
      trend: "+15%",
      description: "Misconfigured storage, IAM privilege escalation, and token leakage.",
    },
    {
      name: "Web Security",
      icon: Globe,
      count: threatsData.filter((t) => t.category.includes("Web")).length,
      trend: "+7%",
      description: "OWASP Top 10 vulnerabilities including SQLi and SSRF attacks.",
    },
  ];

  const protectionSteps = [
    {
      title: "Multi-Factor Authentication (MFA)",
      description: "Enforce hardware or authenticator app MFA across all endpoints and accounts.",
      priority: "Critical",
      time: "Immediate",
    },
    {
      title: "Vulnerability Patching Cadence",
      description: "Audit software dependencies and apply vendor patches within 72 hours of disclosure.",
      priority: "High",
      time: "Weekly",
    },
    {
      title: "Simulated Phishing Drills",
      description: "Conduct monthly phishing simulation drills to measure organizational click-rates.",
      priority: "High",
      time: "Monthly",
    },
    {
      title: "Immutable Offline Backups",
      description: "Maintain write-once-read-many (WORM) segmented offline backups.",
      priority: "High",
      time: "Continuous",
    },
    {
      title: "Zero-Trust Microsegmentation",
      description: "Restrict lateral subnet movement through identity-aware network firewalls.",
      priority: "Medium",
      time: "Quarterly",
    },
  ];

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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container px-4 py-12 flex-1">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-up">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-muted/50 text-muted-foreground border-border/60 mb-4">
            <AlertTriangle className="mr-1.5 h-3.5 w-3.5 text-rose-500" />
            Threat Matrix & Intelligence
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Threat Intelligence
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Monitor emerging adversarial tactics, techniques, and procedures (TTPs) across global telemetry.
          </p>
        </div>

        {/* Search & Top Status */}
        <div className="flex flex-col md:flex-row gap-3 mb-8 max-w-5xl mx-auto animate-fade-up delay-100">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter threat database by vector, attack type, or name..."
              className="pl-9 h-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-9 px-3 text-xs font-normal border-border/60">
              <span className="w-2 h-2 rounded-full bg-amber-500 mr-2" />
              Global Threat Level: {currentThreatLevel.level}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="current" className="max-w-5xl mx-auto space-y-8 animate-fade-up delay-200">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto h-9 bg-muted/60 p-1">
            <TabsTrigger value="current" className="text-xs">Active Threats</TabsTrigger>
            <TabsTrigger value="categories" className="text-xs">Categories</TabsTrigger>
            <TabsTrigger value="protection" className="text-xs">Hardening</TabsTrigger>
          </TabsList>

          {/* Current Threats Tab */}
          <TabsContent value="current" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredThreats.slice(0, 16).map((threat) => (
                <Card
                  key={threat.id}
                  className="border border-border/60 bg-card hover:border-border hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant={getSeverityVariant(threat.severity)}
                        className="text-[11px] font-normal"
                      >
                        {threat.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{threat.category}</span>
                    </div>

                    <CardTitle className="text-base font-semibold leading-snug">
                      {threat.name}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed line-clamp-3 text-muted-foreground mt-1">
                      {threat.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3 pt-3 border-t border-border/40">
                      {/* Risk Level Bar */}
                      <div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Risk Assessment</span>
                          <span className="font-mono text-foreground font-medium">{threat.riskLevel}%</span>
                        </div>
                        <div className="w-full bg-muted/60 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              threat.riskLevel > 75 ? "bg-rose-500" : threat.riskLevel > 50 ? "bg-amber-500" : "bg-primary"
                            }`}
                            style={{ width: `${threat.riskLevel}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Updated recently
                        </span>
                        <Button variant="ghost" size="sm" asChild className="h-7 text-xs px-2 hover:bg-muted/50">
                          <Link to={`/threats/${threat.id}`}>
                            Details
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoryData.map((category) => {
                const IconComponent = category.icon;

                return (
                  <Card
                    key={category.name}
                    className="border border-border/60 bg-card hover:border-border transition-all duration-300 cursor-pointer"
                    onClick={() =>
                      setSelectedCategory(
                        category.name === selectedCategory ? "" : category.name,
                      )
                    }
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center text-foreground">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold tracking-tight">
                            {category.count}
                          </div>
                          <span className="text-[11px] text-muted-foreground">
                            {category.trend}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-sm font-semibold mb-1 text-foreground">
                        {category.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                        {category.description}
                      </p>

                      <Button
                        variant={
                          selectedCategory === category.name
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className="w-full h-8 text-xs border-border/60"
                      >
                        {selectedCategory === category.name
                          ? "Reset Filter"
                          : "Filter Database"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Hardening Tab */}
          <TabsContent value="protection" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-base font-semibold">Recommended Controls</h2>
                <div className="space-y-3">
                  {protectionSteps.map((step, index) => (
                    <Card key={index} className="border border-border/60 bg-card p-4">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          <div>
                            <h3 className="font-medium text-sm text-foreground">{step.title}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[10px] shrink-0 border-border/60">
                          {step.time}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-base font-semibold">Incident Response Workflow</h2>
                <Card className="border border-border/60 bg-muted/20 p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">Containment Protocols</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      "1. Isolate compromised subnets and terminate active bearer tokens",
                      "2. Freeze host memory state and clone disk image for digital forensics",
                      "3. Rotate privileged root credentials and certificate authority keys",
                      "4. Coordinate notification with emergency cert contacts and compliance leads",
                      "5. Verify integrity of immutable recovery points prior to restored deployment",
                    ].map((item, idx) => (
                      <p key={idx} className="p-2.5 rounded-lg bg-card/60 border border-border/40 text-muted-foreground">
                        {item}
                      </p>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}

function Brain({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

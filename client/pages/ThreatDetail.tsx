import { useParams, Link } from "react-router-dom";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  AlertTriangle,
  Eye,
  Target,
  Activity,
  Clock,
  CheckCircle,
  Zap,
  Book,
  Download,
  Shield,
  FileText,
  PhoneCall,
} from "lucide-react";
import { getThreatById } from "@/lib/threatsData";

export default function ThreatDetail() {
  const { threatId } = useParams<{ threatId: string }>();
  const threat = threatId ? getThreatById(threatId) : null;

  if (!threat) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container px-4 py-16 text-center max-w-md mx-auto flex-1 flex flex-col items-center justify-center">
          <Shield className="h-10 w-10 text-muted-foreground mb-4" />
          <h1 className="text-xl font-bold tracking-tight text-foreground mb-2">
            Threat Dossier Not Found
          </h1>
          <p className="text-xs text-muted-foreground mb-6">
            The requested intelligence dossier does not exist in the threat registry.
          </p>
          <Button asChild size="sm" variant="outline" className="h-8 text-xs">
            <Link to="/threats">Return to Threat Matrix</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const getSeverityVariant = (severity: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (severity) {
      case "Critical":
      case "High":
        return "destructive";
      case "Medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  const preventionSteps = [
    {
      title: "Immediate Mitigation Actions",
      description: "Controls to implement immediately across sensitive subnets",
      actions: threat.prevention.slice(0, 3),
      timeframe: "< 24 Hours",
      priority: "Critical",
    },
    {
      title: "Hardening & Policy Controls",
      description: "Structural security enhancements across infrastructure",
      actions: threat.prevention.slice(3, 5),
      timeframe: "< 7 Days",
      priority: "High",
    },
    {
      title: "Strategic Defense & Drills",
      description: "Ongoing adversarial testing and compliance monitoring",
      actions: [
        "Continuous vulnerability scanning and baseline auditing",
        "Red-team phishing simulation and security posture drills",
        "Automated backup integrity testing and isolation verification",
      ],
      timeframe: "Continuous",
      priority: "Standard",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container px-4 py-10 flex-1">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between mb-8 animate-fade-down">
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground" asChild>
            <Link to="/threats">
              <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
              Threat Matrix
            </Link>
          </Button>
          <div className="flex items-center space-x-1.5 text-xs text-muted-foreground">
            <span>Threats</span>
            <span>/</span>
            <span>{threat.category}</span>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">{threat.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 animate-fade-up">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant={getSeverityVariant(threat.severity)} className="text-xs font-normal">
                  {threat.severity} Severity
                </Badge>
                <Badge variant="outline" className="text-xs font-normal border-border/80">
                  {threat.category}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground ml-auto">
                  ID: #{threat.id}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                {threat.name}
              </h1>

              {/* Risk Level Bar */}
              <div className="p-4 rounded-xl border border-border/80 bg-card/60 mb-6">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span className="font-medium text-foreground">Threat Severity Assessment</span>
                  <span className="font-mono font-bold text-foreground">{threat.riskLevel} / 100</span>
                </div>
                <div className="w-full bg-muted/60 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      threat.riskLevel > 75 ? "bg-rose-500" : threat.riskLevel > 50 ? "bg-amber-500" : "bg-primary"
                    }`}
                    style={{ width: `${threat.riskLevel}%` }}
                  />
                </div>
              </div>

              {/* Recent Activity Alert */}
              {threat.recentActivity && (
                <div className="p-4 rounded-xl border border-rose-500/25 bg-rose-500/5 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-xs font-semibold text-rose-400 mb-0.5">
                        Active Telemetry Alert
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {threat.recentActivity}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 h-9 bg-muted/50 p-1">
                <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                <TabsTrigger value="indicators" className="text-xs">IoCs</TabsTrigger>
                <TabsTrigger value="prevention" className="text-xs">Prevention</TabsTrigger>
                <TabsTrigger value="response" className="text-xs">Playbook</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <Card className="border border-border/80 bg-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <Book className="h-4 w-4 text-primary" />
                      Threat Architecture & Dynamics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                    <p className="text-sm font-medium text-foreground leading-relaxed">
                      {threat.description}
                    </p>
                    <p>
                      Adversaries leveraging this attack vector commonly focus on credential harvesting, lateral escalation across Windows and cloud perimeters, and persistence establishment. Proactive monitoring of anomalous API invocations and outbound C2 traffic is mandatory.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* IoC Tab */}
              <TabsContent value="indicators" className="space-y-4">
                <Card className="border border-border/80 bg-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <Eye className="h-4 w-4 text-primary" />
                      Indicators of Compromise (IoCs)
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Signatures and behavioral markers observed in active campaigns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {threat.indicators.map((indicator, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg border border-border/60 bg-muted/20"
                        >
                          <span className="font-mono text-xs font-bold text-primary mt-0.5">
                            [{index + 1}]
                          </span>
                          <div className="space-y-0.5">
                            <p className="font-medium text-xs text-foreground font-mono">{indicator}</p>
                            <p className="text-[11px] text-muted-foreground">
                              Correlate with endpoint telemetry and proxy access logs.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Prevention Tab */}
              <TabsContent value="prevention" className="space-y-4">
                <div className="space-y-4">
                  {preventionSteps.map((step, index) => (
                    <Card key={index} className="border border-border/80 bg-card">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            {step.title}
                          </CardTitle>
                          <Badge variant="outline" className="text-[10px] font-mono border-border/60">
                            {step.timeframe}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs">{step.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {step.actions.map((action, actionIndex) => (
                            <div key={actionIndex} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{action}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Playbook Tab */}
              <TabsContent value="response" className="space-y-5">
                <Card className="border border-border/80 bg-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2 text-rose-400">
                      <AlertTriangle className="h-4 w-4" />
                      Active Incident Containment Sequence
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Step-by-step containment procedures if active exploitation is confirmed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2.5">
                      {[
                        "Isolate affected endpoints from network egress immediately",
                        "Dump live kernel memory state and export process trees",
                        "Revoke active Kerberos and OAuth refresh tokens for flagged identities",
                        "Assess scope through SIEM timeline querying across all ingress vectors",
                        "Deploy targeted endpoint remediation script via central EDR console",
                        "Notify compliance leads and initiate external forensics support if needed",
                      ].map((step, index) => (
                        <div key={index} className="flex items-start gap-3 p-2.5 rounded-lg border border-border/40 bg-muted/10 text-xs">
                          <span className="w-5 h-5 rounded-md bg-muted/60 flex items-center justify-center font-mono text-[10px] font-bold text-foreground shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-muted-foreground leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-border/80 bg-card p-4 space-y-3">
                    <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                      <PhoneCall className="h-4 w-4 text-primary" />
                      Emergency Escalation
                    </div>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <p><span className="font-medium text-foreground">SOC Hotline:</span> +1 (800) 555-SECOPS</p>
                      <p><span className="font-medium text-foreground">Incident Desk:</span> cert@cybersafe.com</p>
                      <p><span className="font-medium text-foreground">CISA Registry:</span> us-cert.cisa.gov</p>
                    </div>
                  </Card>

                  <Card className="border border-border/80 bg-card p-4 space-y-3">
                    <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                      <FileText className="h-4 w-4 text-primary" />
                      Remediation Artifacts
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full h-8 text-xs justify-start border-border/60">
                        <Download className="h-3.5 w-3.5 mr-2" />
                        Download Remediation Checklist
                      </Button>
                      <Button variant="outline" size="sm" className="w-full h-8 text-xs justify-start border-border/60">
                        <Target className="h-3.5 w-3.5 mr-2" />
                        YARA / Sigma Detection Rules
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-5 animate-fade-up delay-200">
            {/* Intel Summary */}
            <Card className="border border-border/80 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-primary" />
                  Dossier Telemetry
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-border/60 text-xs">
                <div className="flex justify-between py-2 first:pt-0">
                  <span className="text-muted-foreground">Vector Category</span>
                  <span className="font-medium text-foreground">{threat.category}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Active Severity</span>
                  <Badge variant={getSeverityVariant(threat.severity)} className="text-[10px] font-normal">
                    {threat.severity}
                  </Badge>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Calculated Risk</span>
                  <span className="font-mono font-bold text-foreground">{threat.riskLevel}/100</span>
                </div>
                <div className="flex justify-between py-2 last:pb-0">
                  <span className="text-muted-foreground">Global Observation</span>
                  <span className={`font-medium ${threat.recentActivity ? "text-rose-400" : "text-emerald-400"}`}>
                    {threat.recentActivity ? "Active Exploit" : "Under Watch"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Related Threats */}
            <Card className="border border-border/80 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Related Threat Vectors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5">
                {[
                  { id: "ai-powered-phishing", name: "AI-Generated Social Engineering", cat: "Phishing" },
                  { id: "supply-chain-attacks", name: "Open-Source Supply Chain Poisoning", cat: "APT" },
                  { id: "business-email-compromise", name: "Executive Impersonation & BEC", cat: "Fraud" },
                ].map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start h-auto p-2 text-left hover:bg-muted/50 rounded-lg"
                    asChild
                  >
                    <Link to={`/threats/${item.id}`}>
                      <div>
                        <p className="font-medium text-xs text-foreground">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground">{item.cat}</p>
                      </div>
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

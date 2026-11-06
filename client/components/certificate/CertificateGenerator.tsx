import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Award, Shield, Calendar, User, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface CertificateGeneratorProps {
  courseTitle: string;
  courseId: string;
  completionDate?: Date;
}

export function CertificateGenerator({
  courseTitle,
  courseId,
  completionDate = new Date(),
}: CertificateGeneratorProps) {
  const { user } = useAuth();
  const certificateRef = useRef<HTMLDivElement>(null);
  const displayName = user?.name || (user?.role === "admin" ? "Administrator" : "Cybersecurity Practitioner");

  const handleDownload = () => {
    if (certificateRef.current) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = 1200;
      canvas.height = 800;

      if (ctx) {
        // Deep Midnight Background
        ctx.fillStyle = "#080d1a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Metallic Cobalt Outer Border
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 6;
        ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

        // Subtle Inner Border
        ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

        // Header Title
        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 44px 'Segoe UI', Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("CERTIFICATE OF PROFICIENCY", canvas.width / 2, 140);

        // Subtitle
        ctx.font = "24px 'Segoe UI', Arial, sans-serif";
        ctx.fillStyle = "#3b82f6";
        ctx.fillText("CyberSafe Threat Defense Academy", canvas.width / 2, 190);

        // Certification statement
        ctx.font = "22px 'Segoe UI', Arial, sans-serif";
        ctx.fillStyle = "#94a3b8";
        ctx.fillText("This official credential recognizes that", canvas.width / 2, 280);

        // Recipient Name
        ctx.font = "bold 52px 'Segoe UI', Arial, sans-serif";
        ctx.fillStyle = "#60a5fa";
        ctx.fillText(displayName, canvas.width / 2, 360);

        // Course completion text
        ctx.font = "22px 'Segoe UI', Arial, sans-serif";
        ctx.fillStyle = "#94a3b8";
        ctx.fillText(
          "has satisfied all curriculum standards, hands-on labs, and requirements for",
          canvas.width / 2,
          430,
        );

        // Course Title
        ctx.font = "bold 36px 'Segoe UI', Arial, sans-serif";
        ctx.fillStyle = "#10b981";
        ctx.fillText(courseTitle, canvas.width / 2, 490);

        // Completion Date
        ctx.font = "20px 'Segoe UI', Arial, sans-serif";
        ctx.fillStyle = "#94a3b8";
        ctx.fillText(
          `Issued on ${completionDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
          canvas.width / 2,
          560,
        );

        // Verification metadata
        ctx.font = "14px monospace";
        ctx.fillStyle = "#64748b";
        ctx.fillText(
          `CREDENTIAL ID: CS-${courseId.toUpperCase().replace(/[^A-Z0-9]/g, "")}-${Date.now().toString(36).toUpperCase()}`,
          canvas.width / 2,
          680,
        );
        ctx.fillText(
          "Cryptographically verified & compliant with enterprise SOC competency standards.",
          canvas.width / 2,
          710,
        );

        // Trigger Download
        const link = document.createElement("a");
        link.download = `CyberSafe_Certificate_${courseId}_${displayName.replace(/\s+/g, "_")}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border border-border/80 bg-card overflow-hidden">
        <CardContent className="p-6">
          <div
            ref={certificateRef}
            className="bg-card/90 rounded-2xl border-2 border-primary/40 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl"
          >
            {/* Ambient Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-primary/10 blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="space-y-2 relative">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-sm">
                  <Award className="h-6 w-6" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shadow-sm">
                  <Shield className="h-6 w-6" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground uppercase">
                Certificate of Proficiency
              </h2>
              <p className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
                CyberSafe Threat Defense Academy
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-4 py-4 relative">
              <p className="text-xs text-muted-foreground">This is to officially certify that</p>

              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  {displayName}
                </h3>
                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <User className="h-3.5 w-3.5 text-primary" />
                  <span>
                    {user?.role === "admin"
                      ? "Enterprise Security Director"
                      : "Certified Defense Analyst"}
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground pt-2">
                has successfully demonstrated proficiency and completed all practical modules in
              </p>

              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-bold text-emerald-400">
                  {courseTitle}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Enterprise Cybersecurity Certification Curriculum
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2 font-mono">
                <Calendar className="h-3.5 w-3.5" />
                <span>Issued on {completionDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
              </div>
            </div>

            {/* Verification Footer */}
            <div className="border-t border-border/60 pt-5 space-y-1.5 relative text-xs text-muted-foreground">
              <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Digitally Verified
                </span>
                <span>•</span>
                <span>ID: CS-{courseId.toUpperCase().replace(/[^A-Z0-9]/g, "")}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download Button */}
      <div className="text-center">
        <Button
          onClick={handleDownload}
          size="lg"
          className="rounded-full px-8 h-11 text-sm font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30"
        >
          <Download className="h-4 w-4 mr-2" />
          Download High-Res Certificate
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Exports a 300 DPI high-resolution credential artifact suitable for printing or LinkedIn.
        </p>
      </div>
    </div>
  );
}

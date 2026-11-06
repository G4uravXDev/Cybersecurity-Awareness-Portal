import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, User, Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export function LoginGate() {
  const { login, loginWithGoogle } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleDemoLogin = async () => {
    await login("user", "user");
  };

  const handleAdminLogin = async () => {
    await login("admin", "admin");
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6 animate-fade-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 text-primary mx-auto mb-2 shadow-sm">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">CyberSafe</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Sign in to access your cybersecurity curriculum and resources
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border border-border/80 bg-card shadow-xl animate-scale-in">
          <CardHeader className="pb-3 text-center">
            <CardTitle className="text-base font-semibold">Authentication Required</CardTitle>
            <CardDescription className="text-xs">
              Please sign in or use demo mode to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full h-9 text-xs border-border/80 hover:bg-muted/50 font-medium"
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin text-primary" />
                  Connecting Google Account...
                </>
              ) : (
                <>
                  <GoogleIcon className="h-4 w-4 mr-2" />
                  Continue with Google
                </>
              )}
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Link to="/login" className="w-full">
                <Button className="w-full h-9 text-xs font-medium">Sign In</Button>
              </Link>
              <Link to="/signup" className="w-full">
                <Button variant="outline" className="w-full h-9 text-xs border-border/80 font-medium">
                  Register
                </Button>
              </Link>
            </div>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                <span className="bg-card px-2 text-muted-foreground">
                  Or Rapid Demo Access
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Button
                variant="outline"
                onClick={handleDemoLogin}
                className="w-full h-9 text-xs border-border/80 hover:bg-muted/50"
              >
                <User className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                Demo User
              </Button>
              <Button
                variant="outline"
                onClick={handleAdminLogin}
                className="w-full h-9 text-xs border-border/80 hover:bg-muted/50"
              >
                <Shield className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                Admin
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-[11px] text-muted-foreground/80 flex items-center justify-center gap-1.5">
          <Lock className="h-3 w-3 text-emerald-400" />
          Protected cybersecurity environment
        </p>
      </div>
    </div>
  );
}

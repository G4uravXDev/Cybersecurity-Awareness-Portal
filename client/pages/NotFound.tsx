import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldAlert } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md animate-fade-up">
        <div className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center mx-auto mb-6 text-muted-foreground">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">404 Error</p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          Page not found
        </h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          The requested page could not be located. It might have been relocated, updated, or removed.
        </p>
        <Button asChild variant="outline" className="rounded-full px-6 border-border/60">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

import { Button } from "@/components/ui/button";
import { Shield, Menu, Sun, Moon, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Map routes to page titles
  const getPageTitle = (pathname: string) => {
    if (pathname === "/") return "Home";
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/learning") return "Learning";
    if (pathname === "/threats") return "Threats";
    if (pathname === "/quiz") return "Quiz";
    if (pathname === "/news") return "News";
    if (pathname.startsWith("/learning/") && pathname.endsWith("/enrolled"))
      return "Course Enrolled";
    if (pathname.startsWith("/learning/")) return "Course Detail";
    if (pathname.startsWith("/threats/")) return "Threat Detail";
    return "Cybersecurity Portal";
  };

  const isActiveRoute = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Learning", href: "/learning" },
    { name: "Threats", href: "/threats" },
    { name: "Quiz", href: "/quiz" },
    { name: "News", href: "/news" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-sm">
            <Shield className="h-4 w-4" />
          </div>
          <span className="text-base font-bold tracking-tight text-foreground">
            CyberSafe
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`relative px-3 py-2 text-sm transition-colors duration-200 hover:text-foreground ${
                isActiveRoute(item.href)
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              {item.name}
              {isActiveRoute(item.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary animate-scale-in" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-1">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-10 h-10 p-0 rounded-full hover:bg-muted/80 transition-colors duration-200"
          >
            {isDark ? (
              <Sun className="h-[18px] w-[18px] text-muted-foreground transition-transform duration-200 hover:rotate-45" />
            ) : (
              <Moon className="h-[18px] w-[18px] text-muted-foreground transition-transform duration-200 hover:-rotate-12" />
            )}
          </Button>

          {/* User Menu */}
          <div className="hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 px-3 rounded-full hover:bg-muted/80 transition-colors duration-200"
                >
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">{user?.name || "User"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 animate-scale-in">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden w-10 h-10 p-0 rounded-full hover:bg-muted/80 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-[18px] w-[18px] text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl animate-fade-down">
          <div className="container py-4 px-4">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2.5 rounded-lg text-sm transition-colors duration-200 hover:text-foreground hover:bg-muted/60 ${
                    isActiveRoute(item.href)
                      ? "text-foreground font-semibold bg-muted/40"
                      : "text-muted-foreground font-medium"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="my-2 border-border/40" />
              <div className="flex items-center space-x-2 text-sm px-3 py-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{user?.name}</span>
                <span className="text-muted-foreground">({user?.role})</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="justify-start px-3 hover:bg-muted/60 rounded-lg"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

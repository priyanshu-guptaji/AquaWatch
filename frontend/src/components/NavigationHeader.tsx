import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplets, Menu, Bell, User, Search, Home, BarChart3, Map, AlertTriangle, BookOpen, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface NavigationHeaderProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export const NavigationHeader = ({ activeSection = "dashboard", onSectionChange }: NavigationHeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const navigationItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
    { id: "analytics", label: "Analytics", icon: BarChart3, path: "/analytics" },
    { id: "community", label: "Community", icon: AlertTriangle, path: "/community" },
    { id: "knowledge", label: "Knowledge Hub", icon: BookOpen, path: "/knowledge" },
    { id: "notifications", label: "Notifications", icon: Bell, path: "/notifications" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Droplets className="h-8 w-8 text-accent" />
                <div className="absolute inset-0 bg-accent/20 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  AquaWatch
                </h1>
                <p className="text-xs text-muted-foreground">India Groundwater Monitor</p>
              </div>
            </div>
            
            {/* National Status Badge */}
            <Badge className="bg-gradient-water text-white hidden md:flex">
              5,260 DWLR Stations Active
            </Badge>
          </div>

          {/* Navigation Items - Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => item.path ? navigate(item.path) : onSectionChange?.(item.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  {item.id === "notifications" && (
                    <Badge className="bg-water-critical text-white ml-1 animate-pulse">
                      3
                    </Badge>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden md:block">
              {isSearchOpen ? (
                <Input
                  placeholder="Search region, district..."
                  className="w-64 pr-8"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              )}
            </div>

            {/* Notifications */}
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 bg-water-critical text-white text-xs flex items-center justify-center animate-pulse">
                3
              </Badge>
            </Button>

            {/* Auth */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { logout(); navigate("/"); }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => navigate("/login")}>
                  <LogIn className="h-4 w-4" />
                  <span className="hidden md:inline">Login</span>
                </Button>
                <Button size="sm" onClick={() => navigate("/signup")}>Sign Up</Button>
              </div>
            )}

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="lg:hidden">
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => item.path ? navigate(item.path) : onSectionChange?.(item.id)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                      {item.id === "notifications" && (
                        <Badge className="bg-water-critical text-white ml-auto">3</Badge>
                      )}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

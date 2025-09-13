import { Outlet, useLocation } from "react-router-dom";
import { NavigationHeader } from "@/components/NavigationHeader";
import { SmartChatbot } from "@/components/advanced/AdvancedWidgets";

export default function Layout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader activeSection={location.pathname} />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <SmartChatbot />
    </div>
  );
}

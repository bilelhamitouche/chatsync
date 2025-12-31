import ChatSidebar from "@/components/ChatSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <SidebarProvider>
        <ChatSidebar />
        <div className="w-full h-full">{children}</div>
      </SidebarProvider>
    </div>
  );
}

export default Layout;

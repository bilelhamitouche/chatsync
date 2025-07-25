import Link from "next/link";
import SettingsTabs from "./components/SettingsTabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container justify-center p-8 mx-auto space-y-4 max-w-3xl h-full">
      <Button variant="link" className="text-gray-500" asChild>
        <Link href="/chat">
          <ArrowLeft />
          <span>Back to Chat</span>
        </Link>
      </Button>
      <h1 className="text-2xl font-bold">Settings</h1>
      <SettingsTabs>{children}</SettingsTabs>
    </div>
  );
}

export default Layout;

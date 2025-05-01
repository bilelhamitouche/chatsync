"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";

function CustomSidebarTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="outline" onClick={toggleSidebar}>
      <Menu />
    </Button>
  );
}

export default CustomSidebarTrigger;

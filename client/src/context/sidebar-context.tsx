import { createContext } from "@chakra-ui/react";

interface SidebarContextType {
  onClose?: () => void;
  onOpen?: () => void;
}

const [SidebarProvider, useSidebar] = createContext<SidebarContextType>();

export { SidebarProvider, useSidebar };

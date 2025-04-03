import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar";

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1>ChatSync</h1>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <h3>Hello</h3>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;

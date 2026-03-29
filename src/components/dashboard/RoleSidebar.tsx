import {
  LayoutDashboard, FolderKanban, ListTodo, Camera, FileText, DollarSign, Users, MessageSquare, Sparkles, Bell, Settings, LogOut, Building2, CheckSquare, ShieldCheck, Briefcase, ClipboardList, Eye, UserCheck,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { useRole, UserRole } from "@/contexts/RoleContext";
import { useNavigate } from "react-router-dom";

interface NavItem {
  title: string;
  url: string;
  icon: any;
  badge?: string;
}

const architectNav: { main: NavItem[]; secondary: NavItem[]; bottom: NavItem[] } = {
  main: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Projects", url: "/projects", icon: FolderKanban },
    { title: "Tasks", url: "/tasks", icon: ListTodo },
    { title: "Site Updates", url: "/updates", icon: Camera },
    { title: "Documents", url: "/documents", icon: FileText },
    { title: "Budget", url: "/budget", icon: DollarSign },
    { title: "Approvals", url: "/approvals", icon: CheckSquare },
  ],
  secondary: [
    { title: "Team", url: "/team", icon: Users },
    { title: "Consultants", url: "/consultants", icon: Briefcase },
    { title: "Chat", url: "/chat", icon: MessageSquare, badge: "9" },
    { title: "AI Assistant", url: "/ai", icon: Sparkles },
  ],
  bottom: [
    { title: "Notifications", url: "/notifications", icon: Bell },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
};

const contractorNav: { main: NavItem[]; secondary: NavItem[]; bottom: NavItem[] } = {
  main: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "My Tasks", url: "/tasks", icon: ListTodo },
    { title: "Site Updates", url: "/updates", icon: Camera },
    { title: "Site Logbook", url: "/logbook", icon: ClipboardList },
    { title: "Documents", url: "/documents", icon: FileText },
  ],
  secondary: [
    { title: "Chat", url: "/chat", icon: MessageSquare, badge: "3" },
  ],
  bottom: [
    { title: "Notifications", url: "/notifications", icon: Bell },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
};

const clientNav: { main: NavItem[]; secondary: NavItem[]; bottom: NavItem[] } = {
  main: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Project Progress", url: "/projects", icon: Eye },
    { title: "Site Updates", url: "/updates", icon: Camera },
    { title: "Budget Overview", url: "/budget", icon: DollarSign },
    { title: "Approvals", url: "/approvals", icon: CheckSquare },
  ],
  secondary: [
    { title: "Documents", url: "/documents", icon: FileText },
  ],
  bottom: [
    { title: "Notifications", url: "/notifications", icon: Bell },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
};

const consultantNav: { main: NavItem[]; secondary: NavItem[]; bottom: NavItem[] } = {
  main: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Requests", url: "/consultation-requests", icon: Briefcase },
    { title: "Responses", url: "/chat", icon: MessageSquare },
  ],
  secondary: [
    { title: "Documents", url: "/documents", icon: FileText },
  ],
  bottom: [
    { title: "Notifications", url: "/notifications", icon: Bell },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
};

const navByRole: Record<UserRole, typeof architectNav> = {
  architect: architectNav,
  contractor: contractorNav,
  client: clientNav,
  consultant: consultantNav,
};

const roleLabels: Record<UserRole, string> = {
  architect: "Architect",
  contractor: "Contractor",
  client: "Client",
  consultant: "Consultant",
};

export function RoleSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { role, userName } = useRole();
  const navigate = useNavigate();
  const nav = navByRole[role];

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent className="bg-card">
        <div className="flex items-center gap-2.5 px-4 py-5">
          <div className="w-8 h-8 rounded-lg byld-gradient flex items-center justify-center shrink-0">
            <Building2 className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-foreground tracking-tight leading-none">BYLD</span>
              <span className="text-[10px] text-muted-foreground capitalize">{roleLabels[role]}</span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/60 uppercase text-[10px] tracking-widest font-semibold">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className="text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg transition-all duration-200" activeClassName="bg-primary/10 text-primary font-medium">
                      <item.icon className="mr-2.5 h-4 w-4 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                      {item.badge && !collapsed && (
                        <span className="ml-auto w-5 h-5 rounded-full byld-gradient flex items-center justify-center text-[10px] font-bold text-primary-foreground">{item.badge}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {nav.secondary.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-muted-foreground/60 uppercase text-[10px] tracking-widest font-semibold">
              {role === "consultant" ? "Resources" : "Collaborate"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.secondary.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className="text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg transition-all duration-200" activeClassName="bg-primary/10 text-primary font-medium">
                        <item.icon className="mr-2.5 h-4 w-4 shrink-0" />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                        {item.badge && !collapsed && (
                          <span className="ml-auto w-5 h-5 rounded-full byld-gradient flex items-center justify-center text-[10px] font-bold text-primary-foreground">{item.badge}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <div className="flex-1" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.bottom.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className="text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg transition-all duration-200" activeClassName="bg-primary/10 text-primary font-medium">
                      <item.icon className="mr-2.5 h-4 w-4 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-card border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={() => {
                  localStorage.removeItem("byld-role");
                  navigate("/login");
                }}
                className="w-full flex items-center text-muted-foreground hover:bg-secondary rounded-lg px-3 py-2"
              >
                <LogOut className="mr-2.5 h-4 w-4 shrink-0" />
                {!collapsed && <span className="text-sm">Log out</span>}
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

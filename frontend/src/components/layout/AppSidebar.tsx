import { useState } from "react"
import {
    LayoutDashboard,
    Users,
    FolderOpen,
    FileText,
    MessageSquare,
    Settings,
    Moon,
    Sun
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const mainItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Clients", url: "/clients", icon: Users },
    { title: "Projects", url: "/projects", icon: FolderOpen },
    { title: "Invoices", url: "/invoices", icon: FileText },
    { title: "Notes", url: "/notes", icon: MessageSquare },
]

const settingsItems = [
    { title: "Settings", url: "/settings", icon: Settings },
]

export default function AppSidebar() {
    const { state } = useSidebar()
    const collapsed = state === "collapsed"
    const location = useLocation()
    const currentPath = location.pathname
    const [isDark, setIsDark] = useState(false)

    const isActive = (path: string) => currentPath === path
    const isExpanded = mainItems.some((i) => isActive(i.url))

    const getNavCls = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "bg-sidebar-accent text-sidebar-primary font-medium shadow-sm"
            : "hover:bg-sidebar-accent/50 text-sidebar-foreground"

    const toggleTheme = () => {
        setIsDark(!isDark)
        document.documentElement.classList.toggle('dark')
    }

  return (
    <Sidebar
    className={`${collapsed ? "w-14" : "w-64"} border-sidebar-border bg-sidebar transition-all duration-200`}
    >
        <SidebarContent className="p-4">
            {/* Logo */}
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">CT</span>

                    </div>
                    {!collapsed && (
                        <div>
                            <h1 className="font-semibold text-sidebar-foreground">Cliently4Us</h1>
                            <p className="text-xs text-sidebar-foreground/70">CRM Dashboard</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Navigation */}
            <SidebarGroup className="space-y-1">
                <SidebarGroupContent>
                    <SidebarMenu className="space-y-1">
                        {mainItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild className="rounded-lg">
                                    <NavLink to={item.url} end className={getNavCls}>
                                        <item.icon className="h-4 w-4" />
                                        {!collapsed && <span className="text-sm">{item.title}</span>}
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

            {/* Settings */}
            <div className="mt-auto">
                <SidebarMenu className="space-y-1">
                    {settingsItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild className="rounded-lg">
                                <NavLink to={item.url} className={getNavCls}>
                                <item.icon className="h-4 w-4" />
                                {!collapsed && <span className="text-sm">{item.title}</span>}
                                </NavLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}

                     {/* Theme Toggle */}
                    <SidebarMenuItem>
                        <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="w-full justify-start rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50">
                            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            {!collapsed && <span className="txt-sm ml-2">Theme</span>}
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
            </div>
        </SidebarContent>
    </Sidebar>
  )
}

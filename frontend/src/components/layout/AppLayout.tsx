import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            
            <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-6">
                <SidebarTrigger className="mr-4" />
                <div className="flex items-center justify-between w-full">
                <div>
                    <h2 className="text-sm font-medium text-foreground">
                    Welcome back
                    </h2>
                    <p className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                    </p>
                </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gradient-subtle">
                {children}
            </main>
            </div>
        </div>
        </SidebarProvider>
    )
}
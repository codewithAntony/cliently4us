import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Users, FolderOpen, FileText, MessageSquare, Zap, Shield, BarChart3 } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
    const features = [
        {
        icon: <Users className="h-6 w-6" />,
        title: "Client Management",
        description: "Keep track of all your clients with detailed profiles and contact information."
        },
        {
        icon: <FolderOpen className="h-6 w-6" />,
        title: "Project Tracking",
        description: "Organize projects with clear status tracking and progress visualization."
        },
        {
        icon: <FileText className="h-6 w-6" />,
        title: "Invoice Management",
        description: "Generate and track invoices with automated reminders and payment status."
        },
        {
        icon: <MessageSquare className="h-6 w-6" />,
        title: "Communication Logs",
        description: "Record and organize all client communications in one centralized place."
        },
        {
        icon: <BarChart3 className="h-6 w-6" />,
        title: "Analytics Dashboard",
        description: "Get insights into your business performance with comprehensive metrics."
        },
        {
        icon: <Zap className="h-6 w-6" />,
        title: "Fast & Responsive",
        description: "Built for speed with a modern, intuitive interface that works everywhere."
        }
    ]

return (
    <div className="min-h-screen bg-gradient-subtle">
        {/* Navigation */}
        <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CT</span>
            </div>
            <span className="font-semibold text-foreground">ClientTrack Pro</span>
            </div>
            
            <div className="flex items-center gap-4">
            <Link to="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
            <Link to="/dashboard">
                <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-200">
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </Link>
            </div>
        </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Zap className="h-4 w-4" />
            Built for freelancers and agencies
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            The CRM that
            <span className="bg-gradient-primary bg-clip-text text-transparent"> works</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            A lightweight, fast, and intuitive CRM dashboard designed specifically for freelancers and agencies. 
            Manage clients, track projects, handle invoices, and organize communications—all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-200 text-lg px-8 py-6">
                Start Managing Clients
                <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Shield className="h-5 w-5 mr-2" />
                View Features
            </Button>
            </div>
        </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need to manage your business
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ClientTrack Pro brings together all the tools you need to run your freelance business or agency efficiently.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-200 group">
                <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
                    {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
            ))}
        </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
        <Card className="p-12 bg-gradient-primary text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Built for productivity and growth
            </h2>
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
            Join freelancers and agencies who have streamlined their client management workflow.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <div className="text-4xl font-bold mb-2">50%</div>
                <div className="text-white/80">Less time on admin tasks</div>
            </div>
            <div>
                <div className="text-4xl font-bold mb-2">3x</div>
                <div className="text-white/80">Faster invoice processing</div>
            </div>
            <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-white/80">Client satisfaction rate</div>
            </div>
            </div>
        </Card>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to streamline your business?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Start managing your clients, projects, and invoices more efficiently today.
            </p>
            
            <Link to="/dashboard">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-200 text-lg px-8 py-6">
                Get Started Now
                <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            </Link>
        </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CT</span>
                </div>
                <span className="font-semibold text-foreground">ClientTrack Pro</span>
            </div>
            
            <div className="flex items-center gap-6">
                <span className="text-sm text-muted-foreground">
                © 2024 ClientTrack Pro. Built with ❤️ for freelancers and agencies.
                </span>
            </div>
            </div>
        </div>
        </footer>
    </div>
)
}
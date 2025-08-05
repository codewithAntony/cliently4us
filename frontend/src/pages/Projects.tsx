import { useState } from "react"
import { Plus, Search, Calendar, Users, MoreHorizontal, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Projects() {
    const [searchTerm, setSearchTerm] = useState("")

    const projects = [
        {
        id: 1,
        name: "Website Redesign",
        client: "AcmeCorp",
        status: "In Progress",
        priority: "High",
        progress: 75,
        dueDate: "2024-02-15",
        tasksTotal: 12,
        tasksCompleted: 9,
        budget: "$15,000",
        spent: "$11,250"
        },
        {
        id: 2,
        name: "Mobile App Development",
        client: "TechStart Inc",
        status: "Planning",
        priority: "Medium",
        progress: 25,
        dueDate: "2024-03-20",
        tasksTotal: 20,
        tasksCompleted: 5,
        budget: "$25,000",
        spent: "$6,250"
        },
        {
        id: 3,
        name: "Brand Identity",
        client: "RetailCo",
        status: "Review",
        priority: "Low",
        progress: 90,
        dueDate: "2024-02-01",
        tasksTotal: 8,
        tasksCompleted: 7,
        budget: "$8,000",
        spent: "$7,200"
        },
        {
        id: 4,
        name: "E-commerce Platform",
        client: "FinanceApp",
        status: "Done",
        priority: "High",
        progress: 100,
        dueDate: "2024-01-30",
        tasksTotal: 15,
        tasksCompleted: 15,
        budget: "$30,000",
        spent: "$28,500"
        }
    ]

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const statusColors = {
        "Planning": "bg-warning/20 text-warning border-warning/30",
        "In Progress": "bg-primary/20 text-primary border-primary/30",
        "Review": "bg-accent/20 text-accent-foreground border-accent/30",
        "Done": "bg-success/20 text-success border-success/30"
    }

    const priorityColors = {
        "High": "text-destructive",
        "Medium": "text-warning",
        "Low": "text-muted-foreground"
    }

    const getProgressColor = (progress: number) => {
        if (progress >= 90) return "bg-success"
        if (progress >= 60) return "bg-primary"
        if (progress >= 30) return "bg-warning"
        return "bg-muted-foreground"
    }

    const getDaysUntilDue = (dueDate: string) => {
        const due = new Date(dueDate)
        const today = new Date()
        const diffTime = due.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-1">
            Track and manage your ongoing projects
            </p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            New Project
        </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-4">
            <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search projects by name or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50"
            />
            </div>
            <Button variant="outline">Filter by Status</Button>
            <Button variant="outline">Sort by Due Date</Button>
        </div>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
            <Card key={project.id} className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-200 group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{project.name}</h3>
                    <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                    {project.status}
                    </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {project.client}
                    </span>
                    <span className={`font-medium ${priorityColors[project.priority as keyof typeof priorityColors]}`}>
                    {project.priority} Priority
                    </span>
                </div>
                </div>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Project</DropdownMenuItem>
                    <DropdownMenuItem>Add Task</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Progress Section */}
            <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                    {project.tasksCompleted}/{project.tasksTotal} tasks completed
                </span>
                <span className="text-foreground font-medium">
                    {project.spent} / {project.budget}
                </span>
                </div>
            </div>

            {/* Due Date */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Due:</span>
                <span className="text-foreground font-medium">
                    {new Date(project.dueDate).toLocaleDateString()}
                </span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className={`font-medium ${
                    getDaysUntilDue(project.dueDate) < 7 
                    ? 'text-destructive' 
                    : getDaysUntilDue(project.dueDate) < 14 
                    ? 'text-warning' 
                    : 'text-success'
                }`}>
                    {getDaysUntilDue(project.dueDate)} days
                </span>
                </div>
            </div>
            </Card>
        ))}
        </div>

        {filteredProjects.length === 0 && (
        <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-border/50">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white mx-auto mb-4">
            <Plus className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first project"}
            </p>
            <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Project
            </Button>
        </Card>
        )}
    </div>
)
}
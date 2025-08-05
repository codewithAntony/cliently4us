import { useState } from 'react'
import { Plus, Search, MoreHorizontal, Mail, Phone, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Clients() {
    const [searchTerm, setSearchTerm] = useState("")

    const clients = [
        {
            id: 1,
            name: "John Smith",
            company: "AcmeCorp",
            email: "john@acmecorp.com",
            phone: "+1 (555) 123-4567",
            status: "Active",
            projects: 3,
            totalValue: "$45, 000",
            lastContact: "2 days ago"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            company: "TechStart Inc",
            email: "sarah@techstart.com",
            phone: "+1 (555) 987-6543",
            status: "Active",
            projects: 2,
            totalValue: "$32, 500",
            lastContact: "1 week ago"
        },
        {
            id: 3,
            name: "Mike Chen",
            company: "FinanceApp",
            email: "mike@financeapp.io",
            phone: "+1 (555) 456-7890",
            status: "Inactive",
            projects: 1,
            totalValue: "$18, 000",
            lastContact: "3 weeks ago"
        },
        {
            id: 4,
            name: "Emma Wilson",
            company: "RetailCo",
            email: "emma@retailco.com",
            phone: "+1 (555) 321-0987",
            status: "Active",
            projects: 3,
            totalValue: "$67, 200",
            lastContact: "1 days ago"
        },
    ]

    const filteredClients = clients.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const statusColors = {
        "Active": "bg-success/20 text-success border-success/30",
        "Inactive": "bg-muted text-muted-foreground border-muted"
    }

return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold text-foreground">Clients</h1>
            <p className="text-muted-foreground mt-1">
                Manage your client relationships and contacts
            </p>
            </div>
            <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
            </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                placeholder="Search clients by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50"
                />
            </div>
            <Button variant="outline">Filter</Button>
            </div>
        </Card>

        {/* Client Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
            <Card key={client.id} className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-200 group">
                <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-semibold">
                    {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                    <h3 className="font-semibold text-foreground">{client.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {client.company}
                    </p>
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
                    <DropdownMenuItem>Edit Client</DropdownMenuItem>
                    <DropdownMenuItem>Add Note</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>

                <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{client.phone}</span>
                </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                <Badge className={statusColors[client.status as keyof typeof statusColors]}>
                    {client.status}
                </Badge>
                <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{client.totalValue}</p>
                    <p className="text-xs text-muted-foreground">{client.projects} projects</p>
                </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                    Last contact: {client.lastContact}
                </p>
                </div>
            </Card>
            ))}
        </div>

        {filteredClients.length === 0 && (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-border/50">
            <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No clients found</h3>
            <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first client"}
            </p>
            <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Client
            </Button>
            </Card>
        )}
        </div>
  )
}

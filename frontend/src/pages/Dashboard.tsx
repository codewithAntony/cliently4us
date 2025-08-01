import React from 'react'
import { Users, FolderOpen, FileText, TrendingUp, Clock, DollarSign } from "lucide-react"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/buttons"

export default function Dashboard() {

  const metrics = [
    {
      title: "Active Clients",
      value: 24,
      change: "+3 this month",
      changeType: "positive" as const,
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Open Projects",
      value: 12,
      change: "+2 this week",
      changeType: "positive" as const,
      icon: <FolderOpen className="h-5 w-5" />
    },
    {
      title: "Pending Invoices",
      value: "$8, 540",
      change: "-$1, 200",
      changeType: "positive" as const,
      icon: <FileText className="h-5 w-5" />
    },
    {
      title: "Monthly Revenue",
      value: "$24, 780",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: <DollarSign className="h-5 w-5" />
    },
  ]

  const recentTasks = [
    { id:1, title: "Design system for AcmeCorp", client: "AcmeCorp", status: "In Progress", priority: "High" },
    { id:2, title: "Website optimization", client: "TechStart", status: "Review", priority: "Medium" },
    { id:3, title: "Mobile app prototype", client: "FinanceApp", status: "Todo", priority: "High" },
    { id:4, title: "Brand guidelines", client: "RetailCo", status: "Done", priority: "Low" }
  ]

  const statusColors = {
    "Todo": "bg-warning/20 text-warning border-warning/30",
    "In Progress": "bg-primary/20 text-primary border-primary/30",
    "Review": "bg-accent/20 text-accent-foreground border-accent/30",
    "Done": "bg-success/20 text-success border-success/30",
  }

  const priorityColors = {
    "High": "text-destructive",
    "Medium": "text-warning",
    "Low": "text-muted-foreground"
  }

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>Dashboard</h1>
          <p className='text-muted-foreground mt-1'>Overview of your business metrics and recent activity</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-200">
        <TrendingUp className='h-4 w-4 mr-2' />
        Generate Report
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
        key={index}
        title={metric.title}
        value={metric.value}
        change={metric.change}
        changeType={metric.changeType}
        icon={metric.icon}
        />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-lg font-semibold text-foreground'>Recent Tasks</h3>
            <p className='text-sm text-muted-foreground'>Latest project activities</p>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>

        <div className='space-y-4'>
          {recentTasks.map((task) => (
            <div key={task.id} className='flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 hover:bg-background/80 transition-colors'>
              <div className='flex'>
                <h4 className='font-medium text-foreground'>{task.title}</h4>
                <p className='text-sm text-muted-foreground'>{task.client}</p>
              </div>
              <div className='flex items-center gap-3'>
                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${statusColors[task.status as keyof typeof statusColors]}`}>
                  {task.status}
                </span>
                <span className={`text-xs font-medium ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                  {task.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
        </Card>

        {/* Quick Stats */}
        <div className='space-y-6'>
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <div className='flex items-center gap-3 mb-4'>
            <Clock className='h-5 w-5 text-primary' />
            <h3 className='font-semibold text-foreground'>This Week</h3>
          </div>
          <div className='space-y-3'>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Hours Logged</span>
              <span className='font-medium text-foreground'>42.5h</span>
            </div>
            <div className='flex justify-between'>
            <span className='text-sm text-muted-foreground'>Tasks Completed</span>
            <span className='font-medium text-foreground'>18</span>
            </div>
            <div className='flex justify-between'>
            <span className='text-sm text-muted-foreground'>Meetings</span>
            <span className='font-medium text-foreground'>7</span>
            </div>
          </div>
          </Card>

          <Card className="p-6 bg-gradient-primary text-white">
            <div className='space-y-3'>
              <h3 className='font-semibold'>Quick Actions</h3>
              <div className='space-y-2'>
                <Button variant="outline" size="sm" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                Add New Client
                </Button>
                <Button variant="outline" size="sm" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                Create Invoice
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

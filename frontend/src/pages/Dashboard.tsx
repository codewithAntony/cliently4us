"use client"

import React, { useEffect, useState } from "react";
import {
  Users,
  CheckCircle,
  DollarSign,
  AlertCircle,
  Clock,
  Star
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Client {
  id: number
  name: string
  company: string
  status: string
}

interface Invoice {
  id: number
  clientId: number
  amount: number
  status: string
  dueDate: string
}

interface Task {
  id: number
  title: string
  status: string
  priority: string
  dueDate: string
}

interface Summary {
  activeClient: number
  unpaidInvoices: number
  openTasks: number
}

export const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<Summary>({ activeClient: 0, unpaidInvoices: 0, openTasks: 0 })
  const [recentClients, setRecentClients] = useState<Client[]>([])
  const [urgentTasks, setUrgentTasks] = useState<Task[]>([])
  const [unpaidInvoices, setUnpaidInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    fetch("http://localhost:3000/api/dashboard", {
      credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => {
      setSummary(data.summary)
      setRecentClients(data.recentClients)
      setUrgentTasks(data.urgentTasks)
      setUnpaidInvoices(data.unpaidInvoices)
    })
    .catch((err) => console.error("Dashboard fetch error:", err))
  }, [])

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Active Clients" value={summary.activeClient} icon={Users} color="blue" />
        <StatCard title="Open Tasks" value={summary.openTasks} icon={CheckCircle} color="yellow" />
        <StatCard title="Unpaid Invoices" value={summary.unpaidInvoices} icon={DollarSign} color="red" />
      </div>

      {/* Recent Clients */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentClients.map((client) => (
              <li key={client.id} className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-muted-foreground">{client.company}</p>
                </div>
                <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {client.status}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Urgent Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Urgent Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {urgentTasks.map((task) => (
              <li key={task.id} className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <span className="ml-auto text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                  {task.priority}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Unpaid Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Unpaid Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {unpaidInvoices.map((invoice) => (
              <li key={invoice.id} className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="font-medium">Invoice #{invoice.id}</p>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(invoice.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <span className="ml-auto text-sm font-medium">
                  ${invoice.amount.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

const StatCard: React.FC<{
  title: string
  value: number
  icon: React.ElementType
  color: string
}> = ({ title, value, icon: Icon, color }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 text-${color}-500`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
)
import React from "react";
import {
  Users,
  FileText,
  CheckCircle,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Clock,
  Star
} from 'lucide-react'
import { mockClients, mockInvoices, mockTasks } from "@/data/mockData";

const StatCard: React.FC<{
  title: string
  value: string | number
  icon: React.ComponentType<any>
  trend?: string
  color?: string
}> = ({ title, value, icon: Icon, trend, color = 'slate' }) => {
  const colorClasses = {
    slate: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}

export const Dashboard: React.FC = () => {
  const activeClients = mockClients.filter(client => client.status === 'active').length
  const unpaidInvoices = mockInvoices.filter(invoice => invoice.status !== 'paid')
  const totalUnpaid = unpaidInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const openTasks = mockTasks.filter(task => task.status !== 'done').length
  const completedTasks = mockTasks.filter(task => task.status === 'done').length

  const recentClients = mockClients.slice(0, 3)
  const urgentTasks = mockTasks.filter(task => task.priority === 'high' && task.status !== 'done').slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Welcome back! Here's happening with your business</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Clients"
          value={activeClients}
          icon={Users}
          trend="+12% from last month"
          color="blue"
        />
        <StatCard
          title="Open Task"
          value={openTasks}
          icon={CheckCircle}
          color="yellow"
        />
        <StatCard
          title="Unpaid Invoices"
          value={`$${totalUnpaid.toLocaleString()}`}
          icon={DollarSign}
          color="red"
        />
        <StatCard
          title="Completed Tasks"
          value={completedTasks}
          icon={Star}
          trend="+8 this week"
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Recent Clients
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">
{client.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400">{client.company}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    client.status === 'active'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                  }`}>
                    {client.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              Urgent Tasks
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {urgentTasks.length > 0 ? urgentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      task.status === 'todo' ? 'bg-grat-400' :
                      task.status === 'in-progress' ? 'bg-blue-500' : 'bg-green-500'
                    }`} />

                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{task.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Due {new Date(task.dueDate!).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-full">
                    High
                  </span>
                </div>
              )) : (
                <p className="text-sm text-slate-500 darK:text-slate-400 text-center py-8">
                  No urgent tasks at the moment
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Unpaid Invoices */}
        {unpaidInvoices.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Unpaid Invoices</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Due Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {unpaidInvoices.slice(0, 5).map((invoice) => {
                    const client = mockClients.find(c => c.id === invoice.clientId)
                    return (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">
{client?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">
${invoice.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            invoice.status === 'overdue'
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                              : invoice.status === 'sent'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </div>
  )
}
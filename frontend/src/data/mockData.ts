import { Client, Project, Task, Invoice, Note } from '../types'

export const mockClients: Client[] = [
    {
        id: '1',
        name: 'Sarah Chen',
        email: 'sarah@techstartup.com',
        phone: '+1 (555) 123-4567',
        company: 'TechStartup Inc',
        status: 'active',
        createdAt: '15-01-2024',
        updatedAt: '20-01-2024'
    },
    {
        id: '2',
        name: 'Michael Rodriguez',
        email: 'mike@designstudio.com',
        phone: '+1 (555) 987-6543',
        company: 'Design Studio Co',
        status: 'active',
        createdAt: '10-01-2024',
        updatedAt: '18-01-2024'
    },
    {
        id: '3',
        name: 'Emily Johnson',
        email: 'emily@retailbrand.com',
        phone: '+1 (555) 456-7890',
        company: 'Retail Brand LLC',
        status: 'active',
        createdAt: '05-01-2024',
        updatedAt: '15-01-2024'
    },
]

export const mockProjects: Project[] = [
    {
        id: '1',
        name: 'Website Redesign',
        description: 'Complete redesign of company website',
        clientId: '1',
        status: 'active',
        crearedAt: '15-01-2024',
        updatedAt: '20-01-2024'
    },
    {
        id: '2',
        name: 'Mobile App Development',
        description: 'Native iOS and Android app',
        clientId: '2',
        status: 'active',
        crearedAt: '10-01-2024',
        updatedAt: '18-01-2024'
    },
    {
        id: '3',
        name: 'Brand Identity',
        description: 'Logo and brand guideline creation',
        clientId: '3',
        status: 'completed',
        crearedAt: '05-01-2024',
        updatedAt: '15-01-2024'
    },
]

export const mockTasks: Task[] = [
    {
        id: '1',
        title: 'Create wireframes',
        description: 'Design wireframes for main pages',
        status: 'completed',
        priority: 'high',
        projectId: '1',
        clientId: '1',
        dueDate: '02-01-2024',
        crearedAt: '05-01-2024',
        updatedAt: '15-01-2024'
    },
    {
        id: '2',
        title: 'Develop homepage',
        description: 'Code the new homepage design',
        status: 'in-progress',
        priority: 'high',
        projectId: '1',
        clientId: '1',
        dueDate: '05-02-2024',
        crearedAt: '16-01-2024',
        updatedAt: '21-01-2024'
    },
    {
        id: '3',
        title: 'Setup authentication',
        description: 'Implement user login system',
        status: 'todo',
        priority: 'medium',
        projectId: '2',
        clientId: '2',
        dueDate: '10-02-2024',
        crearedAt: '17-01-2024',
        updatedAt: '17-01-2024'
    },
    {
        id: '4',
        title: 'Design app icons',
        description: 'Create app store icons',
        status: 'todo',
        priority: 'low',
        projectId: '2',
        clientId: '2',
        dueDate: '15-02-2024',
        crearedAt: '18-01-2024',
        updatedAt: '18-01-2024'
    },
]

export const mockInvoices: Invoice[] = [
    {
        id: '1',
        clientId: '1',
        amount: 5000,
        description: 'Website redesign - Phase 1',
        status: 'paid',
        dueDate: '01-02-2024',
        crearedAt: '15-01-2024',
        updatedAt: '20-01-2024'
    },
    {
        id: '2',
        clientId: '2',
        amount: 8000,
        description: 'Mobile app development - Milestone 1',
        status: 'sent',
        dueDate: '15-02-2024',
        crearedAt: '20-01-2024',
        updatedAt: '20-01-2024'
    },
    {
        id: '3',
        clientId: '1',
        amount: 3000,
        description: 'Website redesign - Phase 2',
        status: 'overdue',
        dueDate: '25-01-2024',
        crearedAt: '10-01-2024',
        updatedAt: '10-01-2024'
    },
    {
        id: '4',
        clientId: '3',
        amount: 2500,
        description: 'Brand identity package',
        status: 'draft',
        dueDate: '20-02-2024',
        crearedAt: '22-01-2024',
        updatedAt: '22-01-2024'
    }
]

export const mockNotes: Note[] = [
    {
        id: '1',
        clientId: '1',
        content: 'Initial project kickoff meeting. Discussed timeline and requirements.',
        type: 'meeting',
        createdAt: '15-01-2024T10:00:00Z',
        createdBy: '1'
    },
    {
        id: '2',
        clientId: '1',
        content: 'Client approved wireframes with minor revisions to the navigation.',
        type: 'email',
        createdAt: '18-01-2024T14:30:00Z',
        createdBy: '1'
    },
    {
        id: '3',
        clientId: '2',
        content: 'Follow-up call scheduled for next week to review app prototypes.',
        type: 'call',
        createdAt: '20-01-2024T09:15:00Z',
        createdBy: '1'
    },
    {
        id: '4',
        clientId: '2',
        content: 'Client mentioned they want to add social login features.',
        type: 'note',
        createdAt: '21-01-2024T16:45:00Z',
        createdBy: '1'
    },
]
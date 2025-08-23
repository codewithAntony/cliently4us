import React from 'react';
import { ArrowRight, CheckCircle, Users, BarChart3, FileText, MessageSquare, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FeatureCard: React.FC<{
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    }> = ({ icon: Icon, title, description }) => (
    <div className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
    </div>
);

const StatCard: React.FC<{
    number: string;
    label: string;
    }> = ({ number, label }) => (
    <div className="text-center">
        <div className="text-3xl font-bold text-white mb-2">{number}</div>
        <div className="text-slate-300 text-sm">{label}</div>
    </div>
);

export const HomePage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if (user) {
        navigate('/dashboard');
        } else {
        navigate('/auth');
        }
    };

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    {/* Navigation */}
    <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CS</span>
            </div>
            <span className="ml-3 text-xl font-bold text-white">ClientSight</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
            <a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a>
        </div>

        <div className="flex items-center space-x-4">
            {user ? (
            <Button onClick={() => navigate('/dashboard')} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Go to Dashboard
            </Button>
            ) : (
            <>
                <Button variant="ghost" onClick={() => navigate('/auth')} className="text-white hover:bg-white/10">
                Sign In
                </Button>
                <Button onClick={handleGetStarted} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Get Started
                </Button>
            </>
            )}
        </div>
        </div>
    </nav>

    {/* Hero Section */}
    <section className="relative px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white mb-8">
            <Zap className="h-4 w-4 mr-2 text-yellow-400" />
            Built for modern teams and freelancers
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Client management
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                made simple
            </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            The lightweight CRM that helps freelancers and agencies manage clients, 
            track projects, handle invoices, and streamline communication-all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 text-lg"
            >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
                variant="outline" 
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
                Watch Demo
            </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <StatCard number="1k+" label="Active Users" />
            <StatCard number="99.9%" label="Uptime" />
            <StatCard number="50+" label="Integrations" />
            <StatCard number="24/7" label="Support" />
            </div>
        </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-6xl mx-auto mt-20 relative">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img 
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
            alt="ClientTrack Pro Dashboard"
            className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
        </div>
        </div>
    </section>

    {/* Features Section */}
    <section id="features" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
            Everything you need to manage clients
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Powerful features designed to streamline your workflow and grow your business
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
            icon={Users}
            title="Client Management"
            description="Keep all client information organized with detailed profiles, contact history, and project associations."
            />
            <FeatureCard
            icon={BarChart3}
            title="Project Tracking"
            description="Monitor project progress with intuitive task boards, deadlines, and milestone tracking."
            />
            <FeatureCard
            icon={FileText}
            title="Invoice Management"
            description="Create, send, and track invoices with automated reminders and payment status updates."
            />
            <FeatureCard
            icon={MessageSquare}
            title="Communication Logs"
            description="Document all client interactions with timestamped notes and conversation history."
            />
            <FeatureCard
            icon={Shield}
            title="Secure & Private"
            description="Enterprise-grade security with encrypted data storage and secure authentication."
            />
            <FeatureCard
            icon={Globe}
            title="Team Collaboration"
            description="Work together seamlessly with role-based access and real-time updates."
            />
        </div>
        </div>
    </section>

    {/* Social Proof Section */}
    <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by teams worldwide
            </h2>
            <p className="text-xl text-slate-300">
            Join thousands of freelancers and agencies who trust ClientSight
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center mb-4">
                <img 
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
                alt="Sarah Chen"
                className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                <div className="font-semibold text-white">Sarah Chen</div>
                <div className="text-slate-300 text-sm">Freelance Designer</div>
                </div>
            </div>
            <p className="text-slate-300 leading-relaxed">
                "ClientSight transformed how I manage my freelance business. 
                The invoice tracking alone has saved me hours every week."
            </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center mb-4">
                <img 
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
                alt="Michael Rodriguez"
                className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                <div className="font-semibold text-white">Michael Rodriguez</div>
                <div className="text-slate-300 text-sm">Agency Owner</div>
                </div>
            </div>
            <p className="text-slate-300 leading-relaxed">
                "Finally, a CRM that doesn't overcomplicate things. Clean interface, 
                powerful features, and our team adopted it instantly."
            </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center mb-4">
                <img 
                src="https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
                alt="Emily Johnson"
                className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                <div className="font-semibold text-white">Emily Johnson</div>
                <div className="text-slate-300 text-sm">Marketing Consultant</div>
                </div>
            </div>
            <p className="text-slate-300 leading-relaxed">
                "The communication logs feature is a game-changer. I can track every 
                client interaction and never miss important details."
            </p>
            </div>
        </div>
        </div>
    </section>

    {/* CTA Section */}
    <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-4">
            Ready to streamline your client management?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
            Join thousands of professionals who trust ClientSight to grow their business
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 text-lg"
            >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex items-center text-slate-300 text-sm">
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                No credit card required
            </div>
            </div>
        </div>
        </div>
    </section>

    {/* Footer */}
    <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
            </div>
            <span className="ml-3 text-lg font-bold text-white">ClientSight</span>
            </div>
            
            <div className="flex items-center space-x-6 text-slate-300 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} ClientSight. All rights reserved.
        </div>
        </div>
    </footer>
    </div>
);
};
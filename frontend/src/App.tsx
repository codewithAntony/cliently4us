import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/clients" element={<AppLayout><Clients /></AppLayout>} />
          <Route path="/projects" element={<AppLayout><Projects /></AppLayout>} />
          <Route path="/invoices" element={<AppLayout><div className='p-8 text-center'><h1 className='text-2xl font-bold text-foreground'>Invoices</h1><p className='text-muted-foreground'>Coming soon ...</p></div></AppLayout>} />
          <Route path="/notes" element={<AppLayout><div className='p-8 text-center'><h1 className='text-2xl font-bold text-foreground'>Notes</h1><p className='text-muted-foreground'>Coming soon ...</p></div></AppLayout>} />
          <Route path="/settings" element={<AppLayout><div className='p-8 text-center'><h1 className='text-2xl font-bold text-foreground'>Settings</h1><p className='text-muted-foreground'>Coming soon ...</p></div></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App

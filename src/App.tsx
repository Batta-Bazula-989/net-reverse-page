import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LanguageLayout from "@/components/LanguageLayout";
import LanguageRedirect from "@/components/LanguageRedirect";
import NotFound from "@/pages/NotFound";
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LanguageRedirect />} />
            <Route path="/en/*" element={<LanguageLayout urlLang="en" />} />
            <Route path="/ru/*" element={<LanguageLayout urlLang="ru" />} />
            <Route path="/uk/*" element={<LanguageLayout urlLang="uk" />} />
            <Route path="*" element={
              <LanguageProvider urlLang="en">
                <NotFound />
              </LanguageProvider>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

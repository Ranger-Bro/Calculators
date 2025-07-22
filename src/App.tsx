import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BasicCalculator from "./components/calculators/BasicCalculator";
import ScientificCalculator from "./components/calculators/ScientificCalculator";
import UnitConverter from "./components/converters/UnitConverter";
import NotFound from "./components/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculator/basic" element={<BasicCalculator />} />
          <Route path="/calculator/scientific" element={<ScientificCalculator />} />
          <Route path="/converter/unit" element={<UnitConverter />} />
          {/* Placeholder routes for other calculators */}
          <Route path="/converter/currency" element={<NotFound />} />
          <Route path="/converter/temperature" element={<NotFound />} />
          <Route path="/converter/weight" element={<NotFound />} />
          <Route path="/calculator/time" element={<NotFound />} />
          <Route path="/calculator/percentage" element={<NotFound />} />
          <Route path="/calculator/financial" element={<NotFound />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

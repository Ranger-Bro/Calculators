import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BasicCalculator from "./components/calculators/BasicCalculator";
import ScientificCalculator from "./components/calculators/ScientificCalculator";
import PercentageCalculator from "./components/calculators/PercentageCalculator";
import TimeCalculator from "./components/calculators/TimeCalculator";
import FinancialCalculator from "./components/calculators/FinancialCalculator";
import UnitConverter from "./components/converters/UnitConverter";
import CurrencyConverter from "./components/converters/CurrencyConverter";
import TemperatureConverter from "./components/converters/TemperatureConverter";
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
          <Route path="/calculator/percentage" element={<PercentageCalculator />} />
          <Route path="/calculator/time" element={<TimeCalculator />} />
          <Route path="/calculator/financial" element={<FinancialCalculator />} />
          <Route path="/converter/unit" element={<UnitConverter />} />
          <Route path="/converter/currency" element={<CurrencyConverter />} />
          <Route path="/converter/temperature" element={<TemperatureConverter />} />
          {/* Weight converter uses the same unit converter */}
          <Route path="/converter/weight" element={<UnitConverter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Calculator, Zap, Ruler, DollarSign, Thermometer, Weight, Clock, Percent, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const calculatorTools = [
    {
      id: 'basic',
      title: 'Basic Calculator',
      description: 'Essential arithmetic operations',
      icon: Calculator,
      gradient: 'bg-gradient-primary',
      route: '/calculator/basic'
    },
    {
      id: 'scientific',
      title: 'Scientific Calculator',
      description: 'Advanced mathematical functions',
      icon: Zap,
      gradient: 'bg-gradient-science',
      route: '/calculator/scientific'
    },
    {
      id: 'unit',
      title: 'Unit Converter',
      description: 'Convert between different units',
      icon: Ruler,
      gradient: 'bg-gradient-secondary',
      route: '/converter/unit'
    },
    {
      id: 'currency',
      title: 'Currency Converter',
      description: 'Live exchange rates',
      icon: DollarSign,
      gradient: 'bg-gradient-success',
      route: '/converter/currency'
    },
    {
      id: 'temperature',
      title: 'Temperature Converter',
      description: 'Celsius, Fahrenheit, Kelvin',
      icon: Thermometer,
      gradient: 'bg-gradient-accent',
      route: '/converter/temperature'
    },
    {
      id: 'weight',
      title: 'Weight Converter',
      description: 'Mass and weight units',
      icon: Weight,
      gradient: 'bg-gradient-warning',
      route: '/converter/weight'
    },
    {
      id: 'time',
      title: 'Time Calculator',
      description: 'Duration and time calculations',
      icon: Clock,
      gradient: 'bg-gradient-primary',
      route: '/calculator/time'
    },
    {
      id: 'percentage',
      title: 'Percentage Calculator',
      description: 'Quick percentage calculations',
      icon: Percent,
      gradient: 'bg-gradient-secondary',
      route: '/calculator/percentage'
    },
    {
      id: 'financial',
      title: 'Financial Calculator',
      description: 'Loans, interest, investments',
      icon: TrendingUp,
      gradient: 'bg-gradient-success',
      route: '/calculator/financial'
    }
  ];

  const handleToolClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <div className="pt-12 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in-up">
          Calculator Suite
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Your all-in-one collection of calculators and converters for every need
        </p>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {calculatorTools.map((tool, index) => (
            <div
              key={tool.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
              onClick={() => handleToolClick(tool.route)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`
                ${tool.gradient} 
                p-8 rounded-3xl shadow-medium hover:shadow-strong 
                text-white relative overflow-hidden
                transition-all duration-300 ease-bounce
                min-h-[200px] flex flex-col justify-between
              `}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white rounded-full"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-4">
                    <tool.icon className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                    {tool.title}
                  </h3>
                  
                  <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                    {tool.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="relative z-10 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8 px-4">
        <p className="text-muted-foreground">
          Select any tool above to get started with your calculations
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
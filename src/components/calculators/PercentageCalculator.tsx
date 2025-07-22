import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PercentageCalculator = () => {
  const navigate = useNavigate();
  
  // Basic Percentage
  const [basicValue, setBasicValue] = useState('');
  const [basicPercentage, setBasicPercentage] = useState('');
  const [basicResult, setBasicResult] = useState('');

  // Percentage Increase/Decrease
  const [originalValue, setOriginalValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [changeResult, setChangeResult] = useState('');

  // Percentage of Total
  const [partValue, setPartValue] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [ratioResult, setRatioResult] = useState('');

  const calculateBasicPercentage = () => {
    if (!basicValue || !basicPercentage) return;
    const value = parseFloat(basicValue);
    const percentage = parseFloat(basicPercentage);
    if (isNaN(value) || isNaN(percentage)) return;
    
    const result = (value * percentage) / 100;
    setBasicResult(result.toString());
  };

  const calculatePercentageChange = () => {
    if (!originalValue || !newValue) return;
    const original = parseFloat(originalValue);
    const newVal = parseFloat(newValue);
    if (isNaN(original) || isNaN(newVal) || original === 0) return;
    
    const change = ((newVal - original) / original) * 100;
    setChangeResult(change.toFixed(2));
  };

  const calculateRatio = () => {
    if (!partValue || !totalValue) return;
    const part = parseFloat(partValue);
    const total = parseFloat(totalValue);
    if (isNaN(part) || isNaN(total) || total === 0) return;
    
    const ratio = (part / total) * 100;
    setRatioResult(ratio.toFixed(2));
  };

  const buttonClasses = "w-full bg-gradient-primary text-white hover:shadow-medium transition-all duration-200";

  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="mr-2 hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Percentage Calculator</h1>
        </div>

        <div className="space-y-6">
          {/* Basic Percentage Calculation */}
          <Card className="p-6 shadow-strong">
            <h3 className="text-lg font-semibold text-foreground mb-4">Calculate Percentage</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Value</label>
                  <Input
                    type="number"
                    value={basicValue}
                    onChange={(e) => setBasicValue(e.target.value)}
                    placeholder="Enter value"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Percentage</label>
                  <Input
                    type="number"
                    value={basicPercentage}
                    onChange={(e) => setBasicPercentage(e.target.value)}
                    placeholder="Enter %"
                  />
                </div>
              </div>
              <Button onClick={calculateBasicPercentage} className={buttonClasses}>
                Calculate
              </Button>
              {basicResult && (
                <div className="p-3 bg-muted rounded-lg text-center">
                  <span className="text-lg font-semibold text-foreground">
                    {basicPercentage}% of {basicValue} = {basicResult}
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Percentage Change */}
          <Card className="p-6 shadow-strong">
            <h3 className="text-lg font-semibold text-foreground mb-4">Percentage Change</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Original Value</label>
                  <Input
                    type="number"
                    value={originalValue}
                    onChange={(e) => setOriginalValue(e.target.value)}
                    placeholder="Enter original"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">New Value</label>
                  <Input
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="Enter new"
                  />
                </div>
              </div>
              <Button onClick={calculatePercentageChange} className={buttonClasses}>
                Calculate Change
              </Button>
              {changeResult && (
                <div className={`p-3 rounded-lg text-center ${parseFloat(changeResult) >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <span className="text-lg font-semibold">
                    {parseFloat(changeResult) >= 0 ? '+' : ''}{changeResult}%
                  </span>
                  <div className="text-sm">
                    {parseFloat(changeResult) >= 0 ? 'Increase' : 'Decrease'}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* What percentage is X of Y */}
          <Card className="p-6 shadow-strong">
            <h3 className="text-lg font-semibold text-foreground mb-4">What % is X of Y?</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Part (X)</label>
                  <Input
                    type="number"
                    value={partValue}
                    onChange={(e) => setPartValue(e.target.value)}
                    placeholder="Enter part"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Total (Y)</label>
                  <Input
                    type="number"
                    value={totalValue}
                    onChange={(e) => setTotalValue(e.target.value)}
                    placeholder="Enter total"
                  />
                </div>
              </div>
              <Button onClick={calculateRatio} className={buttonClasses}>
                Calculate Ratio
              </Button>
              {ratioResult && (
                <div className="p-3 bg-muted rounded-lg text-center">
                  <span className="text-lg font-semibold text-foreground">
                    {partValue} is {ratioResult}% of {totalValue}
                  </span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PercentageCalculator;
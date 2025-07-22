import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UnitConverter = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('1');
  const [outputValue, setOutputValue] = useState('');
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');

  const conversions = {
    length: {
      name: 'Length',
      units: {
        mm: { name: 'Millimeter', factor: 0.001 },
        cm: { name: 'Centimeter', factor: 0.01 },
        m: { name: 'Meter', factor: 1 },
        km: { name: 'Kilometer', factor: 1000 },
        in: { name: 'Inch', factor: 0.0254 },
        ft: { name: 'Foot', factor: 0.3048 },
        yd: { name: 'Yard', factor: 0.9144 },
        mi: { name: 'Mile', factor: 1609.34 }
      }
    },
    weight: {
      name: 'Weight',
      units: {
        mg: { name: 'Milligram', factor: 0.000001 },
        g: { name: 'Gram', factor: 0.001 },
        kg: { name: 'Kilogram', factor: 1 },
        oz: { name: 'Ounce', factor: 0.0283495 },
        lb: { name: 'Pound', factor: 0.453592 },
        ton: { name: 'Ton', factor: 1000 }
      }
    },
    volume: {
      name: 'Volume',
      units: {
        ml: { name: 'Milliliter', factor: 0.001 },
        l: { name: 'Liter', factor: 1 },
        gal: { name: 'Gallon (US)', factor: 3.78541 },
        qt: { name: 'Quart (US)', factor: 0.946353 },
        pt: { name: 'Pint (US)', factor: 0.473176 },
        cup: { name: 'Cup (US)', factor: 0.236588 },
        floz: { name: 'Fluid Ounce (US)', factor: 0.0295735 }
      }
    },
    area: {
      name: 'Area',
      units: {
        sqmm: { name: 'Square Millimeter', factor: 0.000001 },
        sqcm: { name: 'Square Centimeter', factor: 0.0001 },
        sqm: { name: 'Square Meter', factor: 1 },
        sqkm: { name: 'Square Kilometer', factor: 1000000 },
        sqin: { name: 'Square Inch', factor: 0.00064516 },
        sqft: { name: 'Square Foot', factor: 0.092903 },
        acre: { name: 'Acre', factor: 4046.86 }
      }
    }
  };

  const convert = () => {
    if (!inputValue || !fromUnit || !toUnit) return;

    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    const categoryData = conversions[category as keyof typeof conversions];
    const fromUnitData = (categoryData.units as any)[fromUnit];
    const toUnitData = (categoryData.units as any)[toUnit];
    
    if (!fromUnitData || !toUnitData) return;

    // Convert to base unit, then to target unit
    const baseValue = value * fromUnitData.factor;
    const result = baseValue / toUnitData.factor;
    
    setOutputValue(result.toFixed(6).replace(/\.?0+$/, ''));
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setInputValue(outputValue);
    setOutputValue(inputValue);
  };

  // Auto-convert when values change
  useEffect(() => {
    convert();
  }, [inputValue, fromUnit, toUnit, category]);

  // Set default units when category changes
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const categoryData = conversions[newCategory as keyof typeof conversions];
    const units = Object.keys(categoryData.units);
    setFromUnit(units[0] || '');
    setToUnit(units[1] || units[0] || '');
    setInputValue('1');
    setOutputValue('');
  };

  // Initialize default units
  if (!fromUnit) {
    const categoryData = conversions[category as keyof typeof conversions];
    const units = Object.keys(categoryData.units);
    setFromUnit(units[0] || '');
    setToUnit(units[1] || units[0] || '');
  }

  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-md mx-auto">
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
          <h1 className="text-2xl font-bold text-foreground">Unit Converter</h1>
        </div>

        <Card className="p-6 shadow-strong space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(conversions).map(([key, data]) => (
                  <SelectItem key={key} value={key}>
                    {data.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* From Unit */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">From</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  convert();
                }}
                className="flex-1"
                placeholder="Enter value"
              />
              <Select value={fromUnit} onValueChange={(value) => {
                setFromUnit(value);
                convert();
              }}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(conversions[category as keyof typeof conversions].units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={swapUnits}
              className="hover:bg-muted"
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>

          {/* To Unit */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">To</label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={outputValue}
                readOnly
                className="flex-1 bg-muted"
                placeholder="Result"
              />
              <Select value={toUnit} onValueChange={(value) => {
                setToUnit(value);
                convert();
              }}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(conversions[category as keyof typeof conversions].units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Convert Button */}
          <Button
            onClick={convert}
            className="w-full bg-gradient-secondary text-white hover:shadow-medium transition-all duration-200"
          >
            Convert
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default UnitConverter;
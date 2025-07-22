import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TemperatureConverter = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('0');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [result, setResult] = useState('32');

  const temperatureUnits = {
    celsius: { name: 'Celsius', symbol: '°C' },
    fahrenheit: { name: 'Fahrenheit', symbol: '°F' },
    kelvin: { name: 'Kelvin', symbol: 'K' },
    rankine: { name: 'Rankine', symbol: '°R' }
  };

  const convert = () => {
    if (!inputValue || isNaN(parseFloat(inputValue))) return;

    const value = parseFloat(inputValue);
    let celsius: number;

    // Convert input to Celsius first
    switch (fromUnit) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      case 'rankine':
        celsius = (value - 491.67) * 5/9;
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to target unit
    let convertedValue: number;
    switch (toUnit) {
      case 'celsius':
        convertedValue = celsius;
        break;
      case 'fahrenheit':
        convertedValue = celsius * 9/5 + 32;
        break;
      case 'kelvin':
        convertedValue = celsius + 273.15;
        break;
      case 'rankine':
        convertedValue = celsius * 9/5 + 491.67;
        break;
      default:
        convertedValue = celsius;
    }

    setResult(convertedValue.toFixed(2));
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setInputValue(result);
    setResult(inputValue);
  };

  const presetTemperatures = [
    { name: 'Water Freezing', celsius: 0 },
    { name: 'Room Temperature', celsius: 20 },
    { name: 'Body Temperature', celsius: 37 },
    { name: 'Water Boiling', celsius: 100 }
  ];

  const setPreset = (celsius: number) => {
    let value: number;
    switch (fromUnit) {
      case 'celsius':
        value = celsius;
        break;
      case 'fahrenheit':
        value = celsius * 9/5 + 32;
        break;
      case 'kelvin':
        value = celsius + 273.15;
        break;
      case 'rankine':
        value = celsius * 9/5 + 491.67;
        break;
      default:
        value = celsius;
    }
    setInputValue(value.toString());
    convert();
  };

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
          <h1 className="text-2xl font-bold text-foreground">Temperature Converter</h1>
        </div>

        <Card className="p-6 shadow-strong space-y-6">
          {/* From Temperature */}
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
                placeholder="Enter temperature"
              />
              <Select value={fromUnit} onValueChange={(value) => {
                setFromUnit(value);
                convert();
              }}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(temperatureUnits).map(([key, unit]) => (
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

          {/* To Temperature */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">To</label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={result}
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
                  {Object.entries(temperatureUnits).map(([key, unit]) => (
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
            className="w-full bg-gradient-accent text-white hover:shadow-medium transition-all duration-200"
          >
            Convert
          </Button>

          {/* Preset Temperatures */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Quick Presets</label>
            <div className="grid grid-cols-2 gap-2">
              {presetTemperatures.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  size="sm"
                  onClick={() => setPreset(preset.celsius)}
                  className="text-xs hover:bg-muted"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Formula Info */}
          {result && (
            <div className="text-center text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              {inputValue} {temperatureUnits[fromUnit as keyof typeof temperatureUnits].symbol} = {result} {temperatureUnits[toUnit as keyof typeof temperatureUnits].symbol}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TemperatureConverter;
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TimeCalculator = () => {
  const navigate = useNavigate();
  
  // Time Addition/Subtraction
  const [time1Hours, setTime1Hours] = useState('0');
  const [time1Minutes, setTime1Minutes] = useState('0');
  const [time1Seconds, setTime1Seconds] = useState('0');
  const [time2Hours, setTime2Hours] = useState('0');
  const [time2Minutes, setTime2Minutes] = useState('0');
  const [time2Seconds, setTime2Seconds] = useState('0');
  const [operation, setOperation] = useState('add');
  const [timeResult, setTimeResult] = useState('');

  // Time Duration Between Dates
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [durationResult, setDurationResult] = useState('');

  // Convert Time Units
  const [convertValue, setConvertValue] = useState('');
  const [fromUnit, setFromUnit] = useState('seconds');
  const [toUnit, setToUnit] = useState('minutes');
  const [convertResult, setConvertResult] = useState('');

  const timeUnits = {
    milliseconds: { name: 'Milliseconds', factor: 1 },
    seconds: { name: 'Seconds', factor: 1000 },
    minutes: { name: 'Minutes', factor: 60000 },
    hours: { name: 'Hours', factor: 3600000 },
    days: { name: 'Days', factor: 86400000 },
    weeks: { name: 'Weeks', factor: 604800000 },
    months: { name: 'Months', factor: 2592000000 },
    years: { name: 'Years', factor: 31536000000 }
  };

  const calculateTime = () => {
    const h1 = parseInt(time1Hours) || 0;
    const m1 = parseInt(time1Minutes) || 0;
    const s1 = parseInt(time1Seconds) || 0;
    const h2 = parseInt(time2Hours) || 0;
    const m2 = parseInt(time2Minutes) || 0;
    const s2 = parseInt(time2Seconds) || 0;

    const totalSeconds1 = h1 * 3600 + m1 * 60 + s1;
    const totalSeconds2 = h2 * 3600 + m2 * 60 + s2;

    let resultSeconds;
    if (operation === 'add') {
      resultSeconds = totalSeconds1 + totalSeconds2;
    } else {
      resultSeconds = totalSeconds1 - totalSeconds2;
    }

    if (resultSeconds < 0) {
      resultSeconds = Math.abs(resultSeconds);
    }

    const hours = Math.floor(resultSeconds / 3600);
    const minutes = Math.floor((resultSeconds % 3600) / 60);
    const seconds = resultSeconds % 60;

    setTimeResult(`${hours}h ${minutes}m ${seconds}s`);
  };

  const calculateDuration = () => {
    if (!startDate || !endDate) return;

    const start = new Date(`${startDate}T${startTime || '00:00'}`);
    const end = new Date(`${endDate}T${endTime || '00:00'}`);

    const diffMs = Math.abs(end.getTime() - start.getTime());
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    setDurationResult(`${days} days, ${hours} hours, ${minutes} minutes`);
  };

  const convertTimeUnits = () => {
    if (!convertValue || isNaN(parseFloat(convertValue))) return;

    const value = parseFloat(convertValue);
    const fromFactor = timeUnits[fromUnit as keyof typeof timeUnits].factor;
    const toFactor = timeUnits[toUnit as keyof typeof timeUnits].factor;

    const result = (value * fromFactor) / toFactor;
    setConvertResult(result.toFixed(6).replace(/\.?0+$/, ''));
  };

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
          <h1 className="text-2xl font-bold text-foreground">Time Calculator</h1>
        </div>

        <div className="space-y-6">
          {/* Time Addition/Subtraction */}
          <Card className="p-6 shadow-strong">
            <h3 className="text-lg font-semibold text-foreground mb-4">Add/Subtract Time</h3>
            <div className="space-y-4">
              {/* First Time */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Time 1</label>
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    type="number"
                    value={time1Hours}
                    onChange={(e) => setTime1Hours(e.target.value)}
                    placeholder="Hours"
                    min="0"
                  />
                  <Input
                    type="number"
                    value={time1Minutes}
                    onChange={(e) => setTime1Minutes(e.target.value)}
                    placeholder="Minutes"
                    min="0"
                    max="59"
                  />
                  <Input
                    type="number"
                    value={time1Seconds}
                    onChange={(e) => setTime1Seconds(e.target.value)}
                    placeholder="Seconds"
                    min="0"
                    max="59"
                  />
                </div>
              </div>

              {/* Operation */}
              <div className="flex justify-center space-x-2">
                <Button
                  variant={operation === 'add' ? 'default' : 'outline'}
                  onClick={() => setOperation('add')}
                  className="flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
                <Button
                  variant={operation === 'subtract' ? 'default' : 'outline'}
                  onClick={() => setOperation('subtract')}
                  className="flex items-center"
                >
                  <Minus className="w-4 h-4 mr-1" />
                  Subtract
                </Button>
              </div>

              {/* Second Time */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Time 2</label>
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    type="number"
                    value={time2Hours}
                    onChange={(e) => setTime2Hours(e.target.value)}
                    placeholder="Hours"
                    min="0"
                  />
                  <Input
                    type="number"
                    value={time2Minutes}
                    onChange={(e) => setTime2Minutes(e.target.value)}
                    placeholder="Minutes"
                    min="0"
                    max="59"
                  />
                  <Input
                    type="number"
                    value={time2Seconds}
                    onChange={(e) => setTime2Seconds(e.target.value)}
                    placeholder="Seconds"
                    min="0"
                    max="59"
                  />
                </div>
              </div>

              <Button 
                onClick={calculateTime} 
                className="w-full bg-gradient-primary text-white hover:shadow-medium transition-all duration-200"
              >
                Calculate
              </Button>

              {timeResult && (
                <div className="p-3 bg-muted rounded-lg text-center">
                  <span className="text-lg font-semibold text-foreground">
                    Result: {timeResult}
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Duration Between Dates */}
          <Card className="p-6 shadow-strong">
            <h3 className="text-lg font-semibold text-foreground mb-4">Duration Between Dates</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Start Time (optional)</label>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">End Time (optional)</label>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={calculateDuration} 
                className="w-full bg-gradient-secondary text-white hover:shadow-medium transition-all duration-200"
              >
                Calculate Duration
              </Button>

              {durationResult && (
                <div className="p-3 bg-muted rounded-lg text-center">
                  <span className="text-lg font-semibold text-foreground">
                    Duration: {durationResult}
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Time Unit Converter */}
          <Card className="p-6 shadow-strong">
            <h3 className="text-lg font-semibold text-foreground mb-4">Convert Time Units</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  value={convertValue}
                  onChange={(e) => setConvertValue(e.target.value)}
                  placeholder="Value"
                />
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(timeUnits).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(timeUnits).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={convertTimeUnits} 
                className="w-full bg-gradient-accent text-white hover:shadow-medium transition-all duration-200"
              >
                Convert
              </Button>

              {convertResult && (
                <div className="p-3 bg-muted rounded-lg text-center">
                  <span className="text-lg font-semibold text-foreground">
                    {convertValue} {timeUnits[fromUnit as keyof typeof timeUnits].name.toLowerCase()} = {convertResult} {timeUnits[toUnit as keyof typeof timeUnits].name.toLowerCase()}
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

export default TimeCalculator;
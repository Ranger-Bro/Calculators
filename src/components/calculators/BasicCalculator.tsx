import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BasicCalculator = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const result = calculate(currentValue, inputValue, operation);
      
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);
    
    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const buttonClasses = "h-16 text-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95";
  const numberButtonClasses = `${buttonClasses} bg-card hover:bg-muted text-foreground shadow-soft`;
  const operatorButtonClasses = `${buttonClasses} bg-gradient-primary text-white shadow-soft hover:shadow-medium`;
  const equalsButtonClasses = `${buttonClasses} bg-gradient-accent text-white shadow-soft hover:shadow-medium`;

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
          <h1 className="text-2xl font-bold text-foreground">Basic Calculator</h1>
        </div>

        <Card className="p-6 shadow-strong">
          {/* Display */}
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <div className="text-right text-3xl font-mono text-foreground min-h-[2.5rem] flex items-center justify-end">
              {display}
            </div>
          </div>

          {/* Buttons Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <Button className={numberButtonClasses} onClick={clear}>
              C
            </Button>
            <Button className={numberButtonClasses} onClick={() => setDisplay(display.slice(0, -1) || '0')}>
              ⌫
            </Button>
            <Button className={operatorButtonClasses} onClick={() => inputOperation('÷')}>
              ÷
            </Button>
            <Button className={operatorButtonClasses} onClick={() => inputOperation('×')}>
              ×
            </Button>

            {/* Row 2 */}
            <Button className={numberButtonClasses} onClick={() => inputNumber('7')}>
              7
            </Button>
            <Button className={numberButtonClasses} onClick={() => inputNumber('8')}>
              8
            </Button>
            <Button className={numberButtonClasses} onClick={() => inputNumber('9')}>
              9
            </Button>
            <Button className={operatorButtonClasses} onClick={() => inputOperation('-')}>
              −
            </Button>

            {/* Row 3 */}
            <Button className={numberButtonClasses} onClick={() => inputNumber('4')}>
              4
            </Button>
            <Button className={numberButtonClasses} onClick={() => inputNumber('5')}>
              5
            </Button>
            <Button className={numberButtonClasses} onClick={() => inputNumber('6')}>
              6
            </Button>
            <Button className={operatorButtonClasses} onClick={() => inputOperation('+')}>
              +
            </Button>

            {/* Row 4 */}
            <Button className={numberButtonClasses} onClick={() => inputNumber('1')}>
              1
            </Button>
            <Button className={numberButtonClasses} onClick={() => inputNumber('2')}>
              2
            </Button>
            <Button className={numberButtonClasses} onClick={() => inputNumber('3')}>
              3
            </Button>
            <Button className={`${equalsButtonClasses} row-span-2`} onClick={performCalculation}>
              =
            </Button>

            {/* Row 5 */}
            <Button className={`${numberButtonClasses} col-span-2`} onClick={() => inputNumber('0')}>
              0
            </Button>
            <Button className={numberButtonClasses} onClick={inputDecimal}>
              .
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BasicCalculator;
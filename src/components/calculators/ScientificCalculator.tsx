import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScientificCalculator = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState('0');
  const [isRadians, setIsRadians] = useState(true);

  const inputNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const inputOperation = (op: string) => {
    setDisplay(display + op);
  };

  const calculate = () => {
    try {
      // Replace display operators with JavaScript operators
      let expression = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString())
        .replace(/sin\(/g, isRadians ? 'Math.sin(' : '(Math.sin(Math.PI/180*')
        .replace(/cos\(/g, isRadians ? 'Math.cos(' : '(Math.cos(Math.PI/180*')
        .replace(/tan\(/g, isRadians ? 'Math.tan(' : '(Math.tan(Math.PI/180*')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**');

      const result = eval(expression);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
  };

  const buttonClasses = "h-12 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95";
  const numberButtonClasses = `${buttonClasses} bg-card hover:bg-muted text-foreground shadow-soft`;
  const operatorButtonClasses = `${buttonClasses} bg-gradient-science text-white shadow-soft hover:shadow-medium`;
  const functionButtonClasses = `${buttonClasses} bg-gradient-secondary text-white shadow-soft hover:shadow-medium`;

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
          <h1 className="text-2xl font-bold text-foreground">Scientific Calculator</h1>
        </div>

        <Card className="p-6 shadow-strong">
          {/* Display */}
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <div className="text-right text-2xl font-mono text-foreground min-h-[2rem] flex items-center justify-end overflow-hidden">
              {display}
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="mb-4 flex justify-center">
            <Button
              size="sm"
              variant={isRadians ? "default" : "outline"}
              onClick={() => setIsRadians(!isRadians)}
              className="mr-2"
            >
              RAD
            </Button>
            <Button
              size="sm"
              variant={!isRadians ? "default" : "outline"}
              onClick={() => setIsRadians(!isRadians)}
            >
              DEG
            </Button>
          </div>

          {/* Scientific Functions Row */}
          <div className="grid grid-cols-5 gap-2 mb-3">
            <Button className={functionButtonClasses} onClick={() => inputOperation('sin(')}>
              sin
            </Button>
            <Button className={functionButtonClasses} onClick={() => inputOperation('cos(')}>
              cos
            </Button>
            <Button className={functionButtonClasses} onClick={() => inputOperation('tan(')}>
              tan
            </Button>
            <Button className={functionButtonClasses} onClick={() => inputOperation('ln(')}>
              ln
            </Button>
            <Button className={functionButtonClasses} onClick={() => inputOperation('log(')}>
              log
            </Button>
          </div>

          {/* Constants and Functions Row */}
          <div className="grid grid-cols-5 gap-2 mb-3">
            <Button className={functionButtonClasses} onClick={() => inputNumber('π')}>
              π
            </Button>
            <Button className={functionButtonClasses} onClick={() => inputNumber('e')}>
              e
            </Button>
            <Button className={functionButtonClasses} onClick={() => inputOperation('√(')}>
              √
            </Button>
            <Button className={functionButtonClasses} onClick={() => inputOperation('^')}>
              x^y
            </Button>
            <Button className={functionButtonClasses} onClick={() => inputOperation('(')}>
              (
            </Button>
          </div>

          {/* Main Calculator Grid */}
          <div className="grid grid-cols-5 gap-2">
            {/* Row 1 */}
            <Button className={operatorButtonClasses} onClick={clear}>
              C
            </Button>
            <Button className={operatorButtonClasses} onClick={() => setDisplay(display.slice(0, -1) || '0')}>
              ⌫
            </Button>
            <Button className={functionButtonClasses} onClick={() => inputOperation(')')}>
              )
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
            <Button className="bg-gradient-accent text-white shadow-soft hover:shadow-medium h-12 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 row-span-2" onClick={calculate}>
              =
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
            <Button className={`${numberButtonClasses} col-span-2`} onClick={() => inputNumber('0')}>
              0
            </Button>

            {/* Row 5 */}
            <Button className={numberButtonClasses} onClick={() => inputOperation('.')}>
              .
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ScientificCalculator;
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FinancialCalculator = () => {
  const navigate = useNavigate();
  
  // Loan Calculator
  const [loanAmount, setLoanAmount] = useState('');
  const [loanRate, setLoanRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [loanResult, setLoanResult] = useState('');

  // Compound Interest
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [compoundFreq, setCompoundFreq] = useState('12');
  const [compoundResult, setCompoundResult] = useState('');

  // Investment Return
  const [initialInvestment, setInitialInvestment] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [investmentTime, setInvestmentTime] = useState('');
  const [returnResult, setReturnResult] = useState('');

  // Mortgage Calculator
  const [homePrice, setHomePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [mortgageRate, setMortgageRate] = useState('');
  const [mortgageYears, setMortgageYears] = useState('30');
  const [mortgageResult, setMortgageResult] = useState('');

  const calculateLoan = () => {
    if (!loanAmount || !loanRate || !loanTerm) return;
    
    const P = parseFloat(loanAmount);
    const r = parseFloat(loanRate) / 100 / 12; // Monthly interest rate
    const n = parseFloat(loanTerm) * 12; // Total months
    
    if (r === 0) {
      // No interest
      const payment = P / n;
      setLoanResult(`Monthly Payment: $${payment.toFixed(2)}`);
    } else {
      // With interest
      const payment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPaid = payment * n;
      const totalInterest = totalPaid - P;
      
      setLoanResult(`Monthly Payment: $${payment.toFixed(2)}\nTotal Interest: $${totalInterest.toFixed(2)}\nTotal Paid: $${totalPaid.toFixed(2)}`);
    }
  };

  const calculateCompoundInterest = () => {
    if (!principal || !interestRate || !timePeriod) return;
    
    const P = parseFloat(principal);
    const r = parseFloat(interestRate) / 100;
    const n = parseFloat(compoundFreq); // Compounding frequency per year
    const t = parseFloat(timePeriod);
    
    const amount = P * Math.pow(1 + r / n, n * t);
    const interest = amount - P;
    
    setCompoundResult(`Final Amount: $${amount.toFixed(2)}\nInterest Earned: $${interest.toFixed(2)}`);
  };

  const calculateReturn = () => {
    if (!initialInvestment || !finalValue || !investmentTime) return;
    
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);
    const years = parseFloat(investmentTime);
    
    const totalReturn = ((final - initial) / initial) * 100;
    const annualReturn = (Math.pow(final / initial, 1 / years) - 1) * 100;
    
    setReturnResult(`Total Return: ${totalReturn.toFixed(2)}%\nAnnual Return: ${annualReturn.toFixed(2)}%`);
  };

  const calculateMortgage = () => {
    if (!homePrice || !downPayment || !mortgageRate || !mortgageYears) return;
    
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const loanAmount = price - down;
    const r = parseFloat(mortgageRate) / 100 / 12; // Monthly rate
    const n = parseFloat(mortgageYears) * 12; // Total months
    
    if (r === 0) {
      const payment = loanAmount / n;
      setMortgageResult(`Monthly Payment: $${payment.toFixed(2)}\nLoan Amount: $${loanAmount.toFixed(2)}`);
    } else {
      const payment = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPaid = payment * n;
      const totalInterest = totalPaid - loanAmount;
      
      setMortgageResult(`Monthly Payment: $${payment.toFixed(2)}\nLoan Amount: $${loanAmount.toFixed(2)}\nTotal Interest: $${totalInterest.toFixed(2)}`);
    }
  };

  const buttonClasses = "w-full bg-gradient-success text-white hover:shadow-medium transition-all duration-200";

  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-2xl mx-auto">
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
          <h1 className="text-2xl font-bold text-foreground">Financial Calculator</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Loan Calculator */}
          <Card className="p-6 shadow-strong">
            <h3 className="text-lg font-semibold text-foreground mb-4">Loan Calculator</h3>
            <div className="space-y-4">
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Loan Amount ($)"
              />
              <Input
                type="number"
                value={loanRate}
                onChange={(e) => setLoanRate(e.target.value)}
                placeholder="Annual Interest Rate (%)"
                step="0.01"
              />
              <Input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="Loan Term (years)"
              />
              <Button onClick={calculateLoan} className={buttonClasses}>
                Calculate
              </Button>
              {loanResult && (
                <div className="p-3 bg-muted rounded-lg">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                    {loanResult}
                  </pre>
                </div>
              )}
            </div>
          </Card>

          {/* Compound Interest */}
          <Card className="p-6 shadow-strong">
            <h3 className="text-lg font-semibold text-foreground mb-4">Compound Interest</h3>
            <div className="space-y-4">
              <Input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Principal Amount ($)"
              />
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Annual Interest Rate (%)"
                step="0.01"
              />
              <Input
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                placeholder="Time Period (years)"
              />
              <Select value={compoundFreq} onValueChange={setCompoundFreq}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={calculateCompoundInterest} className={buttonClasses}>
                Calculate
              </Button>
              {compoundResult && (
                <div className="p-3 bg-muted rounded-lg">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                    {compoundResult}
                  </pre>
                </div>
              )}
            </div>
          </Card>

          {/* Investment Return */}
          <Card className="p-6 shadow-strong">
            <h3 className="text-lg font-semibold text-foreground mb-4">Investment Return</h3>
            <div className="space-y-4">
              <Input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                placeholder="Initial Investment ($)"
              />
              <Input
                type="number"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
                placeholder="Final Value ($)"
              />
              <Input
                type="number"
                value={investmentTime}
                onChange={(e) => setInvestmentTime(e.target.value)}
                placeholder="Time Period (years)"
                step="0.1"
              />
              <Button onClick={calculateReturn} className={buttonClasses}>
                Calculate
              </Button>
              {returnResult && (
                <div className="p-3 bg-muted rounded-lg">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                    {returnResult}
                  </pre>
                </div>
              )}
            </div>
          </Card>

          {/* Mortgage Calculator */}
          <Card className="p-6 shadow-strong">
            <h3 className="text-lg font-semibold text-foreground mb-4">Mortgage Calculator</h3>
            <div className="space-y-4">
              <Input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                placeholder="Home Price ($)"
              />
              <Input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                placeholder="Down Payment ($)"
              />
              <Input
                type="number"
                value={mortgageRate}
                onChange={(e) => setMortgageRate(e.target.value)}
                placeholder="Annual Interest Rate (%)"
                step="0.01"
              />
              <Select value={mortgageYears} onValueChange={setMortgageYears}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                  <SelectItem value="25">25 years</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={calculateMortgage} className={buttonClasses}>
                Calculate
              </Button>
              {mortgageResult && (
                <div className="p-3 bg-muted rounded-lg">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                    {mortgageResult}
                  </pre>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FinancialCalculator;
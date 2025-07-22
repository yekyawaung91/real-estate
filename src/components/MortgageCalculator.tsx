import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';

interface MortgageCalculatorProps {
  propertyPrice: number;
}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ propertyPrice }) => {
  const [downPayment, setDownPayment] = useState(propertyPrice * 0.2); // 20% default
  const [loanAmount, setLoanAmount] = useState(propertyPrice * 0.8);
  const [interestRate, setInterestRate] = useState(5.5); // 5.5% default
  const [loanTerm, setLoanTerm] = useState(25); // 25 years default
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    setLoanAmount(propertyPrice - downPayment);
  }, [propertyPrice, downPayment]);

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, interestRate, loanTerm]);

  const calculateMortgage = () => {
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    const monthlyPaymentCalc = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPaymentCalc = monthlyPaymentCalc * numPayments;
    const totalInterestCalc = totalPaymentCalc - loanAmount;

    setMonthlyPayment(monthlyPaymentCalc);
    setTotalPayment(totalPaymentCalc);
    setTotalInterest(totalInterestCalc);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleDownPaymentChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setDownPayment(Math.min(numValue, propertyPrice));
  };

  const handleDownPaymentPercentChange = (percent: number) => {
    const amount = propertyPrice * (percent / 100);
    setDownPayment(amount);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="h-5 w-5 text-emerald-600" />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Mortgage Calculator
        </h3>
      </div>

      <div className="space-y-6">
        {/* Property Price */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <DollarSign className="h-4 w-4" />
            <span>Property Price</span>
          </label>
          <div className="text-2xl font-bold text-emerald-600">
            {formatCurrency(propertyPrice)}
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Down Payment
          </label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => handleDownPaymentChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white mb-2"
            min="0"
            max={propertyPrice}
          />
          <div className="flex space-x-2">
            {[10, 15, 20, 25, 30].map(percent => (
              <button
                key={percent}
                onClick={() => handleDownPaymentPercentChange(percent)}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-600 transition-colors"
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        {/* Loan Amount */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Loan Amount
          </label>
          <div className="text-lg font-semibold text-gray-800 dark:text-white">
            {formatCurrency(loanAmount)}
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Percent className="h-4 w-4" />
            <span>Annual Interest Rate (%)</span>
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
            min="0"
            max="20"
            step="0.1"
          />
        </div>

        {/* Loan Term */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Calendar className="h-4 w-4" />
            <span>Loan Term (years)</span>
          </label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
          >
            <option value={15}>15 years</option>
            <option value={20}>20 years</option>
            <option value={25}>25 years</option>
            <option value={30}>30 years</option>
          </select>
        </div>

        {/* Results */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Monthly Payment:
            </span>
            <span className="text-lg font-bold text-emerald-600">
              {formatCurrency(monthlyPayment)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Total Payment:
            </span>
            <span className="text-sm font-semibold text-gray-800 dark:text-white">
              {formatCurrency(totalPayment)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Total Interest:
            </span>
            <span className="text-sm font-semibold text-red-600">
              {formatCurrency(totalInterest)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { quiz } from 'src/assets/questions/investment_guru';
export interface InvestmentType {
  id: string;
  name: string;
  description: string;
  returns: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  liquidity: string;
  minAmount: string;
  taxBenefits?: string[];
  suitability: string[];
  documents: string[];
  keyFeatures: string[];
  icon: string;
  color: string;
}

export interface InvestmentComparison {
  investmentType: string;
  returns: string;
  risk: string;
  liquidity: string;
  taxBenefit: string;
}

@Component({
  selector: 'app-investment-guru',
  standalone: true,
  imports: [CommonModule, ClarityModule, FormsModule],
  templateUrl: './investment-guru.component.html',
  styleUrls: ['./investment-guru.component.scss']
})
export class InvestmentGuruComponent {
  // SIP Calculator properties
  monthlyInvestment: number = 0;
  expectedReturn: number = 0;
  investmentPeriod: number = 0;
  totalInvestment: number = 0;
  expectedAmount: number = 0;
  wealthGained: number = 0;

  // Test Knowledge properties
  showTestModal: boolean = false;
  currentQuestionIndex: number = 0;
  selectedAnswer: number | null = null;
  quizScore: number = 0;
  showQuizResult: boolean = false;

  // Ask Guru properties
  showAskGuruModal: boolean = false;
  userQuestion: string = '';
  guruResponse: string = '';

  currentQuiz: any = quiz;
  currentQuestion: any = null;
  selectedAnswerId: string | null = null;
  showExplanation = false;
  public Math = Math;

  // quizQuestions = [
  //   {
  //     question: 'What is the lock-in period for ELSS (Equity Linked Savings Scheme) mutual funds?',
  //     options: ['1 year', '2 years', '3 years', '5 years'],
  //     correctAnswer: 2,
  //     explanation: 'ELSS mutual funds have a mandatory lock-in period of 3 years, which is the shortest among all tax-saving investments under Section 80C.'
  //   },
  //   {
  //     question: 'What is the maximum investment limit in PPF (Public Provident Fund) per financial year?',
  //     options: ['₹1 lakh', '₹1.5 lakh', '₹2 lakh', '₹2.5 lakh'],
  //     correctAnswer: 1,
  //     explanation: 'The maximum investment limit in PPF is ₹1.5 lakh per financial year, and the minimum is ₹500.'
  //   },
  //   {
  //     question: 'Which investment option provides the highest liquidity?',
  //     options: ['Fixed Deposit', 'Liquid Mutual Fund', 'PPF', 'Real Estate'],
  //     correctAnswer: 1,
  //     explanation: 'Liquid mutual funds provide the highest liquidity as you can redeem your investment within 24 hours without any exit load.'
  //   },
  //   {
  //     question: 'What does NAV stand for in mutual funds?',
  //     options: ['Net Asset Value', 'National Asset Value', 'Net Annual Value', 'New Asset Value'],
  //     correctAnswer: 0,
  //     explanation: 'NAV stands for Net Asset Value, which represents the per-unit price of a mutual fund scheme.'
  //   },
  //   {
  //     question: 'Which document is mandatory for all investment accounts in India?',
  //     options: ['Voter ID', 'PAN Card', 'Driving License', 'Passport'],
  //     correctAnswer: 1,
  //     explanation: 'PAN Card is mandatory for all investment accounts in India as per SEBI regulations for tax compliance and KYC requirements.'
  //   }
  // ];

  calculateSIP(): void {
    if (this.monthlyInvestment > 0 && this.expectedReturn > 0 && this.investmentPeriod > 0) {
      const monthlyRate = this.expectedReturn / (12 * 100);
      const months = this.investmentPeriod * 12;

      // SIP Formula: M × ({[1 + i]^n – 1} / i) × (1 + i)
      const maturityAmount = this.monthlyInvestment *
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

      this.expectedAmount = Math.round(maturityAmount);
      this.totalInvestment = this.monthlyInvestment * months;
      this.wealthGained = this.expectedAmount - this.totalInvestment;
    } else {
      this.expectedAmount = 0;
      this.totalInvestment = 0;
      this.wealthGained = 0;
    }
  }

  openTestKnowledge(): void {
    this.showTestModal = true;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.quizScore = 0;
    this.showQuizResult = false;
  }


  selectCommonQuestion(question: string): void {
    this.userQuestion = question;
  }

  investmentTypes: InvestmentType[] = [
    {
      id: 'mutual-funds',
      name: 'Mutual Funds',
      description: 'Pool money with other investors. Professional fund managers invest in diversified portfolio of stocks, bonds, and other securities.',
      returns: '8% to 15% annually',
      riskLevel: 'Medium',
      liquidity: 'High (1-3 days)',
      minAmount: '₹500 per month (SIP)',
      suitability: [
        'Salaried individuals',
        'Long-term wealth creation',
        'Goal-based investing',
        'Tax saving (ELSS)'
      ],
      documents: [
        'PAN Card and Aadhaar',
        'Bank account details',
        'KYC compliance',
        'Cancelled cheque'
      ],
      keyFeatures: [
        'Professional management',
        'Diversification benefits',
        'SIP option available',
        'Various fund categories',
        'Easy redemption process'
      ],
      taxBenefits: [
        'ELSS: ₹1.5L deduction under 80C',
        'LTCG above ₹1L taxed at 10%',
        'STCG taxed at 15%'
      ],
      icon: 'analytics',
      color: '#0072a3'
    },
    {
      id: 'ppf',
      name: 'Public Provident Fund (PPF)',
      description: 'Government-backed long-term savings scheme with tax benefits and guaranteed returns. Ideal for retirement planning.',
      returns: '7.1% to 8.5% annually',
      riskLevel: 'Low',
      liquidity: 'Low (15-year lock-in)',
      minAmount: '₹500 to ₹1.5L per year',
      suitability: [
        'Long-term wealth creation',
        'Retirement planning',
        'Risk-averse investors',
        'Tax planning'
      ],
      documents: [
        'PPF application form',
        'KYC documents',
        'Passport-size photographs',
        'Initial deposit'
      ],
      keyFeatures: [
        'Government guarantee',
        'Tax-free returns',
        'Partial withdrawal after 7 years',
        'Loan facility available',
        'Can extend beyond 15 years'
      ],
      taxBenefits: [
        'Investment: 80C deduction',
        'Interest: Tax-free',
        'Maturity: Tax-free (EEE status)'
      ],
      icon: 'piggy-bank',
      color: '#0072a3'
    },
    {
      id: 'fixed-deposits',
      name: 'Fixed Deposits',
      description: 'Safe investment option with guaranteed returns. Suitable for conservative investors seeking capital protection.',
      returns: '5.5% to 8% annually',
      riskLevel: 'Low',
      liquidity: 'Medium (with penalty)',
      minAmount: '₹1,000 to ₹10,000',
      suitability: [
        'Conservative investors',
        'Short to medium-term goals',
        'Emergency fund parking',
        'Senior citizens'
      ],
      documents: [
        'Account opening form',
        'KYC documents',
        'Initial deposit',
        'Nomination form'
      ],
      keyFeatures: [
        'Capital protection',
        'Fixed returns',
        'Flexible tenure options',
        'Auto-renewal facility',
        'Loan against FD available'
      ],
      icon: 'certificate',
      color: '#0072a3'
    },
    {
      id: 'equity-stocks',
      name: 'Direct Equity (Stocks)',
      description: 'Buy shares of companies directly. High return potential but requires market knowledge and risk tolerance.',
      returns: '12% to 18% annually',
      riskLevel: 'High',
      liquidity: 'High (same day)',
      minAmount: 'Price of 1 share',
      suitability: [
        'Experienced investors',
        'Long-term wealth creation',
        'Risk-tolerant individuals',
        'Active market participants'
      ],
      documents: [
        'Demat account opening',
        'Trading account',
        'Bank account linking',
        'KYC compliance'
      ],
      keyFeatures: [
        'Direct ownership in companies',
        'Dividend income potential',
        'Voting rights',
        'High liquidity',
        'Portfolio control'
      ],
      taxBenefits: [
        'LTCG above ₹1L taxed at 10%',
        'STCG taxed at 15%',
        'Dividend income taxable'
      ],
      icon: 'line-chart',
      color: '#0072a3'
    },
    {
      id: 'nps',
      name: 'National Pension System (NPS)',
      description: 'Government retirement savings scheme with tax benefits. Mix of equity and debt investments for long-term wealth creation.',
      returns: '9% to 12% annually',
      riskLevel: 'Medium',
      liquidity: 'Low (till 60 years)',
      minAmount: '₹500 per month',
      suitability: [
        'Retirement planning',
        'Government employees',
        'Long-term investors',
        'Tax-conscious individuals'
      ],
      documents: [
        'NPS application form',
        'KYC documents',
        'Bank account details',
        'PRAN activation'
      ],
      keyFeatures: [
        'Choice of fund managers',
        'Equity-debt mix options',
        'Professional management',
        'Low cost structure',
        'Government co-contribution for govt employees'
      ],
      taxBenefits: [
        'Up to ₹2L deduction (80C + 80CCD)',
        'Additional ₹50K under 80CCD(1B)',
        'Partial tax-free withdrawal'
      ],
      icon: 'retirement',
      color: '#0072a3'
    },
    {
      id: 'gold',
      name: 'Gold Investment',
      description: 'Hedge against inflation and currency devaluation. Available in physical form, Gold ETFs, or Sovereign Gold Bonds.',
      returns: '8% to 12% annually',
      riskLevel: 'Medium',
      liquidity: 'Medium to High',
      minAmount: '1 gram onwards',
      suitability: [
        'Portfolio diversification',
        'Inflation hedge',
        'Cultural preference',
        'Long-term wealth preservation'
      ],
      documents: [
        'KYC for Gold ETFs/SGB',
        'Demat account for digital gold',
        'Purchase receipts for physical gold'
      ],
      keyFeatures: [
        'Inflation hedge',
        'Global acceptance',
        'Multiple investment forms',
        'Cultural significance',
        'Portfolio diversifier'
      ],
      taxBenefits: [
        'SGB: No capital gains tax if held till maturity',
        'Physical gold: LTCG at 20% with indexation'
      ],
      icon: 'coin',
      color: '#0072a3'
    }
  ];

  investmentComparisons: InvestmentComparison[] = [
    { investmentType: 'Equity Mutual Funds', returns: '12-15%', risk: 'High', liquidity: 'High', taxBenefit: 'ELSS: 80C' },
    { investmentType: 'PPF', returns: '7-8%', risk: 'Low', liquidity: 'Low', taxBenefit: 'EEE Status' },
    { investmentType: 'Fixed Deposits', returns: '6-8%', risk: 'Low', liquidity: 'Medium', taxBenefit: 'None' },
    { investmentType: 'Direct Equity', returns: '15-18%', risk: 'High', liquidity: 'High', taxBenefit: 'LTCG 10%' },
    { investmentType: 'NPS', returns: '9-12%', risk: 'Medium', liquidity: 'Low', taxBenefit: '80C + 80CCD' },
    { investmentType: 'Gold (SGB)', returns: '8-12%', risk: 'Medium', liquidity: 'Medium', taxBenefit: 'No LTCG' }
  ];

  expertTips = [
    {
      title: 'Start Early and Stay Consistent',
      description: 'The power of compounding works best over long periods. Start investing even with small amounts and maintain consistency through SIPs.'
    },
    {
      title: 'Diversify Your Portfolio',
      description: 'Don\'t put all your money in one investment type. Spread across equity, debt, gold, and other asset classes to reduce risk.'
    },
    {
      title: 'Understand Your Risk Tolerance',
      description: 'Invest according to your age, income stability, and comfort with market volatility. Young investors can take more equity exposure.'
    },
    {
      title: 'Focus on Goal-Based Investing',
      description: 'Define clear financial goals with timelines. Short-term goals need safer investments, long-term goals can have more equity exposure.'
    },
    {
      title: 'Review and Rebalance Regularly',
      description: 'Review your portfolio annually and rebalance if needed. Market movements can change your asset allocation over time.'
    },
    {
      title: 'Don\'t Time the Market',
      description: 'Trying to predict market highs and lows is difficult. Stay invested through market cycles and let rupee cost averaging work for you.'
    }
  ];

  startTest() {
    if (!this.currentQuiz || !this.currentQuiz.questions) {
      console.error('Quiz data not loaded');
      return;
    }

    this.currentQuestionIndex = 0;
    this.quizScore = 0;
    this.selectedAnswerId = null;
    this.showExplanation = false;
    this.showQuizResult = false;
    this.currentQuestion = this.currentQuiz.questions[0];
    this.showTestModal = true;
  }

  // Update submitAnswer method
  submitAnswer() {
    if (this.selectedAnswerId === null) return;

    // Check if answer is correct
    const selectedOption = this.currentQuestion.options.find((opt: any) => opt.id === this.selectedAnswerId);
    if (selectedOption && selectedOption.isCorrect) {
      this.quizScore++;
    }

    // Show explanation
    this.showExplanation = true;
  }

  // Update nextQuestion method
  nextQuestion() {
    if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.currentQuiz.questions[this.currentQuestionIndex];
      this.selectedAnswerId = null;
      this.showExplanation = false;
    } else {
      this.showQuizResult = true;
    }
  }

  // Add this new method
  getQuizSubject(): string {
    // Customize this based on your guru type
    if (this.currentQuiz?.quizId === 'loan-guru') return 'loans and credit management';
    if (this.currentQuiz?.quizId === 'insurance-guru') return 'insurance and risk management';
    if (this.currentQuiz?.quizId === 'investment-guru') return 'investments and wealth building';
    return 'financial concepts';
  }

  // Update closeTestModal method
  closeTestModal() {
    this.showTestModal = false;
    this.currentQuestionIndex = 0;
    this.quizScore = 0;
    this.selectedAnswerId = null;
    this.showExplanation = false;
    this.showQuizResult = false;
    this.currentQuestion = null;
  }
}
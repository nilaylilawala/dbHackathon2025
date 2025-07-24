import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

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

  commonQuestions: string[] = [
    'What is SIP?',
    'How to start investing with limited money?',
    'What is the difference between SIP and lump sum?',
    'What is KYC and why is it needed?',
    'How to choose between equity and debt funds?',
    'What is NAV in mutual funds?',
    'Should I invest in ELSS for tax saving?',
    'What documents are needed for investment?'
  ];

  quizQuestions = [
    {
      question: 'What is the lock-in period for ELSS (Equity Linked Savings Scheme) mutual funds?',
      options: ['1 year', '2 years', '3 years', '5 years'],
      correctAnswer: 2,
      explanation: 'ELSS mutual funds have a mandatory lock-in period of 3 years, which is the shortest among all tax-saving investments under Section 80C.'
    },
    {
      question: 'What is the maximum investment limit in PPF (Public Provident Fund) per financial year?',
      options: ['₹1 lakh', '₹1.5 lakh', '₹2 lakh', '₹2.5 lakh'],
      correctAnswer: 1,
      explanation: 'The maximum investment limit in PPF is ₹1.5 lakh per financial year, and the minimum is ₹500.'
    },
    {
      question: 'Which investment option provides the highest liquidity?',
      options: ['Fixed Deposit', 'Liquid Mutual Fund', 'PPF', 'Real Estate'],
      correctAnswer: 1,
      explanation: 'Liquid mutual funds provide the highest liquidity as you can redeem your investment within 24 hours without any exit load.'
    },
    {
      question: 'What does NAV stand for in mutual funds?',
      options: ['Net Asset Value', 'National Asset Value', 'Net Annual Value', 'New Asset Value'],
      correctAnswer: 0,
      explanation: 'NAV stands for Net Asset Value, which represents the per-unit price of a mutual fund scheme.'
    },
    {
      question: 'Which document is mandatory for all investment accounts in India?',
      options: ['Voter ID', 'PAN Card', 'Driving License', 'Passport'],
      correctAnswer: 1,
      explanation: 'PAN Card is mandatory for all investment accounts in India as per SEBI regulations for tax compliance and KYC requirements.'
    }
  ];

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

  submitAnswer(): void {
    if (this.selectedAnswer !== null) {
      if (this.selectedAnswer === this.quizQuestions[this.currentQuestionIndex].correctAnswer) {
        this.quizScore++;
      }

      if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedAnswer = null;
      } else {
        this.showQuizResult = true;
      }
    }
  }

  closeTestModal(): void {
    this.showTestModal = false;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.quizScore = 0;
    this.showQuizResult = false;
  }

  openAskGuru(): void {
    this.showAskGuruModal = true;
    this.userQuestion = '';
    this.guruResponse = '';
  }

  selectCommonQuestion(question: string): void {
    this.userQuestion = question;
    this.askGuru();
  }

  askGuru(): void {
    if (!this.userQuestion.trim()) return;

    const responses: { [key: string]: string } = {
      'What is SIP?': `
        <p><strong>SIP (Systematic Investment Plan)</strong> is a method to invest a fixed amount regularly in mutual funds.</p>
        <p><strong>Key Benefits:</strong></p>
        <ul>
          <li><strong>Rupee Cost Averaging:</strong> Buy more units when NAV is low, fewer when high</li>
          <li><strong>Power of Compounding:</strong> Small amounts grow significantly over time</li>
          <li><strong>Disciplined Investing:</strong> Automated monthly investments</li>
          <li><strong>Flexibility:</strong> Start with as low as ₹500 per month</li>
          <li><strong>No Market Timing:</strong> Reduces impact of market volatility</li>
        </ul>
        <p><em>SIP is ideal for salaried individuals and long-term wealth creation.</em></p>
      `,
      'How to start investing with limited money?': `
        <p><strong>Investment options for beginners with limited funds:</strong></p>
        <ul>
          <li><strong>SIP in Mutual Funds:</strong> Start with ₹500/month</li>
          <li><strong>PPF:</strong> Minimum ₹500/year, maximum ₹1.5L/year</li>
          <li><strong>ELSS Funds:</strong> Tax saving + wealth creation</li>
          <li><strong>Liquid Funds:</strong> For emergency fund building</li>
          <li><strong>Small Case/ETFs:</strong> Diversified portfolio with small amounts</li>
        </ul>
        <p><strong>Strategy:</strong></p>
        <ul>
          <li>Start with ₹1,000-2,000 monthly across 2-3 funds</li>
          <li>Increase investment by 10-15% annually</li>
          <li>Focus on long-term goals (5+ years)</li>
        </ul>
      `,
      'What is the difference between SIP and lump sum?': `
        <table style="width:100%; border-collapse: collapse;">
          <tr style="background: #f8f9fa;">
            <th style="padding: 10px; border: 1px solid #ddd;"><strong>SIP</strong></th>
            <th style="padding: 10px; border: 1px solid #ddd;"><strong>Lump Sum</strong></th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Fixed monthly investment</td>
            <td style="padding: 10px; border: 1px solid #ddd;">One-time large investment</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Rupee cost averaging benefit</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Market timing risk</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Lower risk due to averaging</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Higher risk if market falls</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Suitable for salaried individuals</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Good for bonus/inheritance money</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Disciplined investment habit</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Requires market knowledge</td>
          </tr>
        </table>
      `,
      'What is KYC and why is it needed?': `
        <p><strong>KYC (Know Your Customer)</strong> is a mandatory process for all financial investments in India.</p>
        <p><strong>KYC Requirements:</strong></p>
        <ul>
          <li>PAN Card (mandatory)</li>
          <li>Aadhaar Card</li>
          <li>Address Proof</li>
          <li>Bank Account Details</li>
          <li>Photograph</li>
        </ul>
        <p><strong>Why KYC is Important:</strong></p>
        <ul>
          <li>Legal compliance with SEBI regulations</li>
          <li>Prevents money laundering</li>
          <li>Enables tax reporting</li>
          <li>Protects against fraud</li>
          <li>Required for all mutual funds, stocks, bonds</li>
        </ul>
        <p><em>One-time KYC is valid across all AMCs and brokers.</em></p>
      `,
      'How to choose between equity and debt funds?': `
        <p><strong>Choice depends on your investment goal and risk appetite:</strong></p>
        <p><strong>Choose Equity Funds when:</strong></p>
        <ul>
          <li>Investment horizon is 5+ years</li>
          <li>You can handle market volatility</li>
          <li>Goal is wealth creation/beating inflation</li>
          <li>You're young with regular income</li>
        </ul>
        <p><strong>Choose Debt Funds when:</strong></p>
        <ul>
          <li>Investment horizon is 1-5 years</li>
          <li>You want stable, predictable returns</li>
          <li>Goal is capital preservation</li>
          <li>You're risk-averse or nearing retirement</li>
        </ul>
        <p><strong>Hybrid Approach:</strong> 70% equity + 30% debt for balanced growth with lower risk.</p>
      `,
      'What is NAV in mutual funds?': `
        <p><strong>NAV (Net Asset Value)</strong> is the per-unit price of a mutual fund scheme.</p>
        <p><strong>Formula:</strong> NAV = (Total Fund Value - Expenses) / Total Units</p>
        <p><strong>Key Points:</strong></p>
        <ul>
          <li>Updated daily after market hours</li>
          <li>Higher NAV doesn't mean expensive fund</li>
          <li>Focus on returns percentage, not NAV value</li>
          <li>New fund NFO usually starts at ₹10 NAV</li>
          <li>Dividends reduce NAV proportionally</li>
        </ul>
        <p><strong>Example:</strong> If you invest ₹1,000 at NAV ₹50, you get 20 units. If NAV becomes ₹60, your investment value is ₹1,200.</p>
      `,
      'Should I invest in ELSS for tax saving?': `
        <p><strong>ELSS (Equity Linked Savings Scheme) Benefits:</strong></p>
        <ul>
          <li><strong>Tax Deduction:</strong> Up to ₹1.5L under Section 80C</li>
          <li><strong>Shortest Lock-in:</strong> Only 3 years vs PPF (15 years)</li>
          <li><strong>High Returns:</strong> Potential 12-15% annually</li>
          <li><strong>SIP Option:</strong> Start with ₹500/month</li>
          <li><strong>Long-term Growth:</strong> Equity exposure for wealth creation</li>
        </ul>
        <p><strong>Consider ELSS if:</strong></p>
        <ul>
          <li>You need tax saving under 80C</li>
          <li>You have long-term investment horizon (5+ years)</li>
          <li>You can handle equity market volatility</li>
          <li>You want inflation-beating returns</li>
        </ul>
        <p><em>Ideal allocation: 50-70% of your 80C limit in ELSS, rest in PPF/NSC for diversification.</em></p>
      `,
      'What documents are needed for investment?': `
        <p><strong>Basic KYC Documents (Common for all investments):</strong></p>
        <ul>
          <li><strong>PAN Card:</strong> Mandatory for tax compliance</li>
          <li><strong>Aadhaar Card:</strong> Identity and address proof</li>
          <li><strong>Bank Statements:</strong> Last 6 months</li>
          <li><strong>Passport Photo:</strong> Recent colored photo</li>
          <li><strong>Cancelled Cheque:</strong> For bank account verification</li>
        </ul>
        <p><strong>Additional Documents (if needed):</strong></p>
        <ul>
          <li>Salary slip (for income proof)</li>
          <li>Form 16 (for tax documentation)</li>
          <li>Utility bills (for address proof)</li>
        </ul>
        <p><strong>Digital Process:</strong> Most platforms now accept e-KYC via Aadhaar OTP, making the process paperless and instant.</p>
      `
    };

    // Check if it's a common question
    const response = responses[this.userQuestion];
    if (response) {
      this.guruResponse = response;
    } else {
      // Generate a generic helpful response for custom questions
      this.guruResponse = `
        <p>Thank you for your investment question! Here are some general investment guidelines:</p>
        <ul>
          <li><strong>Start Early:</strong> Time is your biggest asset in investing</li>
          <li><strong>Diversify:</strong> Don't put all money in one investment type</li>
          <li><strong>Stay Consistent:</strong> Regular SIP investments work better than timing the market</li>
          <li><strong>Understand Risk:</strong> Higher returns come with higher risk</li>
          <li><strong>Have Goals:</strong> Invest based on specific financial goals and timelines</li>
        </ul>
        <p><em>For personalized investment advice, please consult a SEBI-registered financial advisor.</em></p>
        <p><strong>Investment Mantra:</strong> Start small, stay consistent, think long-term!</p>
      `;
    }
  }

  closeAskGuruModal(): void {
    this.showAskGuruModal = false;
    this.userQuestion = '';
    this.guruResponse = '';
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
}
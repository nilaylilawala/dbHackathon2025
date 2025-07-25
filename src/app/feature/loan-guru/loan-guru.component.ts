<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

export interface LoanType {
  id: string;
  name: string;
  description: string;
  interestRate: string;
  tenure: string;
  eligibility: string[];
  documents: string[];
  keyFeatures: string[];
  taxBenefits?: string[];
  icon: string;
  color: string;
}

export interface LoanComparison {
  loanType: string;
  rate: string;
  emi: string;
  totalInterest: string;
}
@Component({
  selector: 'app-loan-guru',
  standalone: true,
  imports: [CommonModule, ClarityModule, FormsModule],
  templateUrl: './loan-guru.component.html',
  styleUrls: ['./loan-guru.component.scss']
})
export class LoanGuruComponent {
  // EMI Calculator properties
  loanAmount: number = 0;
  interestRate: number = 0;
  loanTenure: number = 0;
  emiAmount: number = 0;
  totalAmount: number = 0;
  totalInterest: number = 0;

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
    'What is CIBIL score?',
    'How to improve credit score?',
    'Best time to take a loan?',
    'Difference between fixed and floating rates?',
    'How much loan can I get?',
    'What is EMI?',
    'Should I prepay my loan?',
    'What are processing charges?'
  ];

  quizQuestions = [
    {
      question: 'What is the ideal CIBIL score for getting a loan approved easily in India?',
      options: ['600-650', '650-700', '700-750', '750 and above'],
      correctAnswer: 3,
      explanation: 'A CIBIL score of 750 and above is considered excellent and gives you the best chances of loan approval with favorable interest rates.'
    },
    {
      question: 'What percentage of your monthly income should ideally go towards EMI payments?',
      options: ['70%', '60%', '50%', '40%'],
      correctAnswer: 3,
      explanation: 'Financial experts recommend keeping your total EMI payments below 40% of your monthly income to maintain a healthy debt-to-income ratio.'
    },
    {
      question: 'Which type of interest rate remains the same throughout the loan tenure?',
      options: ['Floating Rate', 'Variable Rate', 'Fixed Rate', 'Flexible Rate'],
      correctAnswer: 2,
      explanation: 'Fixed interest rate remains constant throughout the loan tenure, providing predictable EMI amounts, unlike floating rates which can change with market conditions.'
    },
    {
      question: 'What is the maximum tax benefit you can claim on home loan principal repayment under Section 80C?',
      options: ['₹1 lakh', '₹1.5 lakh', '₹2 lakh', '₹2.5 lakh'],
      correctAnswer: 1,
      explanation: 'Under Section 80C, you can claim a maximum deduction of ₹1.5 lakh per financial year on home loan principal repayment.'
    },
    {
      question: 'Which document is mandatory for all types of loans in India?',
      options: ['Salary Certificate', 'PAN Card', 'Property Papers', 'Bank Statement'],
      correctAnswer: 1,
      explanation: 'PAN Card is mandatory for all loan applications in India as it is required for tax and identity verification purposes.'
    }
  ];

  calculateEMI(): void {
    if (this.loanAmount > 0 && this.interestRate > 0 && this.loanTenure > 0) {
      const principal = this.loanAmount;
      const monthlyRate = this.interestRate / (12 * 100);
      const numberOfMonths = this.loanTenure * 12;

      const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / 
                  (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

      this.emiAmount = Math.round(emi);
      this.totalAmount = Math.round(emi * numberOfMonths);
      this.totalInterest = this.totalAmount - principal;
    } else {
      this.emiAmount = 0;
      this.totalAmount = 0;
      this.totalInterest = 0;
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
      'What is CIBIL score?': `
        <p><strong>CIBIL Score</strong> is a 3-digit number (300-900) that represents your creditworthiness.</p>
        <ul>
          <li><strong>750-900:</strong> Excellent - Best loan offers</li>
          <li><strong>700-749:</strong> Good - Easy loan approval</li>
          <li><strong>650-699:</strong> Fair - May get loan with higher rates</li>
          <li><strong>Below 650:</strong> Poor - Difficult to get loans</li>
        </ul>
        <p>It's calculated based on your payment history, credit utilization, credit history length, and types of credit.</p>
      `,
      'How to improve credit score?': `
        <p><strong>Steps to improve your CIBIL score:</strong></p>
        <ul>
          <li>Pay all EMIs and credit card bills on time</li>
          <li>Keep credit utilization below 30% of limit</li>
          <li>Don't close old credit cards</li>
          <li>Check credit report regularly for errors</li>
          <li>Avoid multiple loan applications at once</li>
          <li>Maintain a good mix of secured and unsecured loans</li>
        </ul>
        <p><em>Improvement takes 3-6 months of consistent good behavior.</em></p>
      `,
      'Best time to take a loan?': `
        <p><strong>Best times to take a loan:</strong></p>
        <ul>
          <li><strong>When interest rates are low</strong> - Save money on interest</li>
          <li><strong>When you have stable income</strong> - Ensures repayment capacity</li>
          <li><strong>During festival seasons</strong> - Banks offer special rates</li>
          <li><strong>End of financial year</strong> - Banks want to meet targets</li>
          <li><strong>When your CIBIL score is good</strong> - Better negotiating power</li>
        </ul>
        <p><em>Avoid taking loans during job changes or uncertain income periods.</em></p>
      `,
      'Difference between fixed and floating rates?': `
        <table style="width:100%; border-collapse: collapse;">
          <tr style="background: #f8f9fa;">
            <th style="padding: 10px; border: 1px solid #ddd;"><strong>Fixed Rate</strong></th>
            <th style="padding: 10px; border: 1px solid #ddd;"><strong>Floating Rate</strong></th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Rate remains same throughout</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Rate changes with market conditions</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Predictable EMI</td>
            <td style="padding: 10px; border: 1px solid #ddd;">EMI can increase or decrease</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Usually 0.5-1% higher initially</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Lower initial rate</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Good for risk-averse borrowers</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Can benefit if rates fall</td>
          </tr>
        </table>
      `,
      'How much loan can I get?': `
        <p><strong>Loan eligibility depends on:</strong></p>
        <ul>
          <li><strong>Income:</strong> Higher income = Higher loan amount</li>
          <li><strong>Age:</strong> Younger age = Longer tenure = Higher amount</li>
          <li><strong>CIBIL Score:</strong> 750+ gets maximum amount</li>
          <li><strong>Existing EMIs:</strong> Lower existing EMIs = Higher new loan</li>
          <li><strong>Employment stability:</strong> Permanent job preferred</li>
        </ul>
        <p><strong>Quick Formula:</strong> Home Loan = 60x monthly income (approx.)</p>
        <p><em>Use bank's online eligibility calculators for accurate estimates.</em></p>
      `,
      'What is EMI?': `
        <p><strong>EMI (Equated Monthly Installment)</strong> is a fixed payment you make every month to repay your loan.</p>
        <p><strong>EMI = Principal + Interest</strong></p>
        <p><strong>Key Points:</strong></p>
        <ul>
          <li>Same amount every month (for fixed rate loans)</li>
          <li>Early EMIs have more interest, later ones have more principal</li>
          <li>Missing EMI affects your CIBIL score</li>
          <li>Auto-debit ensures you never miss payments</li>
        </ul>
        <p><em>Formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1]</em></p>
      `,
      'Should I prepay my loan?': `
        <p><strong>Prepayment is beneficial when:</strong></p>
        <ul>
          <li>You have surplus funds not needed for emergencies</li>
          <li>Loan interest rate is higher than your investment returns</li>
          <li>You want to reduce financial stress</li>
          <li>Tax benefits are not significant for you</li>
        </ul>
        <p><strong>Avoid prepayment when:</strong></p>
        <ul>
          <li>You can invest and earn more than loan interest rate</li>
          <li>You're getting substantial tax benefits</li>
          <li>Prepayment charges are very high</li>
        </ul>
        <p><em>Home loans often have tax benefits, so calculate net benefit before prepaying.</em></p>
      `,
      'What are processing charges?': `
        <p><strong>Processing fees</strong> are charges banks levy for processing your loan application.</p>
        <p><strong>Typical Charges:</strong></p>
        <ul>
          <li><strong>Home Loan:</strong> 0.5-1% of loan amount (Max ₹50,000)</li>
          <li><strong>Personal Loan:</strong> 1-3% of loan amount</li>
          <li><strong>Car Loan:</strong> ₹5,000-15,000 or 1% of loan</li>
          <li><strong>Education Loan:</strong> Usually ₹5,000-10,000</li>
        </ul>
        <p><strong>Additional Charges:</strong></p>
        <ul>
          <li>Documentation charges</li>
          <li>Legal verification charges</li>
          <li>Administrative charges</li>
        </ul>
        <p><em>Always negotiate these charges - many banks waive them during offers!</em></p>
      `
    };

    // Check if it's a common question
    const response = responses[this.userQuestion];
    if (response) {
      this.guruResponse = response;
    } else {
      // Generate a generic helpful response for custom questions
      this.guruResponse = `
        <p>Thank you for your question! Here are some general guidelines:</p>
        <ul>
          <li><strong>Research thoroughly:</strong> Compare offers from multiple banks</li>
          <li><strong>Check eligibility:</strong> Ensure you meet all criteria before applying</li>
          <li><strong>Read fine print:</strong> Understand all terms and conditions</li>
          <li><strong>Maintain good credit:</strong> Keep your CIBIL score above 750</li>
          <li><strong>Plan your finances:</strong> Ensure EMI doesn't exceed 40% of income</li>
        </ul>
        <p><em>For specific loan advice, please consult with a certified financial advisor or visit your bank.</em></p>
        <p><strong>Pro Tip:</strong> Always negotiate interest rates and processing fees - banks are often flexible!</p>
      `;
    }
  }

  closeAskGuruModal(): void {
    this.showAskGuruModal = false;
    this.userQuestion = '';
    this.guruResponse = '';
  }

  loanTypes: LoanType[] = [
    {
      id: 'home-loan',
      name: 'Home Loan',
      description: 'Used to purchase, construct, or renovate a house. Most affordable loan option with longest tenure.',
      interestRate: '8.5% to 10.5%',
      tenure: 'Up to 30 years',
      eligibility: [
        'Age: 21-65 years',
        'Stable income source (salary/business)',
        'CIBIL score ≥ 700'
      ],
      documents: [
        'Identity & address proof',
        'Income proof (salary slips/ITR)',
        'Property documents'
      ],
      keyFeatures: [
        'Floating rate: No prepayment charges',
        'Fixed rate: 2-4% prepayment charges',
        'Loan for purchase, construction, renovation, extension',
        'Plot purchase + construction option available'
      ],
      taxBenefits: [
        'Section 80C: ₹1.5L deduction on principal',
        'Section 24(b): ₹2L deduction on interest'
      ],
      icon: 'home',
      color: '#0072a3'
    },
    {
      id: 'personal-loan',
      name: 'Personal Loan',
      description: 'Unsecured loan for personal needs like wedding, medical emergency, travel, debt consolidation.',
      interestRate: '10.5% to 24%',
      tenure: '1 to 7 years',
      eligibility: [
        'Age: 21-60 years',
        'Minimum income ₹20,000/month+',
        'CIBIL score ≥ 700'
      ],
      documents: [
        'KYC (Aadhaar, PAN, Voter ID)',
        'Income proof (salary slip/ITR)',
        'Bank statements (6 months)'
      ],
      keyFeatures: [
        'No collateral required',
        'Quick processing and disbursal',
        'Prepayment charges: 2-5% before 12 months',
        'Flexible end-use'
      ],
      icon: 'user',
      color: '#0072a3'
    },
    {
      id: 'car-loan',
      name: 'Car/Two-Wheeler Loan',
      description: 'For purchasing new or used vehicles with competitive interest rates and flexible repayment options.',
      interestRate: 'Car: 8-18%, Two-Wheeler: 9-14%',
      tenure: '1 to 7 years',
      eligibility: [
        'Age: 21-65 years',
        'Stable income source',
        'CIBIL score ≥ 700'
      ],
      documents: [
        'KYC documents',
        'Income proof',
        'Vehicle quotation/invoice'
      ],
      keyFeatures: [
        'Down payment: 10-20%',
        'New cars get better rates than used',
        'Prepayment charges: 1-3% (negotiable)',
        'Vehicle acts as collateral'
      ],
      icon: 'car',
      color: '#0072a3'
    },
    {
      id: 'education-loan',
      name: 'Education Loan',
      description: 'For pursuing higher studies in India or abroad with moratorium period and tax benefits.',
      interestRate: '9% to 14%',
      tenure: 'Course period + 6 months to 1 year moratorium',
      eligibility: [
        'Indian citizenship required',
        'Admission in recognized institute',
        'Co-applicant with stable income'
      ],
      documents: [
        'Admission letter from institute',
        'Fee structure details',
        'KYC of applicant and co-applicant',
        'Income proof of co-applicant'
      ],
      keyFeatures: [
        'Loan amount: Up to ₹75 lakhs',
        'Up to ₹7.5L: No collateral needed',
        'Above ₹7.5L: Collateral may be required',
        'Moratorium period available'
      ],
      taxBenefits: [
        'Section 80E: Full interest deduction during repayment'
      ],
      icon: 'book',
      color: '#0072a3'
    },
    {
      id: 'lap',
      name: 'Loan Against Property',
      description: 'Secured loan against residential/commercial property for business expansion or personal needs.',
      interestRate: '10% to 14%',
      tenure: 'Up to 15 years',
      eligibility: [
        'Age: 21-65 years',
        'Clear property title',
        'Stable income source',
        'CIBIL score ≥ 700'
      ],
      documents: [
        'Property papers and title documents',
        'KYC and income documents',
        'Property valuation report'
      ],
      keyFeatures: [
        'Loan-to-Value ratio: 50-70%',
        'Lower interest rates than personal loans',
        'Floating rate: No prepayment charges',
        'Fixed rate: 2-3% prepayment charges'
      ],
      icon: 'building',
      color: '#0072a3'
    },
    {
      id: 'gold-loan',
      name: 'Gold Loan',
      description: 'Quick loan against gold jewelry or coins with minimal documentation and fast processing.',
      interestRate: '8.5% to 16%',
      tenure: '6 months to 3 years',
      eligibility: [
        'Anyone owning gold',
        'No income proof needed',
        'Basic KYC sufficient'
      ],
      documents: [
        'Basic KYC (Aadhaar, PAN)',
        'Gold jewelry or coins'
      ],
      keyFeatures: [
        'Loan amount: Up to 75% of gold value',
        'Processing time: Within hours',
        'Minimal or no prepayment charges',
        'Gold remains in bank locker'
      ],
      icon: 'coin-bag',
      color: '#0072a3'
    }
  ];

  loanComparisons: LoanComparison[] = [
    { loanType: 'Home Loan', rate: '9%', emi: '₹20,758', totalInterest: '₹2.45 lakh' },
    { loanType: 'Personal Loan', rate: '14%', emi: '₹23,268', totalInterest: '₹3.96 lakh' },
    { loanType: 'Loan Against Property', rate: '11%', emi: '₹21,739', totalInterest: '₹3.04 lakh' }
  ];

  expertTips = [
    {
      title: 'Check Your CIBIL Score First',
      description: 'Always check your credit score before applying. A score above 750 gets you better interest rates and higher approval chances.'
    },
    {
      title: 'Compare Interest Rates and Fees',
      description: 'Don\'t just look at interest rates. Compare processing fees, prepayment charges, and other hidden costs across different lenders.'
    },
    {
      title: 'Understand Prepayment Terms',
      description: 'Read the fine print about prepayment and foreclosure charges. Some loans allow free prepayment while others charge penalties.'
    },
    {
      title: 'Choose the Shortest Affordable Tenure',
      description: 'While longer tenure means lower EMI, it also means paying more interest overall. Choose the shortest tenure you can comfortably afford.'
    },
    {
      title: 'Avoid Unnecessary Add-ons',
      description: 'Banks often bundle insurance and other products. Only opt for add-ons that you genuinely need to avoid unnecessary costs.'
    },
    {
      title: 'Follow the 40% EMI Rule',
      description: 'Ensure your total EMI obligations don\'t exceed 40% of your monthly income to maintain a healthy financial position.'
    }
  ];
=======
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { quiz } from 'src/assets/questions/loan_guru';
export interface LoanType {
  id: string;
  name: string;
  description: string;
  interestRate: string;
  tenure: string;
  eligibility: string[];
  documents: string[];
  keyFeatures: string[];
  taxBenefits?: string[];
  icon: string;
  color: string;
}

export interface LoanComparison {
  loanType: string;
  rate: string;
  emi: string;
  totalInterest: string;
}
@Component({
  selector: 'app-loan-guru',
  standalone: true,
  imports: [CommonModule, ClarityModule, FormsModule],
  templateUrl: './loan-guru.component.html',
  styleUrls: ['./loan-guru.component.scss']
})
export class LoanGuruComponent {
  // EMI Calculator properties
  loanAmount: number = 0;
  interestRate: number = 0;
  loanTenure: number = 0;
  emiAmount: number = 0;
  totalAmount: number = 0;
  totalInterest: number = 0;

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

  loanTypes: LoanType[] = [
    {
      id: 'home-loan',
      name: 'Home Loan',
      description: 'Used to purchase, construct, or renovate a house. Most affordable loan option with longest tenure.',
      interestRate: '8.5% to 10.5%',
      tenure: 'Up to 30 years',
      eligibility: [
        'Age: 21-65 years',
        'Stable income source (salary/business)',
        'CIBIL score ≥ 700'
      ],
      documents: [
        'Identity & address proof',
        'Income proof (salary slips/ITR)',
        'Property documents'
      ],
      keyFeatures: [
        'Floating rate: No prepayment charges',
        'Fixed rate: 2-4% prepayment charges',
        'Loan for purchase, construction, renovation, extension',
        'Plot purchase + construction option available'
      ],
      taxBenefits: [
        'Section 80C: ₹1.5L deduction on principal',
        'Section 24(b): ₹2L deduction on interest'
      ],
      icon: 'home',
      color: '#0072a3'
    },
    {
      id: 'personal-loan',
      name: 'Personal Loan',
      description: 'Unsecured loan for personal needs like wedding, medical emergency, travel, debt consolidation.',
      interestRate: '10.5% to 24%',
      tenure: '1 to 7 years',
      eligibility: [
        'Age: 21-60 years',
        'Minimum income ₹20,000/month+',
        'CIBIL score ≥ 700'
      ],
      documents: [
        'KYC (Aadhaar, PAN, Voter ID)',
        'Income proof (salary slip/ITR)',
        'Bank statements (6 months)'
      ],
      keyFeatures: [
        'No collateral required',
        'Quick processing and disbursal',
        'Prepayment charges: 2-5% before 12 months',
        'Flexible end-use'
      ],
      icon: 'user',
      color: '#0072a3'
    },
    {
      id: 'car-loan',
      name: 'Car/Two-Wheeler Loan',
      description: 'For purchasing new or used vehicles with competitive interest rates and flexible repayment options.',
      interestRate: 'Car: 8-18%, Two-Wheeler: 9-14%',
      tenure: '1 to 7 years',
      eligibility: [
        'Age: 21-65 years',
        'Stable income source',
        'CIBIL score ≥ 700'
      ],
      documents: [
        'KYC documents',
        'Income proof',
        'Vehicle quotation/invoice'
      ],
      keyFeatures: [
        'Down payment: 10-20%',
        'New cars get better rates than used',
        'Prepayment charges: 1-3% (negotiable)',
        'Vehicle acts as collateral'
      ],
      icon: 'car',
      color: '#0072a3'
    },
    {
      id: 'education-loan',
      name: 'Education Loan',
      description: 'For pursuing higher studies in India or abroad with moratorium period and tax benefits.',
      interestRate: '9% to 14%',
      tenure: 'Course period + 6 months to 1 year moratorium',
      eligibility: [
        'Indian citizenship required',
        'Admission in recognized institute',
        'Co-applicant with stable income'
      ],
      documents: [
        'Admission letter from institute',
        'Fee structure details',
        'KYC of applicant and co-applicant',
        'Income proof of co-applicant'
      ],
      keyFeatures: [
        'Loan amount: Up to ₹75 lakhs',
        'Up to ₹7.5L: No collateral needed',
        'Above ₹7.5L: Collateral may be required',
        'Moratorium period available'
      ],
      taxBenefits: [
        'Section 80E: Full interest deduction during repayment'
      ],
      icon: 'book',
      color: '#0072a3'
    },
    {
      id: 'lap',
      name: 'Loan Against Property',
      description: 'Secured loan against residential/commercial property for business expansion or personal needs.',
      interestRate: '10% to 14%',
      tenure: 'Up to 15 years',
      eligibility: [
        'Age: 21-65 years',
        'Clear property title',
        'Stable income source',
        'CIBIL score ≥ 700'
      ],
      documents: [
        'Property papers and title documents',
        'KYC and income documents',
        'Property valuation report'
      ],
      keyFeatures: [
        'Loan-to-Value ratio: 50-70%',
        'Lower interest rates than personal loans',
        'Floating rate: No prepayment charges',
        'Fixed rate: 2-3% prepayment charges'
      ],
      icon: 'building',
      color: '#0072a3'
    },
    {
      id: 'gold-loan',
      name: 'Gold Loan',
      description: 'Quick loan against gold jewelry or coins with minimal documentation and fast processing.',
      interestRate: '8.5% to 16%',
      tenure: '6 months to 3 years',
      eligibility: [
        'Anyone owning gold',
        'No income proof needed',
        'Basic KYC sufficient'
      ],
      documents: [
        'Basic KYC (Aadhaar, PAN)',
        'Gold jewelry or coins'
      ],
      keyFeatures: [
        'Loan amount: Up to 75% of gold value',
        'Processing time: Within hours',
        'Minimal or no prepayment charges',
        'Gold remains in bank locker'
      ],
      icon: 'coin-bag',
      color: '#0072a3'
    }
  ];

  calculateEMI(): void {
    if (this.loanAmount > 0 && this.interestRate > 0 && this.loanTenure > 0) {
      const principal = this.loanAmount;
      const monthlyRate = this.interestRate / (12 * 100);
      const numberOfMonths = this.loanTenure * 12;

      const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / 
                  (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

      this.emiAmount = Math.round(emi);
      this.totalAmount = Math.round(emi * numberOfMonths);
      this.totalInterest = this.totalAmount - principal;
    } else {
      this.emiAmount = 0;
      this.totalAmount = 0;
      this.totalInterest = 0;
    }
  }

  openTestKnowledge(): void {
    this.showTestModal = true;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.quizScore = 0;
    this.showQuizResult = false;
  }



  loanComparisons: LoanComparison[] = [
    { loanType: 'Home Loan', rate: '9%', emi: '₹20,758', totalInterest: '₹2.45 lakh' },
    { loanType: 'Personal Loan', rate: '14%', emi: '₹23,268', totalInterest: '₹3.96 lakh' },
    { loanType: 'Loan Against Property', rate: '11%', emi: '₹21,739', totalInterest: '₹3.04 lakh' }
  ];

  expertTips = [
    {
      title: 'Check Your CIBIL Score First',
      description: 'Always check your credit score before applying. A score above 750 gets you better interest rates and higher approval chances.'
    },
    {
      title: 'Compare Interest Rates and Fees',
      description: 'Don\'t just look at interest rates. Compare processing fees, prepayment charges, and other hidden costs across different lenders.'
    },
    {
      title: 'Understand Prepayment Terms',
      description: 'Read the fine print about prepayment and foreclosure charges. Some loans allow free prepayment while others charge penalties.'
    },
    {
      title: 'Choose the Shortest Affordable Tenure',
      description: 'While longer tenure means lower EMI, it also means paying more interest overall. Choose the shortest tenure you can comfortably afford.'
    },
    {
      title: 'Avoid Unnecessary Add-ons',
      description: 'Banks often bundle insurance and other products. Only opt for add-ons that you genuinely need to avoid unnecessary costs.'
    },
    {
      title: 'Follow the 40% EMI Rule',
      description: 'Ensure your total EMI obligations don\'t exceed 40% of your monthly income to maintain a healthy financial position.'
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
>>>>>>> origin/main
}
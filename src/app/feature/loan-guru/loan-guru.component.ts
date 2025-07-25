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
}
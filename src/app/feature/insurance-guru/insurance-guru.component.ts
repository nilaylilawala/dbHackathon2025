import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
export interface InsuranceType {
  id: string;
  name: string;
  description: string;
  covers: string;
  goal: string;
  subtypes?: InsuranceSubtype[];
  ageEligibility: string;
  documents: string[];
  keyFeatures: string[];
  benefits?: string[];
  icon: string;
  color: string;
}

export interface InsuranceSubtype {
  name: string;
  description: string;
  features: string[];
}

export interface InsuranceTerm {
  term: string;
  definition: string;
  icon: string;
}

export interface EligibilityInfo {
  insuranceType: string;
  ageEligibility: string;
  documentsRequired: string[];
}

@Component({
  selector: 'app-insurance-guru',
  templateUrl: './insurance-guru.component.html',
  styleUrls: ['./insurance-guru.component.scss'],
  standalone: true,
  imports: [CommonModule, ClarityModule, FormsModule, RouterModule]
})
export class InsuranceGuruComponent {
  openAskGuru() {

  }

  openTestKnowledge() {

  }
  insuranceTypes: InsuranceType[] = [
    {
      id: 'life-insurance',
      name: 'Life Insurance',
      description: 'Provides financial protection to your family in case of your death or helps build savings for retirement.',
      covers: 'Risk of death or life events like retirement',
      goal: 'Financial protection for your family if you die early or savings if you survive',
      ageEligibility: '18-65 years',
      documents: ['ID proof', 'Income proof', 'Medical test (if required)', 'Age proof'],
      keyFeatures: [
        'Guaranteed death benefit to nominees',
        'Tax benefits under Section 80C and 10(10D)',
        'Option to add riders for extra protection',
        'Flexibility in premium payment frequency'
      ],
      benefits: [
        'Financial security for dependents',
        'Tax savings on premiums paid',
        'Disciplined savings habit',
        'Peace of mind'
      ],
      subtypes: [
        {
          name: 'Term Life Insurance',
          description: 'Pure life cover. Pays a fixed amount to family if you die.',
          features: ['Cheapest and simplest', 'No money back if you survive', 'High coverage at low premium']
        },
        {
          name: 'Whole Life Insurance',
          description: 'Covers your life till death (not limited years).',
          features: ['Premium is higher', 'Family will definitely get money', 'Lifelong coverage']
        },
        {
          name: 'Endowment Plans',
          description: 'Mix of insurance + savings.',
          features: ['Get money if you survive the policy period', 'Family gets it if you die', 'Guaranteed returns']
        },
        {
          name: 'ULIPs (Unit Linked Insurance Plans)',
          description: 'Mix of insurance + investment in market (stocks, bonds).',
          features: ['Returns depend on market performance', 'Flexibility to switch funds', 'Higher risk, higher returns potential']
        },
        {
          name: 'Money Back Policy',
          description: 'You get part of the money back at regular intervals.',
          features: ['Good for periodic needs (child education, etc.)', 'Survival benefits during policy term', 'Death benefit throughout']
        }
      ],
      icon: 'heart',
      color: '#0072a3'
    },
    {
      id: 'health-insurance',
      name: 'Health Insurance',
      description: 'Covers medical expenses due to illness, surgery, or accidents to protect you from high hospital bills.',
      covers: 'Medical expenses due to illness, surgery, or accidents',
      goal: 'Protect you from high hospital bills',
      ageEligibility: '91 days to 65+ years',
      documents: ['ID proof', 'Age proof', 'Medical history', 'Income proof (if required)'],
      keyFeatures: [
        'Cashless treatment at network hospitals',
        'Coverage for pre and post-hospitalization',
        'Day care procedures covered',
        'Annual health check-ups included'
      ],
      benefits: [
        'Financial protection against medical emergencies',
        'Access to quality healthcare',
        'Tax deduction under Section 80D',
        'Peace of mind for family health'
      ],
      subtypes: [
        {
          name: 'Individual Health Insurance',
          description: 'Covers only one person.',
          features: ['Personalized coverage', 'Individual sum insured', 'No sharing of benefits']
        },
        {
          name: 'Family Floater Policy',
          description: 'Covers entire family (self, spouse, kids, parents) in one policy.',
          features: ['Cost-effective for families', 'Shared sum insured', 'Single premium for all members']
        },
        {
          name: 'Critical Illness Insurance',
          description: 'Special cover for serious diseases like cancer, heart attack.',
          features: ['Pays a lump sum on diagnosis', 'Covers major critical illnesses', 'Can be standalone or add-on']
        },
        {
          name: 'Top-up Plans',
          description: 'Add-on plan to increase your cover at lower cost.',
          features: ['Kicks in after deductible is exhausted', 'Cost-effective coverage enhancement', 'Can be independent or super top-up']
        }
      ],
      icon: 'heart-broken',
      color: '#0072a3'
    },
    {
      id: 'motor-insurance',
      name: 'Motor Insurance (Vehicle Insurance)',
      description: 'Covers your car or bike and protects against accidents, theft, and damages.',
      covers: 'Your car or bike and accidents',
      goal: 'Financial protection for vehicle damage and third-party liabilities',
      ageEligibility: 'Vehicle owner (18+ years)',
      documents: ['RC (Registration Certificate)', 'Driving license', 'Vehicle papers', 'Previous policy copy'],
      keyFeatures: [
        'Third-party liability is mandatory by law',
        'Own damage cover optional but recommended',
        'No Claim Bonus for claim-free years',
        'Add-on covers available for enhanced protection'
      ],
      benefits: [
        'Legal compliance with Motor Vehicle Act',
        'Financial protection against accidents',
        'Coverage for vehicle repairs',
        'Protection against theft and natural disasters'
      ],
      subtypes: [
        {
          name: 'Third-Party Insurance',
          description: 'Mandatory by law. Covers damage/injury caused by your vehicle to someone else.',
          features: ['Legally required', 'Covers third-party death/injury', 'Property damage to others', 'No own vehicle coverage']
        },
        {
          name: 'Comprehensive Insurance',
          description: 'Covers your vehicle + third party + theft + fire + natural disaster.',
          features: ['Complete protection', 'Own damage coverage', 'Third-party coverage', 'Additional perils covered']
        }
      ],
      icon: 'car',
      color: '#0072a3'
    },
    {
      id: 'home-insurance',
      name: 'Home Insurance',
      description: 'Protects your house and its contents against various risks and disasters.',
      covers: 'Your house and its contents',
      goal: 'Protects against damage due to fire, theft, earthquake, floods, etc.',
      ageEligibility: 'Property owner (18+ years)',
      documents: ['Ownership papers', 'Address proof', 'Property valuation certificate', 'Identity proof'],
      keyFeatures: [
        'Structure and contents coverage',
        'Natural and man-made disaster protection',
        'Temporary accommodation expenses',
        'Personal liability coverage'
      ],
      benefits: [
        'Protection of home investment',
        'Financial security against natural disasters',
        'Coverage for valuable possessions',
        'Temporary relocation assistance'
      ],
      icon: 'home',
      color: '#0072a3'
    },
    {
      id: 'travel-insurance',
      name: 'Travel Insurance',
      description: 'Covers problems during travel, especially useful for international trips.',
      covers: 'Problems during travel (especially abroad)',
      goal: 'Protection against travel-related risks and emergencies',
      ageEligibility: 'Any age with valid travel documents',
      documents: ['Passport', 'Travel itinerary', 'Visa (if applicable)', 'Identity proof'],
      keyFeatures: [
        'Medical emergency coverage abroad',
        'Trip cancellation and interruption',
        'Lost baggage compensation',
        'Flight delay compensation'
      ],
      benefits: [
        'Medical coverage in foreign countries',
        'Financial protection for trip investments',
        'Emergency evacuation services',
        '24/7 assistance services'
      ],
      icon: 'airplane',
      color: '#0072a3'
    },
    {
      id: 'personal-accident',
      name: 'Personal Accident Insurance',
      description: 'Provides compensation for death or disability due to accidents.',
      covers: 'Death or disability due to an accident',
      goal: 'Compensation for injury, loss of limbs, or accidental death',
      ageEligibility: '18-65 years',
      documents: ['Identity proof', 'Age proof', 'Income proof', 'Medical certificate (if required)'],
      keyFeatures: [
        'Lump sum payout on accidental death',
        'Compensation for permanent/temporary disability',
        'Coverage for medical expenses due to accidents',
        'Additional benefits for specific scenarios'
      ],
      benefits: [
        'Financial support during disability',
        'Family protection in case of accidental death',
        'Medical expense coverage',
        'Income replacement during recovery'
      ],
      icon: 'shield',
      color: '#0072a3'
    },
    {
      id: 'crop-insurance',
      name: 'Crop Insurance (For Farmers)',
      description: 'Protects farmers against crop loss due to natural calamities and pests.',
      covers: 'Loss of crops due to weather (drought, flood, hailstorm, pests)',
      goal: 'Financial protection for farmers against crop failures',
      ageEligibility: 'Farmers with valid land records',
      documents: ['Land records', 'Aadhaar card', 'Bank account details', 'Sowing certificate'],
      keyFeatures: [
        'Coverage for all notified crops',
        'Premium subsidy by government',
        'Sum insured based on scale of finance',
        'Quick claim settlement process'
      ],
      benefits: [
        'Government scheme: PMFBY (Pradhan Mantri Fasal Bima Yojana)',
        'Low premium rates due to subsidies',
        'Coverage against multiple perils',
        'Financial stability for farming community'
      ],
      icon: 'tree',
      color: '#0072a3'
    },
    {
      id: 'business-insurance',
      name: 'Commercial/Business Insurance',
      description: 'Protects businesses against various operational risks and liabilities.',
      covers: 'Business assets, operations, and liabilities',
      goal: 'Protection for shops, factories, offices against various business risks',
      ageEligibility: 'Business owners and entities',
      documents: ['Business registration', 'GST certificate', 'Property documents', 'Financial statements'],
      keyFeatures: [
        'Property and asset protection',
        'Business interruption coverage',
        'Public liability protection',
        'Employee compensation coverage'
      ],
      benefits: [
        'Business continuity assurance',
        'Protection against fire, theft, machinery breakdown',
        'Employee injury coverage',
        'Legal liability protection'
      ],
      icon: 'building',
      color: '#0072a3'
    }
  ];

  insuranceTerms: InsuranceTerm[] = [
    {
      term: 'Premium',
      definition: 'The amount you pay regularly to get insurance coverage. It can be paid monthly, quarterly, half-yearly, or annually.',
      icon: 'rupee'
    },
    {
      term: 'Policy',
      definition: 'The legal agreement (document) between you and the insurance company that outlines coverage, terms, and conditions.',
      icon: 'contract'
    },
    {
      term: 'Sum Assured',
      definition: 'The money you or your family will receive when something happens (like death, accident, or maturity of policy).',
      icon: 'calculator'
    },
    {
      term: 'Claim',
      definition: 'Request you raise to get money from insurance company when a covered event occurs (like hospitalization, accident, etc.).',
      icon: 'form'
    },
    {
      term: 'Nominee',
      definition: 'The person who will receive the insurance money in case of your death. You can have multiple nominees with different percentages.',
      icon: 'user'
    },
    {
      term: 'Rider',
      definition: 'Additional coverage you can add to your basic policy for extra protection (like accidental death, critical illness).',
      icon: 'plus-circle'
    },
    {
      term: 'Deductible',
      definition: 'The amount you pay from your pocket before insurance starts paying. Higher deductible means lower premium.',
      icon: 'minus-circle'
    },
    {
      term: 'Maturity',
      definition: 'The end date of your insurance policy when you receive the accumulated amount (applicable for savings policies).',
      icon: 'calendar'
    }
  ];

  eligibilityData: EligibilityInfo[] = [
    {
      insuranceType: 'Life Insurance',
      ageEligibility: '18-65 years',
      documentsRequired: ['ID proof', 'Income proof', 'Medical test']
    },
    {
      insuranceType: 'Health Insurance',
      ageEligibility: '91 days to 65+ years',
      documentsRequired: ['ID proof', 'Age proof', 'Medical history']
    },
    {
      insuranceType: 'Motor Insurance',
      ageEligibility: 'Vehicle owner',
      documentsRequired: ['RC', 'Driving license', 'Vehicle papers']
    },
    {
      insuranceType: 'Home Insurance',
      ageEligibility: 'Property owner',
      documentsRequired: ['Ownership papers', 'Address proof']
    },
    {
      insuranceType: 'Travel Insurance',
      ageEligibility: 'Valid ticket holder',
      documentsRequired: ['Passport', 'Travel itinerary']
    },
    {
      insuranceType: 'Crop Insurance',
      ageEligibility: 'Farmer',
      documentsRequired: ['Land records', 'Aadhaar', 'Bank account']
    }
  ];

  expertTips = [
    {
      title: 'Buy Insurance Early',
      description: 'The younger you are, the lower your premium. Start with term life insurance and basic health insurance in your 20s for maximum benefit.'
    },
    {
      title: 'Assess Your Coverage Needs',
      description: 'For life insurance, aim for 10-15 times your annual income. For health insurance, consider ₹5-10 lakhs minimum coverage for a family.'
    },
    {
      title: 'Read the Fine Print',
      description: 'Understand exclusions, waiting periods, and claim procedures. What is NOT covered is as important as what is covered.'
    },
    {
      title: 'Don\'t Mix Insurance with Investment',
      description: 'Buy pure protection plans (term life, health) and invest separately in mutual funds, PPF, or other instruments for better returns.'
    },
    {
      title: 'Maintain Continuity',
      description: 'Never let your insurance lapse. Pay premiums on time to avoid losing coverage and benefits like no-claim bonus in health insurance.'
    },
    {
      title: 'Choose Reputable Insurers',
      description: 'Check claim settlement ratio, customer service reviews, and financial strength of the insurance company before buying.'
    },
    {
      title: 'Update Your Policies Regularly',
      description: 'Review and update your coverage as your life changes - marriage, children, salary increase, or change in health status.'
    },
    {
      title: 'Keep All Documents Safe',
      description: 'Maintain physical and digital copies of all insurance documents. Inform your family about policy details and how to claim.'
    }
  ];
}

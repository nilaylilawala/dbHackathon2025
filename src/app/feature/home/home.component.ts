import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CdsIconModule } from '@cds/angular';
import { ClarityIcons } from '@cds/core/icon';
import { ClarityModule, ClrIconModule } from '@clr/angular';
// import { CarouselModule } from 'ngx-bootstrap/carousel';

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  cta: string;
  route: string;
  description: string;
}


@Component({
  imports: [CommonModule, ClarityModule, CdsIconModule],
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  carouselSlides: CarouselSlide[] = [
    // {
    //   id: 1,
    //   title: "Master Your Money",
    //   subtitle: "Financial Literacy is the Key to Freedom",
    //   description: "Learn how proper financial planning can help you achieve your dreams. From budgeting to investing, we'll guide you every step of the way.",
    //   imageUrl: "/assets/1.jpg",
    //   cta: "Start Learning",
    //   route: "/financial-literacy"
    // },
    // {
    //   id: 2,
    //   title: "Smart Borrowing",
    //   subtitle: "Understanding Loans & Credit",
    //   description: "Make informed decisions about loans and credit. Compare interest rates, understand EMIs, and choose the right financing options.",
    //   imageUrl: "/assets/2.jpg",
    //   cta: "Explore Loans",
    //   route: "/loan-guru"
    // },
    {
      id: 1,
      title: "Master Your Money",
      subtitle: "Financial Literacy is the Key to Freedom",
      description: "Learn essential money management skills that will transform your financial future. From budgeting basics to advanced investment strategies, build the knowledge you need to make informed financial decisions and achieve your dreams.",
      imageUrl: "/assets/financial_literacy.jpg",
      cta: "Start Learning Today",
      route: "/learnings"
    },
    {
      id: 2,
      title: "Protect What Matters Most",
      subtitle: "Comprehensive Insurance & Risk Management",
      description: "Safeguard your family's future with the right insurance coverage. Get expert advice on health insurance, life insurance, and general insurance policies. Learn to assess risks and choose optimal protection plans.",
      imageUrl: "/assets/insurance.jpg",
      cta: "Learn Insurance",
      route: "/ai-finance-guru/insurance-guru"
    },
    {
      id: 3,
      title: "Build Lasting Wealth",
      subtitle: "Investment Strategies for Financial Growth",
      description: "Discover the power of smart investing and compound growth. Learn about mutual funds, SIPs, tax-saving investments, and retirement planning. Start your wealth-building journey with expert guidance and proven strategies.",
      imageUrl: "/assets/investment.jpg",
      cta: "Learn Investments",
      route: "/ai-finance-guru/investment-guru"
    },
    {
      id: 4,
      title: "Smart Borrowing Solutions",
      subtitle: "Navigate Loans & Credit with Confidence",
      description: "Make informed borrowing decisions with expert guidance on home loans, personal loans, and credit management. Compare rates, understand EMIs, calculate affordability, and choose the perfect financing solution for your needs.",
      imageUrl: "/assets/loan.jpg",
      cta: "Learn Loans",
      route: "/ai-finance-guru/loan-guru"
    },
  ];


  // Current carousel slide
  currentSlide = 0;
  carouselInterval: any;

  // Financial stats
  financialStats = [
    { label: 'Users Helped', value: '50,000+', icon: 'users' },
    { label: 'Loans Processed', value: '₹500 Cr+', icon: 'currency-rupee' },
    { label: 'Insurance Policies', value: '25,000+', icon: 'shield' },
    { label: 'Investment Plans', value: '15,000+', icon: 'trending-up' }
  ];

  // Quick tips
  quickTips = [
    {
      title: "Emergency Fund",
      tip: "Maintain 6-12 months of expenses as emergency fund",
      icon: "piggy-bank"
    },
    {
      title: "Credit Score",
      tip: "Keep your CIBIL score above 750 for better loan rates",
      icon: "star"
    },
    {
      title: "Early Investment",
      tip: "Start investing early to benefit from compounding",
      icon: "clock"
    },
    {
      title: "Insurance Coverage",
      tip: "Get life insurance worth 10x your annual income",
      icon: "umbrella"
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.carouselSlides.length;
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0
      ? this.carouselSlides.length - 1
      : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  navigateToGuru(route: string): void {
    this.router.navigate([route]);
  }

  navigateToRoute(route: string): void {
    this.router.navigate([route]);
  }
  getSlideIcon(slideId: number): string {
    const icons: any = {
      1: 'dollar-bill',
      2: 'home',
      3: 'shield-check',
      4: 'trending-up'
    };
    return icons[slideId] || 'dollar-bill';
  }
}

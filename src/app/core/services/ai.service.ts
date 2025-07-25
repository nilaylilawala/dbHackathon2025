import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timeout, retry } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface GoogleAIRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
  safetySettings?: Array<{
    category: string;
    threshold: string;
  }>;
}

export interface GoogleAIResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason: string;
    safetyRatings: Array<{
      category: string;
      probability: string;
    }>;
  }>;
  promptFeedback?: {
    safetyRatings: Array<{
      category: string;
      probability: string;
    }>;
  };
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAIService {
  private readonly API_KEY: string = 'AIzaSyD5IVHV9bWcljWXgzjgRk6Zy5JoXHEIA9E'; // Replace with environment variable
  private readonly BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
  private readonly MODEL = 'gemini-pro';
  private readonly TIMEOUT_MS = 30000; // 30 seconds timeout

  // Finance-specific system prompt
  private readonly FINANCE_SYSTEM_PROMPT = `You are FinanceGuru AI, a specialized financial advisor and expert assistant focused exclusively on finance, banking, investments, insurance, loans, and related topics in the Indian context.

CRITICAL GUIDELINES:
1. ONLY respond to finance-related questions about:
   - Investments (mutual funds, stocks, bonds, SIP, etc.)
   - Banking (savings, current accounts, FDs, etc.)
   - Loans (home, personal, car, education loans)
   - Insurance (health, life, term, motor insurance)
   - Tax planning (80C, LTCG, STCG, GST)
   - Retirement planning (NPS, PPF, EPF)
   - Financial planning and budgeting
   - Credit scores and debt management
   - Real estate investments
   - Cryptocurrency (with risk warnings)

2. For NON-FINANCE questions, respond EXACTLY:
   "I'm FinanceGuru AI, specialized in financial guidance. Please ask me questions related to finance, investments, banking, loans, insurance, or financial planning. I'm here to help you make smart financial decisions! 💰"

3. ALWAYS include disclaimers:
   - "This is educational information, not personalized financial advice"
   - "Consult a SEBI-registered financial advisor for personalized guidance"
   - "Past performance doesn't guarantee future results" (for investments)
   - "Investments are subject to market risks"

4. Use Indian financial context:
   - Currency in ₹ (Rupees)
   - Indian tax laws and regulations
   - Indian investment options (PPF, ELSS, NPS, etc.)
   - Indian insurance products
   - RBI and SEBI guidelines

5. Response format:
   - Keep responses concise but informative (max 300 words)
   - Use bullet points for clarity
   - Include relevant examples with Indian context
   - Be encouraging about financial literacy

6. Risk warnings for high-risk investments:
   - Always mention risks for equity investments
   - Explain volatility in simple terms
   - Suggest diversification

Now respond to the user's question:`;

  constructor(private http: HttpClient) {}

  /**
   * Get AI response for finance-related queries
   */
  getFinanceAdvice(userQuery: string): Observable<string> {
    // Pre-validate query (basic check)
    if (!userQuery.trim()) {
      return throwError(() => new Error('Query cannot be empty'));
    }

    const prompt = `${this.FINANCE_SYSTEM_PROMPT}\n\nUser Question: ${userQuery.trim()}`;

    const requestBody: GoogleAIRequest = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${this.BASE_URL}/${this.MODEL}:generateContent?key=${this.API_KEY}`;

    return this.http.post<GoogleAIResponse>(url, requestBody, { headers })
      .pipe(
        timeout(this.TIMEOUT_MS),
        retry(2), // Retry up to 2 times on failure
        map(response => this.extractResponseText(response)),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Extract text from Google AI response
   */
  private extractResponseText(response: GoogleAIResponse): string {
    try {
      if (!response?.candidates?.length) {
        throw new Error('No response candidates received');
      }

      const candidate = response.candidates[0];
      
      // Check if response was blocked for safety
      if (candidate.finishReason === 'SAFETY') {
        return `🛡️ I cannot provide information on this topic due to safety guidelines. Please ask me about finance-related topics like investments, banking, loans, or insurance.

Try asking about:
• Investment planning strategies
• Tax-saving options under Section 80C
• Best savings account features
• Home loan eligibility criteria
• Health insurance benefits`;
      }

      const text = candidate?.content?.parts?.[0]?.text;
      
      if (!text) {
        throw new Error('No text content in response');
      }

      return text.trim();
      
    } catch (error) {
      console.error('Error extracting response text:', error);
      throw new Error('Failed to process AI response. Please try again.');
    }
  }

  /**
   * Handle HTTP and API errors
   */
  private handleError(error: any): Observable<never> {
    console.error('Google AI Service Error:', error);

    let errorMessage = '';

    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 400:
          errorMessage = 'Invalid request. Please check your question and try again.';
          break;
        case 401:
          errorMessage = 'Authentication failed. Please check API configuration.';
          break;
        case 403:
          errorMessage = 'Access denied. API quota may be exceeded.';
          break;
        case 429:
          errorMessage = 'Too many requests. Please wait a moment and try again.';
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = 'Service temporarily unavailable. Please try again later.';
          break;
        default:
          errorMessage = 'Network error. Please check your connection and try again.';
      }
    } else if (error.name === 'TimeoutError') {
      errorMessage = 'Request timed out. Please try again with a shorter question.';
    } else {
      errorMessage = error.message || 'Something went wrong. Please try again.';
    }

    // Return user-friendly error message
    const fallbackResponse = `❌ ${errorMessage}

💡 **Meanwhile, here are some finance topics I can help with:**
• **Investments**: SIP, mutual funds, stocks, bonds
• **Banking**: savings accounts, FDs, loans
• **Insurance**: health, life, term insurance
• **Tax Planning**: 80C deductions, tax-saving options
• **Financial Planning**: budgeting, emergency funds

Please try asking your question again!`;

    return throwError(() => new Error(fallbackResponse));
  }

  /**
   * Check if the API key is configured
   */
  isConfigured(): boolean {
    return this.API_KEY !== 'YOUR_GOOGLE_AI_API_KEY' && this.API_KEY.length > 0;
  }

  /**
   * Get sample finance questions for quick suggestions
   */
  getSampleQuestions(): string[] {
    return [
      "How to start investing with ₹5,000 per month?",
      "What are the best tax-saving investments under Section 80C?",
      "SIP vs lump sum investment - which is better?",
      "How to improve my CIBIL credit score?",
      "What types of health insurance should I consider?",
      "How much emergency fund should I maintain?",
      "What are the eligibility criteria for home loans?",
      "Explain the difference between ELSS and PPF",
      "How does NPS work for retirement planning?",
      "What are the tax implications of mutual fund investments?"
    ];
  }

  /**
   * Validate if query seems finance-related (basic check)
   */
  isFinanceRelated(query: string): boolean {
    const financeKeywords = [
      'investment', 'invest', 'money', 'finance', 'financial', 'bank', 'banking',
      'loan', 'credit', 'debt', 'insurance', 'tax', 'saving', 'savings',
      'mutual fund', 'sip', 'fd', 'ppf', 'nps', 'elss', 'stock', 'share',
      'rupee', 'rupees', '₹', 'budget', 'planning', 'retirement', 'pension',
      'emi', 'interest', 'return', 'profit', 'loss', 'portfolio', 'asset',
      'liability', 'expense', 'income', 'salary', 'bonus', 'dividend'
    ];

    const normalizedQuery = query.toLowerCase();
    return financeKeywords.some(keyword => normalizedQuery.includes(keyword));
  }
}
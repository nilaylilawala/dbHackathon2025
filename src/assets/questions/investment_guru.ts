export const quiz = {
    "quizId": "investment-guru",
    "title": "Investment Guru - Test Your Knowledge", 
    "description": "Test your understanding of mutual funds, SIPs, and investment strategies",
    "totalQuestions": 3,
    "passingScore": 2,
    "questions": [
      {
        "id": 1,
        "question": "What is the maximum amount you can invest in ELSS (Equity Linked Savings Scheme) mutual funds to claim tax deduction under Section 80C?",
        "type": "multiple-choice",
        "options": [
          {
            "id": "a",
            "text": "₹1 lakh",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "₹1.5 lakhs",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "₹2 lakhs",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "₹2.5 lakhs",
            "isCorrect": false
          }
        ],
        "correctAnswer": "b",
        "explanation": "Under Section 80C, you can claim tax deduction up to ₹1.5 lakhs per financial year. ELSS investments qualify for this deduction and have a lock-in period of 3 years, which is the shortest among all 80C investment options.",
        "detailedExplanation": {
          "why_b_correct": "₹1.5 lakhs is the maximum limit under Section 80C for tax deduction, applicable to ELSS and other qualifying investments.",
          "why_a_wrong": "₹1 lakh is below the maximum limit, so you're not utilizing the full tax benefit available.",
          "why_c_wrong": "₹2 lakhs exceeds the Section 80C limit, so only ₹1.5 lakhs will be eligible for deduction.",
          "why_d_wrong": "₹2.5 lakhs is well above the limit, making the excess amount ineligible for tax benefits."
        },
        "tips": [
          "ELSS has the shortest lock-in period (3 years) among 80C options",
          "You can invest more than ₹1.5 lakhs in ELSS, but tax benefit is capped",
          "Plan your 80C investments early in the financial year"
        ]
      },
      {
        "id": 2,
        "question": "What is the ideal asset allocation for a 30-year-old investor with moderate risk appetite?",
        "type": "multiple-choice", 
        "options": [
          {
            "id": "a",
            "text": "30% Equity, 70% Debt",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "50% Equity, 50% Debt",
            "isCorrect": false
          },
          {
            "id": "c",
            "text": "70% Equity, 30% Debt",
            "isCorrect": true
          },
          {
            "id": "d",
            "text": "90% Equity, 10% Debt",
            "isCorrect": false
          }
        ],
        "correctAnswer": "c",
        "explanation": "A common rule is '100 minus age' for equity allocation. For a 30-year-old, this suggests 70% equity and 30% debt. This allocation provides good growth potential while maintaining some stability through debt investments.",
        "detailedExplanation": {
          "why_c_correct": "70% equity allocation follows the age-based rule and suits a 30-year-old's long investment horizon and moderate risk tolerance.",
          "why_a_wrong": "30% equity is too conservative for a 30-year-old and may not beat inflation over the long term.",
          "why_b_wrong": "50% equity is still conservative for someone with 35+ years to retirement and moderate risk appetite.",
          "why_d_wrong": "90% equity is too aggressive even for a young investor with moderate risk appetite - it's suitable for high-risk investors."
        },
        "tips": [
          "Review and rebalance your portfolio annually",
          "As you age, gradually shift from equity to debt",
          "Consider your risk tolerance alongside age-based allocation"
        ]
      },
      {
        "id": 3,
        "question": "What is the minimum SIP amount you can start with in most equity mutual funds?",
        "type": "multiple-choice",
        "options": [
          {
            "id": "a",
            "text": "₹100",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "₹500",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "₹1,000",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "₹5,000",
            "isCorrect": false
          }
        ],
        "correctAnswer": "b",
        "explanation": "Most mutual fund houses allow SIP investments starting from ₹500 per month in equity funds. Some funds may have higher minimums (₹1,000), but ₹500 is the most common minimum SIP amount across the industry.",
        "detailedExplanation": {
          "why_b_correct": "₹500 is the standard minimum SIP amount offered by most AMCs (Asset Management Companies) for equity mutual funds.",
          "why_a_wrong": "₹100 is too low and not offered by most funds, though some may have special schemes with very low minimums.",
          "why_c_wrong": "₹1,000 is higher than the minimum required by most funds, though some premium funds may have this requirement.",
          "why_d_wrong": "₹5,000 is much higher than typical minimums and would exclude many small investors from starting SIPs."
        },
        "tips": [
          "Start small and increase SIP amount as income grows",
          "Consistency is more important than the amount",
          "Many platforms offer even lower minimums for systematic investing"
        ]
      }
    ],
    "createdDate": "2024-01-15",
    "lastUpdated": "2024-01-15",
    "version": "1.0"
  }
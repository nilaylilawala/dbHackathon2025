export const quiz = {
    "quizId": "loan-guru",
    "title": "Loan Guru - Test Your Knowledge",
    "description": "Test your understanding of loans, EMIs, and lending processes",
    "totalQuestions": 3,
    "passingScore": 2,
    "questions": [
      {
        "id": 1,
        "question": "What is the maximum loan-to-value (LTV) ratio typically offered for home loans in India?",
        "type": "multiple-choice",
        "options": [
          {
            "id": "a",
            "text": "70%",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "80%",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "90%",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "100%",
            "isCorrect": false
          }
        ],
        "correctAnswer": "b",
        "explanation": "Most banks in India offer a maximum LTV ratio of 80% for home loans. This means you need to arrange for at least 20% of the property value as down payment. Some banks may offer up to 85% or 90% LTV for certain customer segments, but 80% is the standard maximum.",
        "detailedExplanation": {
          "why_b_correct": "80% is the standard maximum LTV ratio offered by most Indian banks and financial institutions for home loans.",
          "why_a_wrong": "70% LTV is conservative and lower than what most banks typically offer as maximum.",
          "why_c_wrong": "90% LTV is rarely offered and only to specific customer segments with excellent credit profiles.",
          "why_d_wrong": "100% LTV means no down payment, which is extremely rare and risky for lenders."
        },
        "tips": [
          "Higher LTV means lower down payment but may result in higher interest rates",
          "Your CIBIL score affects the LTV ratio you're eligible for",
          "Different property types may have different LTV limits"
        ]
      },
      {
        "id": 2,
        "question": "If your monthly income is ₹50,000, what is the maximum EMI you should ideally commit to according to standard lending guidelines?",
        "type": "multiple-choice",
        "options": [
          {
            "id": "a",
            "text": "₹15,000",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "₹20,000",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "₹25,000",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "₹30,000",
            "isCorrect": false
          }
        ],
        "correctAnswer": "b",
        "explanation": "The ideal EMI should not exceed 40% of your monthly income. For ₹50,000 monthly income, 40% equals ₹20,000. This ensures you have sufficient funds for other expenses and maintain a healthy debt-to-income ratio.",
        "detailedExplanation": {
          "why_b_correct": "₹20,000 represents 40% of ₹50,000 income, which is the maximum recommended EMI-to-income ratio.",
          "why_a_wrong": "₹15,000 is only 30% of income - conservative but not the maximum guideline.",
          "why_c_wrong": "₹25,000 is 50% of income, which exceeds the safe lending limit and may strain finances.",
          "why_d_wrong": "₹30,000 is 60% of income, which is financially risky and most banks won't approve such high ratios."
        },
        "tips": [
          "Keep total EMIs (all loans) under 40% of income",
          "Consider future income growth and expenses",
          "Emergency fund is crucial when taking high EMI commitments"
        ]
      },
      {
        "id": 3,
        "question": "Which factor has the MOST significant impact on your home loan interest rate?",
        "type": "multiple-choice",
        "options": [
          {
            "id": "a",
            "text": "Property location",
            "isCorrect": false
          },
          {
            "id": "b",
            "text": "CIBIL Score",
            "isCorrect": true
          },
          {
            "id": "c",
            "text": "Loan amount",
            "isCorrect": false
          },
          {
            "id": "d",
            "text": "Employment type",
            "isCorrect": false
          }
        ],
        "correctAnswer": "b",
        "explanation": "CIBIL Score is the most crucial factor affecting your interest rate. A score above 750 can get you the best rates, while scores below 650 may result in higher rates or loan rejection. The difference can be 1-2% in interest rates.",
        "detailedExplanation": {
          "why_b_correct": "CIBIL Score directly reflects your creditworthiness and repayment history, making it the primary factor banks consider for interest rate determination.",
          "why_a_wrong": "Property location affects loan approval but has minimal impact on interest rates compared to credit score.",
          "why_c_wrong": "Loan amount may have slight impact but credit score outweighs this factor significantly.",
          "why_d_wrong": "Employment type (salaried vs self-employed) affects approval process but CIBIL score has more impact on rates."
        },
        "tips": [
          "Maintain CIBIL score above 750 for best rates",
          "Pay all EMIs and credit card bills on time",
          "Check your credit report regularly for errors"
        ]
      }
    ],
    "createdDate": "2024-01-15",
    "lastUpdated": "2024-01-15",
    "version": "1.0"
  }
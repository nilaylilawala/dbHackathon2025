import { CommonModule } from '@angular/common';
import { Component, importProvidersFrom } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClrAlertModule, ClrInputModule } from '@clr/angular';
import { GoogleGenAI } from "@google/genai";
import { MarkdownModule } from 'ngx-markdown'; 
import { environment } from 'environments/environment';

@Component({
  selector: 'app-loan-guru',
  templateUrl: './loan-guru.component.html',
  styleUrls: ['./loan-guru.component.scss'],
  standalone: true,
  imports: [ClrInputModule, ClrAlertModule, ReactiveFormsModule, CommonModule, MarkdownModule],
})
export class LoanGuruComponent {
  ai = new GoogleGenAI({ apiKey: `${environment.GOOGLE_API_KEY}` });
  aiSuggestion: string = '';
  loading: boolean = false;
  askForm: FormGroup = new FormGroup({
    loanPurpose: new FormControl(''),
    desiredAmount: new FormControl(''),
    monthlyIncome: new FormControl(''),
    employmentStatus: new FormControl(''),
    existingLoans: new FormControl(''),
    repaymentPeriod: new FormControl(''),
    creditScore: new FormControl(''),
    age: new FormControl(''),
  });

  async fetchResponse(prompt: string) {
    console.log("Fetching response from AI with prompt:", prompt);
    this.loading = true;
    await this.ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    }).then((response: any) => {
      this.aiSuggestion = response.text;
      this.loading = false;
      console.log("AI response received:", this.aiSuggestion);
    });
  }

  submit() {
    console.log("Form submitted");
    console.log(this.askForm.value);
    const prompt = `You are a loan expert and you have to advice on loans, interest rates, benefits along with Banks offering them for which given person is eligible. Advice should be based on loans present in India, Keep only the list of some loans for the situation: Loan Purpose: ${this.askForm.value.loanPurpose}, Desired Loan Amount: ${this.askForm.value.desiredAmount}, Monthly Income: ${this.askForm.value.monthlyIncome}, Current Employment Status: ${this.askForm.value.employmentStatus}, Existing Loans: ${this.askForm.value.existingLoans}, Repayment Period: ${this.askForm.value.repaymentPeriod}, Credit Score: ${this.askForm.value.creditScore}, Age: ${this.askForm.value.age} in your response, no other feedback or questions should be present in the response. Based on these answers, please generate a highly structured response in clear, formal language, organized into the following distinct sections (with section headers Application Details (tabular summary of all the answers), Loan Options (list and brief description of the relevant loan products the Recommended Lenders with website URL (provide 2-3 example lenders with typical rates or features for someone in this profile) should eligible to based on their profile) Next Steps (concise, actionable steps the user should take to proceed). Ensure each section is clearly labeled and easy to read, and that suggestions are tailored specifically to the provided user data.`;
    console.log(prompt);
    this.fetchResponse(prompt);
  }
  reset() {
    this.askForm.reset();
    this.aiSuggestion = '';
  }
}

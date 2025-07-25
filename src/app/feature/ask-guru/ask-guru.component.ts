import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdsIconModule } from '@cds/angular';
import { ClarityIcons } from '@cds/core/icon';
import { ClarityModule, ClrIconModule, ClrLoadingState } from '@clr/angular';
import { GoogleGenAI } from '@google/genai';
import { environment } from 'environments/environment';
import { MarkdownModule } from 'ngx-markdown';
import { of, Subject, takeUntil } from 'rxjs';
import { GoogleAIService } from 'src/app/core/services/ai.service';
interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}
@Component({
  selector: 'app-ask-guru',
  templateUrl: './ask-guru.component.html',
  styleUrls: ['./ask-guru.component.scss'],
  standalone: true,
  imports: [CommonModule, ClarityModule, FormsModule, ClrIconModule, ReactiveFormsModule, MarkdownModule],
})
export class AskGuruComponent {
  @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;
  ai = new GoogleGenAI({ apiKey: `${environment.GOOGLE_API_KEY}` });

  chatForm: FormGroup;
  messages: ChatMessage[] = [];
  commonQuestions: string[] = [
    'What is the difference between home loan and personal loan?',
    'How to improve my CIBIL score?',
    'What documents are required for home loan?',
    'What is EMI and how is it calculated?',
    'Which investment option is best for beginners?',
    'How much emergency fund should I maintain?',
    'What are the tax benefits of home loan?',
    'How to choose the right insurance policy?'
  ];

  isLoading = false;
  loadingState = ClrLoadingState.DEFAULT;
  private apiKey = environment.GOOGLE_API_KEY;

  constructor(private fb: FormBuilder) {
    this.chatForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(3)]]
    });

  }

  ngOnInit(): void {
    this.addWelcomeMessage();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }


  private addWelcomeMessage(): void {
    this.messages = [{
      id: this.generateId(),
      sender: 'ai',
      content: 'Welcome to Ask Guru! I\'m here to help you with all your financial questions. Please set up your Google AI API key to get started.',
      timestamp: new Date()
    }];
  }

  private addAiMessage(content: string): void {
    this.messages.push({
      id: this.generateId(),
      sender: 'ai',
      content,
      timestamp: new Date()
    });
  }

  private addUserMessage(content: string): void {
    this.messages.push({
      id: this.generateId(),
      sender: 'user',
      content,
      timestamp: new Date()
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private scrollToBottom(): void {
    if (this.chatContainer) {
      const element = this.chatContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  async onSendMessage(): Promise<void> {
    if (this.chatForm.invalid || this.isLoading) {
      return;
    }

    const message = this.chatForm.get('message')?.value.trim();
    if (!message) return;

    this.addUserMessage(message);
    this.chatForm.reset();
    this.isLoading = true;
    this.loadingState = ClrLoadingState.LOADING;

    try {
      const prompt = `Behave like you are a financial chatbot for users and help them on their questions. Response should be user friendly and in detail with direct answer. If rate of particular financial asset is asked then fetch latest rate as per indian currency from internet and give response. If it seems that given input is not related to finance, simply avoid giving other response and tell user to ask finance related questions only. User Input is: ${message}`
      await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      }).then((res: any) => {
        this.addAiMessage(res.text);
      });

    } catch (error) {
      this.addAiMessage('Sorry, I encountered an error. Please check your API key and try again.');
      console.error('Error calling Google AI:', error);
    } finally {
      this.isLoading = false;
      this.loadingState = ClrLoadingState.DEFAULT;
    }
  }


  onQuestionClick(question: string): void {
    this.chatForm.patchValue({ message: question });
    this.onSendMessage();
  }

  generatePDF(): void {
    // if (this.messages.length <= 1) {
    //   alert('No chat history to export!');
    //   return;
    // }

    // const doc = new jsPDF();

    // // Header
    // doc.setFontSize(20);
    // doc.setTextColor(25, 118, 210);
    // doc.text('Ask Guru - Financial Chat History', 20, 30);

    // doc.setFontSize(12);
    // doc.setTextColor(100, 100, 100);
    // doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);

    // let yPosition = 65;

    // this.messages.slice(1).forEach(msg => {
    //   if (yPosition > 270) {
    //     doc.addPage();
    //     yPosition = 30;
    //   }

    //   doc.setFontSize(12);
    //   doc.setTextColor(msg.sender === 'user' ? 25 : 66, 118, 210);
    //   doc.text(`${msg.sender === 'user' ? 'You' : 'Financial Guru'}:`, 20, yPosition);

    //   doc.setTextColor(0, 0, 0);
    //   doc.setFontSize(10);
    //   const splitText = doc.splitTextToSize(msg.content, 160);
    //   doc.text(splitText, 20, yPosition + 10);

    //   yPosition += 15 + (splitText.length * 5) + 10;
    // });

    // doc.save('financial-chat-history.pdf');
  }
}

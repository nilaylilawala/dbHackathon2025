<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { languages, learningData } from './learnings.component.const';
import { LearningCardComponent } from './../learning-card/learning-card.component';
// youtube-player.component.ts
import { Component, OnInit } from '@angular/core';
import { ClrComboboxModule, ClrIconModule, ClrFormsModule, ClrLoadingModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-learnings',
  standalone: true,
  imports: [
    LearningCardComponent,
    FormsModule,
    ClrIconModule,
    ClrFormsModule,
    ClrLoadingModule,
    ClrComboboxModule,
    CommonModule,
  ],
  templateUrl: './learnings.component.html',
})
export class LearningsComponent {
  selection: any = { ...languages[0] };
  languages: any[] = [...languages];
  learningData: any = { ...learningData };
}
=======
import { CommonModule } from '@angular/common';
import { languages, learningData } from './learnings.component.const';
import { LearningCardComponent } from './../learning-card/learning-card.component';
// youtube-player.component.ts
import { Component, OnInit } from '@angular/core';
import { ClrComboboxModule, ClrIconModule, ClrFormsModule, ClrLoadingModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-learnings',
  standalone: true,
  imports: [
    LearningCardComponent,
    FormsModule,
    ClrIconModule,
    ClrFormsModule,
    ClrLoadingModule,
    ClrComboboxModule,
    CommonModule,
  ],
  templateUrl: './learnings.component.html',
})
export class LearningsComponent {
  selection: any = { ...languages[0] };
  languages: any[] = [...languages];
  learningData: any = { ...learningData };
}
>>>>>>> origin/main

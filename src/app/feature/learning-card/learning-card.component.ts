<<<<<<< HEAD
// youtube-player.component.ts
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-learning-card',
  standalone: true,
  styleUrls: ['./learning-card.component.scss'],
  templateUrl: './learning-card.component.html',
})
export class LearningCardComponent {
  @Input() cardHeader!: string;
  @Input() cardMediaId!: string;
  @Input() cardText!: string;
  safeSrc!: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit() {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.cardMediaId
    );
  }
}
=======
// youtube-player.component.ts
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-learning-card',
  standalone: true,
  styleUrls: ['./learning-card.component.scss'],
  templateUrl: './learning-card.component.html',
})
export class LearningCardComponent {
  @Input() cardHeader!: string;
  @Input() cardMediaId!: string;
  @Input() cardText!: string;
  safeSrc!: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit() {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.cardMediaId
    );
  }
}
>>>>>>> origin/main

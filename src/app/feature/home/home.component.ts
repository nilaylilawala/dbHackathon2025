import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  myInterval = 1500;
  activeSlideIndex = 0;
  slides: { image: string; text?: string }[] = [
    { 
      image: '../../../assets/1.jpg',
      text: 'Financial awareness'
    },
    { 
      image: '../../../assets/2.jpg' ,
      text: 'Financial awareness'
    },
    { 
      image: '../../../assets/3.jpg' ,
      text: 'Financial awareness'
    },
    { 
      image: '../../../assets/4.jpg' ,
      text: 'Financial awareness'
    },
    { 
      image: '../../../assets/5.jpg' ,
      text: 'Financial awareness'
    },
    { 
      image: '../../../assets/6.jpg' ,
      text: 'Financial awareness'
    },
  ];
}

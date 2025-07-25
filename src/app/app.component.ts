import { Component } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { loadIcons } from './clarity-icons';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./feature/navbar/navbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [ClarityModule, RouterOutlet, NavbarComponent],
})
export class AppComponent {
  constructor() {
    loadIcons();
  }
}

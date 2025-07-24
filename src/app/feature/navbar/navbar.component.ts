import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { ClarityModule, ClrIconModule, ClrVerticalNavModule } from "@clr/angular";
import { CdsIcon, ClarityIcons, cogIcon, dollarBillIcon, loginIcon } from '@cds/core/icon';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';


ClarityIcons.addIcons(loginIcon);
ClarityIcons.addIcons(dollarBillIcon);
@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, ClrIconModule, ClrVerticalNavModule, ClarityModule, RouterLink],
})
export class NavbarComponent {
  constructor(public accountService: AccountService) {}
}

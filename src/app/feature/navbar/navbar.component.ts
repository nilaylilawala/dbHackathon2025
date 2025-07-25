import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClarityModule, ClrIconModule, ClrVerticalNavModule } from '@clr/angular';
import {
  assignUserIcon,
  CdsIcon,
  ClarityIcons,
  cogIcon,
  dollarBillIcon,
  loginIcon,
  userIcon,
  usersIcon,
} from '@cds/core/icon';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

ClarityIcons.addIcons(loginIcon);
ClarityIcons.addIcons(userIcon);
ClarityIcons.addIcons(dollarBillIcon);
@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, ClrIconModule, ClrVerticalNavModule, ClarityModule, RouterLink],
})
export class NavbarComponent implements OnInit{
  constructor(public userService: UserService, private readonly router: Router) {}
  public user$ = this.userService.user$;
   isLoggedIn = false;

  ngOnInit(): void {
    this.user$.subscribe(x => {
      this.isLoggedIn = x ? true: false;
    });
  }
  public logout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  public subscription(){
    this.userService.subscribeToNewsletter().subscribe((response) => {
      this.userService.subscriptionState = response;
    });
  }
}

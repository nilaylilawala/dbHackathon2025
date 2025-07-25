import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { ClrFormsModule, ClrIconModule } from '@clr/angular';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, ClrFormsModule, ReactiveFormsModule, ClrIconModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup;
  public error = '';
  public isSignUpMode = false;

  constructor(private readonly userService: UserService, private readonly router: Router) {
    this.loginForm = new FormGroup({
      name: new FormControl(''),
      contactNumber: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      subscription: new FormControl(false, Validators.required),
    });
  }

  toggleMode(): void {
    this.isSignUpMode = !this.isSignUpMode;
    this.error = '';
  }

  submit(): void {
    console.log(this.loginForm.value);
    const { email, password, name, contactNumber, subscription } = this.loginForm.value;
    console.log(subscription);
    this.userService.subscriptionState = subscription === true ? true : false;
    if (this.isSignUpMode) {
      this.userService.signup({ email, password, name, contactNumber, subscription}).subscribe({
        next: (response: string) => {
          if (response === 'User registered successfully!') {
            this.router.navigate(['/learnings']);
          } else {
            this.error = 'User already registered';
          }
        },
        error: () => {
          this.error = 'Something went wrong. Please try again.';
        },
      });
    } else {
      this.userService.login(email, password).subscribe({
        next: (response: string) => {
          if (response === 'Login successful!') {
            this.router.navigate(['/learnings']);
          } else {
            this.error = 'Invalid email or password';
          }
        },
        error: () => {
          this.error = 'Something went wrong. Please try again.';
        },
      });
    }
  }
}
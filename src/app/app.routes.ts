import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {
  AuthPipeGenerator,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedPipeGenerator: AuthPipeGenerator = () =>
  redirectUnauthorizedTo(['/login']);
const redirectLoggedInPipeGenerator: AuthPipeGenerator = () => redirectLoggedInTo(['/']);

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'ai-finance-guru',
    loadComponent: () =>
      import('./feature/ai-finance-guru/ai-finance-guru.component').then((m) => m.AiFinanceGuruComponent),
    children: [
      {
        path: '',
        redirectTo: 'loan-guru',
        pathMatch: 'full'
      },
      {
        path: 'loan-guru',
        loadComponent: () =>
          import('./feature/loan-guru/loan-guru.component').then((m) => m.LoanGuruComponent),
      },
      {
        path: 'insurance-guru',
        loadComponent: () =>
          import('./feature/insurance-guru/insurance-guru.component').then((m) => m.InsuranceGuruComponent),
      },
      {
        path: 'investment-guru',
        loadComponent: () =>
          import('./feature/investment-guru/investment-guru.component').then((m) => m.InvestmentGuruComponent),
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./feature/login/login.component').then((m) => m.LoginComponent),
    // canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectLoggedInPipeGenerator,
    },
  },
  {
    path: 'learnings',
    pathMatch: 'full',
    loadComponent: () =>
      import('./feature/learnings/learnings.component').then((m) => m.LearningsComponent),
  },
  {
    path: 'ask-guru',
    pathMatch: 'full',
    loadComponent: () =>
      import('./feature/ask-guru/ask-guru.component').then((m) => m.AskGuruComponent),
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        // pathMatch: 'full',
        loadComponent: () =>
          import('./feature/shell/shell.component').then((m) => m.ShellComponent),
        // canActivate: [AuthGuard],
        data: {
          authGuardPipe: redirectUnauthorizedPipeGenerator,
        },
        children: [],
      },
    ],
  },
];

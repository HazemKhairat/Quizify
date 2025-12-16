import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/instructor/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { OtpCodeComponent } from './components/auth/otp-code/otp-code.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { SetNewPasswordComponent } from './components/auth/set-new-password/set-new-password.component';
import { PasswordChangedComponent } from './components/auth/password-changed/password-changed.component';
import { RegistrationSuccessComponent } from './components/auth/registration-success/registration-success.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'verify-email', component: OtpCodeComponent },
      { path: 'registration-success', component: RegistrationSuccessComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'set-new-password', component: SetNewPasswordComponent },
      { path: 'password-changed', component: PasswordChangedComponent },
    ]
  },

  {
    canActivate: [authGuard],
    path: 'instructor',
    children: [
      { path: 'home', component: HomeComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

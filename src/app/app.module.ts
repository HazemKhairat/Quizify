import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/instructor/home/home.component';
import { OtpCodeComponent } from './components/auth/otp-code/otp-code.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { SetNewPasswordComponent } from './components/auth/set-new-password/set-new-password.component';
import { PasswordChangedComponent } from './components/auth/password-changed/password-changed.component';
import { RegistrationSuccessComponent } from './components/auth/registration-success/registration-success.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    OtpCodeComponent,
    ForgotPasswordComponent,
    SetNewPasswordComponent,
    PasswordChangedComponent,
    RegistrationSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

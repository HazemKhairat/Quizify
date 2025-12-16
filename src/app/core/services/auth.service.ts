import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(signUpForm: User): Observable<any> {
    return this.http.post(`${environment.API_URL}/register`, signUpForm);
  }

  login(loginForm: User): Observable<any> {
    return this.http.post(`${environment.API_URL}/login`, loginForm);
  }


  verifyRegisterOtp(body: { email: string; code: string }) {
    return this.http.post<any>(`${environment.API_URL}/verify-otp-register`, body);
  }

  resendEmail(email: string){
    return this.http.post<any>(`${environment.API_URL}/resend code`, {email});
  }

  forgotPassword(email: string){
    return this.http.post<any>(`${environment.API_URL}/forget-password-otp`, {email});
  }

  verifyPasswordOtp(email: string, code: string){
    return this.http.post<any>(`${environment.API_URL}/verify-password-otp`, {email, code});
  }

  ResetPassword(email: string, password: string, password_confirmation: string){
    return this.http.post<any>(`${environment.API_URL}/reset-Password`, {email, password, password_confirmation});
  }

  logOut(){
    localStorage.removeItem('accessToken');
  }


}

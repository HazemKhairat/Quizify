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


}

import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authSerivce: AuthService, private router: Router){}

  log_out(){
    this.authSerivce.logOut();
    this.router.navigate(['/auth/login']);
  }
}

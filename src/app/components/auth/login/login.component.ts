import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth_service: AuthService, private form_builder: FormBuilder, private toastr: ToastrService, private router: Router) { }
  assets: string = environment.ASSETS
  showPassword = false;


  loginForm: FormGroup = this.form_builder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(10)]],
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }



  onSubmit() {
    if (this.loginForm.valid) {
      this.auth_service.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response.data.token)
          localStorage.setItem('accessToken', response.data.token);
          this.toastr.success('User logged successfully!', 'Success');
          this.router.navigate(['features/home'])
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.toastr.error('Login failed!', 'Error');
        }

      });
    } else {
      this.loginForm.markAllAsTouched();
      this.toastr.warning('Please fill out all required fields.', 'Form Invalid');
    }
  }

}

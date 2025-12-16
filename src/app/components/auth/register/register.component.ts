import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private auth_service: AuthService,
    private form_builder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  assets: string = environment.ASSETS;

  signUpForm: FormGroup = this.form_builder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(10)]],
    password_confirmation: ['', [Validators.required]],
    role: ['student', Validators.required]
  });

  onSubmit() {
    if (this.signUpForm.valid) {

      this.auth_service.register(this.signUpForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);

          this.toastr.success(
            'User registered successfully! Please verify your email.',
            'Success'
          );

          const email = this.signUpForm.get('email')?.value;

          this.router.navigate(['/auth/verify-email'], {
            queryParams: { email: email }
          });
        },

        error: (err) => {
          console.error('Registration failed:', err);
          this.toastr.error(
            err.error?.message || 'Registration failed!',
            'Error'
          );
        }
      });

    } else {
      this.signUpForm.markAllAsTouched();
      this.toastr.warning('Please fill out all required fields.', 'Form Invalid');
    }
  }

}

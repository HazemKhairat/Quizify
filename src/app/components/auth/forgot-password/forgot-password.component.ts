import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent{
  constructor(private authService: AuthService, private toastr: ToastrService){

  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })


  forgot_passowrd(){
    const email = this.form.get('email')?.value as string;
    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.toastr.success("please check your email to reset password", "Success");
      },
      error: (err) => {
        this.toastr.error(err.message);
      }
    })
  }
}

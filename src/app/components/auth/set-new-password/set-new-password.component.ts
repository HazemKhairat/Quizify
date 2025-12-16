import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrl: './set-new-password.component.css'
})
export class SetNewPasswordComponent implements OnInit {
  email: string = '';
  code: string = '';
  isValid: boolean = false;
  constructor(private authService: AuthService, private route: ActivatedRoute, private toastar: ToastrService, private router: Router) { }
  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password_confirmation: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.code = params['code'];

      if (!this.email || !this.code) {
        console.log("missing email or code");
        return;
      }

      this.verify_password_otp();
    });
  }



  verify_password_otp() {
    this.authService.verifyPasswordOtp(this.email, this.code).subscribe({
      next: (res) => {
        this.toastar.success(res.message);
        this.isValid = true;
      },
      error: (err: any) => {
        this.toastar.error(err.message);
        this.isValid = false;
      }
    })
  }

  reset_password() {
    if(!this.isValid){
      this.toastar.error("You are not verified yet");
      return;
    }
    this.authService.
    ResetPassword(this.email, this.form.get('password')?.value as string, this.form.get('password_confirmation')?.value as string)
    .subscribe({
      next: (res) => {
        this.toastar.success(res.message);
        this.router.navigate(['/auth/login'])
      },
      error: (err) => {
        this.toastar.error(err.message);
      }
    })
  }


}

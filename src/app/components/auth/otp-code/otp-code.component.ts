import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-code',
  templateUrl: './otp-code.component.html',
  styleUrls: ['./otp-code.component.css']
})



export class OtpCodeComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) { }

  email: string = '';
  canResend: boolean = true;
  timer: number = 60;
  intervalId: any;
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  otp: string[] = ['', '', '', '', '', ''];


  ngOnInit() {
    this.email = this.route.snapshot.queryParams['email'] || '';

    if (!this.email) {
      this.toastr.error('Email not found, please register again.');
      this.router.navigate(['/auth/register']);
    }
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.otp[index] = value;

    if (value && index < this.otp.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
      this.otp[index - 1] = '';
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();

    const pasteData = event.clipboardData?.getData('text') || '';
    const digits = pasteData.replace(/\D/g, '').split(''); 

    digits.forEach((digit, i) => {
      if (i < this.otp.length) {
        this.otp[i] = digit;
        this.otpInputs.toArray()[i].nativeElement.value = digit;
      }
    });

    const lastIndex = Math.min(digits.length, this.otp.length) - 1;
    if (lastIndex >= 0) {
      this.otpInputs.toArray()[lastIndex].nativeElement.focus();
    }
  }

  verifyOtp() {
    const code = this.otp.join('');

    if (code.length !== 6) {
      this.toastr.warning('Please enter the full 6-digit code.');
      return;
    }

    const body = {
      email: this.email,
      code: code
    };

    this.auth.verifyRegisterOtp(body).subscribe({
      next: (res) => {
        this.toastr.success('Email verified successfully!', 'Success');

        localStorage.setItem('accessToken', res.data.token);

        this.router.navigate(['/features/home']);
      },

      error: (err) => {
        this.toastr.error(err.error.message || 'Verification failed');
      }
    });
  }

  startTimer(){
    this.canResend = false;
    this.timer = 60;
    this.intervalId = setInterval(() => {
      this.timer--;
      if(this.timer == 0){
        clearInterval(this.intervalId);
        this.canResend = true;
      }
    }, 1000)
  }


  resend(){
    this.auth.resendEmail(this.email).subscribe( {
      next: (res) => {
        this.toastr.success('We sent you another email, Please check your email', 'Success');
        this.startTimer();
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Verification failed');
      }
    })
  }
}

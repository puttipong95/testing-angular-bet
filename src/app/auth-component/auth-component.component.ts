import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BetServiceService } from '../servics/bet-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss'],
})
export class AuthComponentComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  payload: {};

  constructor(
    private fb: FormBuilder,
    private service: BetServiceService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.form = this.fb.group({
      tel: [
        '+66955420010',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      password: ['Put123456789', [Validators.required]],
    });
  }

  onSubmit() {
    let val = this.form.value;
    this.payload = {
      tel: val.tel,
      password: val.password,
    };
    this.service.betSignup(this.payload).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        console.log(err.error.text);
        if (err.error.text === 'ER|Member ID already existed.') {
          alert('กำลังล็อกอินเข้าสู่ระบบ');
          setTimeout(() => {
            this.service.betSignin(this.payload).subscribe(
              (res: any) => {
                localStorage.setItem('token', res.token);
                this.router.navigateByUrl('/dashboard');
              },
              (err) => {
                console.log(err);
              }
            );
          }, 1500);
        } else {
          alert(err.error.text);
        }
      }
    );
  }

  clearForm() {
    this.form.get('tel').setValue('+66');
    this.form.get('password').setValue('');
  }
}

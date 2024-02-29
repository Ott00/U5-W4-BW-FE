import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register(registerForm: NgForm) {
    try {
      this.authSrv.register(registerForm.value).subscribe();
    } catch (error: any) {
      alert(error);
      this.router.navigate(['/registration']);
    }
  }
}

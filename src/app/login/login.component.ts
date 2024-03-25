import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: FormGroup;

  @Input() userData: { name: string, mailid: string, password: string }[];

  ngOnInit(): void {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    this.loginData = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(passwordPattern)])
    });
  }

  loginForm(): void {
    if (!this.userData || this.userData.length === 0) {
      console.log('Error: No user data available');
      return;
    }

    if (this.loginData.valid) {
      const name = this.loginData.get('name').value;
      const password = this.loginData.get('password').value;

      let userFound = false;
      for (let i = 0; i < this.userData.length; i++) {
        const user = this.userData[i];
        if (user.name === name && user.password === password) {
          console.log('Login successful');
          userFound = true;
          break;
        }
      }
      if (!userFound) {
        console.log('Invalid email or password');
      }
    } else {
      console.log('Form is invalid');
    }
  }
}

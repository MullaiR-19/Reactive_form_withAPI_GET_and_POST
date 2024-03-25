import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAPIService } from '../user-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerData: FormGroup;
  //registeredUsers: { name: string, username: string, mailid: string, age: number, password: string }[] = [];
  registeredUsers: { name: string, mailid: string, password: string }[] = [];
  //@Output() registerCarrier: EventEmitter<{ name: string, username: string, mailid: string, age: number, password: string }[]> = new EventEmitter();
  @Output() registerCarrier: EventEmitter<{ name: string, mailid: string, password: string }[]> = new EventEmitter();
  ngOnInit() {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;
    const usernamePattern = /^(?=.*[0-9])[a-zA-Z0-9]+$/;

    this.registerData = new FormGroup({
      name: new FormControl("", [Validators.minLength(3)]),
      // username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern(usernamePattern)]),
      mailid: new FormControl("", [Validators.required, Validators.email]),
      // age: new FormControl(18, [Validators.min(18), Validators.max(65)]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(passwordPattern)])
    })
  }


  registerUser() {
    if (this.registerData.valid) {
      const data = this.registerData.value;
      this.registeredUsers.push(data);
      this.registerCarrier.emit(this.registeredUsers);
      console.log('Registration Successful');
      //console.log(data);
      this.registerData.reset();
      this.postData();
    } else {
      alert('Please check the fields');
    }
  }

  constructor(private apiService: UserAPIService) { }

  postData(): void {
    const data = { Name: 'Mullai', email: 'mullai@mail.com', password: "Mullai211" };

    this.apiService.postData(data).subscribe((responce: any) => {
      console.log(responce);
    });
  }
}
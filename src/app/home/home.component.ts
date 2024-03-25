import { Component, OnInit } from '@angular/core';
import { UserAPIService } from '../user-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  data: any;
  // registeredValues: { name: string, username: string, mailid: string, age: number, password: string }[];
  // onRegister(users: { name: string, username: string, mailid: string, age: number, password: string }[]) {
  //   this.registeredValues = users;
  //   console.log("data passing through home",users)
  // }
  registeredValues: { name: string, mailid: string, password: string }[];
  onRegister(users: { name: string, mailid: string, password: string }[]) {
    this.registeredValues = users;
    console.log("data passing through home", users)
  }
  constructor(private values: UserAPIService) {
    this.values.getData().subscribe(data => {
      //console.log(data);
      this.data = data;
    })
  }
}
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {UserInterface} from "../interfaces/user.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userList: Array<UserInterface>;
  userId: number;
  userObj;
  addUserForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, this.uniqueEmail]],
    phone: ['', [Validators.required, this.uniquePhone]]
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.userList = JSON.parse(localStorage.getItem('userList'));
  }

  addUser() {
    if (this.userList.length) {
      this.userId = Math.max(...this.userList.map(obj => obj.id)) + 1;
    } else {
      this.userId = 1;
    }
    this.userObj = {
      id: this.userId,
      name: this.addUserForm.value.name,
      email: this.addUserForm.value.email,
      phone: this.addUserForm.value.phone
    }
    this.userList.push(this.userObj);
    localStorage.setItem('userList', JSON.stringify(this.userList));
    this.router.navigate(['/']);
  }

  uniqueEmail(control: AbstractControl) {
    let userList = JSON.parse(localStorage.getItem('userList'));
    if (userList.find((u: any) => u.email === control.value)) {
      return {uniqueEmail: true};
    }
  }

  uniquePhone(control: AbstractControl) {
    let userList = JSON.parse(localStorage.getItem('userList'));
    if (userList.find((u: any) => u.phone === control.value)) {
      return {uniquePhone: true};
    }
  }
}

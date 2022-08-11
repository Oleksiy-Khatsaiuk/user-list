import {Component, OnInit} from '@angular/core';
import {UserInterface} from "../interfaces/user.interface";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: Array<UserInterface>;
  userObj: UserInterface;
  uniqueEmail = false;
  uniquePhone = false;
  editUserForm = this.fb.group({
    name: [''],
    email: [''],
    phone: ['']
  });

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('userList'));
    if (!this.users) {
      localStorage.setItem('userList', JSON.stringify([]));
    }
  }

  editUserModal(content, user) {
    this.userObj = user;
    if (user) {
      this.editUserForm.controls.email.valueChanges.subscribe(email => {
        if (email !== user.email && this.users.find((u: any) => u.email === email)) {
          return this.uniqueEmail = true;
        } else {
          return this.uniqueEmail = false;
        }
      });

      this.editUserForm.controls.phone.valueChanges.subscribe(phone => {
        if (phone !== user.phone && this.users.find((u: any) => u.phone === phone)) {
          return this.uniquePhone = true;
        } else {
          return this.uniquePhone = false;
        }
      });
    }
    this.editUserForm.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone
    })
    this.modalService.open(content);
  }

  editUser() {
    this.users.splice(this.users.findIndex(u => u.id === this.userObj.id), 1);
    this.users.push({
      id: this.userObj.id,
      name: this.editUserForm.value.name,
      email: this.editUserForm.value.email,
      phone: this.editUserForm.value.phone
    });
    localStorage.setItem('userList', JSON.stringify(this.users));
  }

  deleteUser(userId) {
    this.users.splice(this.users.findIndex(u => u.id === userId), 1);
    localStorage.setItem('userList', JSON.stringify(this.users));
  }
}

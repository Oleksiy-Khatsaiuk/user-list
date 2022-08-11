import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {concatMap} from "rxjs";
import {UserInterface} from "../interfaces/user.interface";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userId: string;
  userList: Array<UserInterface>;
  user: UserInterface;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        concatMap(param => {
          this.userId = param.get('id');
          this.userList = JSON.parse(localStorage.getItem('userList')) || [];
          return this.userList.filter(u => u.id === +this.userId);
        })
      )
      .subscribe(user => this.user = user)
  }
}

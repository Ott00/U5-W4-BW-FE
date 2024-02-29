import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users!: any[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((response: any) => {
      this.users = response.content;
    });
  }
}

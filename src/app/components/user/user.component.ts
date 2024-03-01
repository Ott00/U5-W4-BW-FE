import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
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
    this.canActivate().subscribe((isAdmin) => {
      if (isAdmin) {
        console.log('User is admin');
      } else {
        window.alert('You do not have access');
      }
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((response: any) => {
      this.users = response.content;
    });
  }

  canActivate(): Observable<boolean> {
    return this.userService.isAdmin();
  }
}

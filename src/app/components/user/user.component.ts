import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthData } from 'src/app/auth/interfaces/auth-data';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserService } from 'src/app/auth/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users!: any[];
  userIsAdmin!: boolean;
  userLoggedIn!: AuthData | null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.canActivate().subscribe((isAdmin) => {
      if (isAdmin) {
        this.userIsAdmin = true;
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

  removeUser(id: string) {
    confirm('Are you sure?');
    this.userService.removeUser(id).subscribe(() => {
      this.getUsers();
    });
  }
}

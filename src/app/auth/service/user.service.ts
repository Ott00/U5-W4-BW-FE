import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4201/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
      // console.log(tokenParsed);
    }
    return this.http.get(this.apiUrl, { headers });
  }

  isAdmin(): Observable<boolean> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }

    return this.http.get<any>(`${this.apiUrl}/me`, { headers }).pipe(
      map((response) => {
        for (let i = 0; i < response.roles.length; i++) {
          const element = response.roles[i].role;
          if (element === 'ADMIN') {
            return element;
          } else return;
        }
      })
    );
  }

  removeUser(id: string) {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:4201/users/me'
  private apiUrl2 = 'http://localhost:4201/users/me/uploadAvatar'

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('user')
    let headers = new HttpHeaders();
    if(token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append("Authorization", `Bearer ${tokenParsed}`)
      console.log(tokenParsed)
    }
    return this.http.get(this.apiUrl, {headers})
  }
  
}

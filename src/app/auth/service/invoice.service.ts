import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = 'http://localhost:4201/invoices';
  private userUrl = 'http://localhost:4201/users';

  constructor(private http: HttpClient) {}
  getInvoices(): Observable<any> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
      console.log(tokenParsed);
    }
    return this.http.get(this.apiUrl, { headers });
  }

  getInvoiceById(invoiceId: string): Observable<any> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
      console.log(tokenParsed);
    }
    return this.http.get(`${this.apiUrl}/${invoiceId}`, { headers });
  }

  isAdmin(): Observable<boolean> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }
    return this.http.get<any>(`${this.userUrl}/me`, { headers }).pipe(
      map((response) => {
        return response.roles[0].role === 'ADMIN';
      })
    );
  }
}

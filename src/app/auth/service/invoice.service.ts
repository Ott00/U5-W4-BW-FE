import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { NewInvoice } from '../interfaces/new-invoice';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = 'http://localhost:4201/invoices';
  private userUrl = 'http://localhost:4201/users';

  constructor(private http: HttpClient) {}
  getInvoices(page: number, size: number): Observable<any> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
      console.log(tokenParsed);
    }
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`, {
      headers,
    });
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

  createInvoice(invoice: NewInvoice): Observable<any> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
      console.log(tokenParsed);
    }
    return this.http.post<any>(`${this.apiUrl}`, invoice, { headers });
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

import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/auth/service/invoice.service';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {
  response!: any[];
  invoices!: any[];

  constructor(
    private InvoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getInvoices();
    this.activatedRoute.paramMap.subscribe((params) => {
      const invoiceId = params.get('invoiceId');
      if (invoiceId) {
        this.getInvoiceById(invoiceId);
      }
    });
    this.canActivate().subscribe((isAdmin) => {
      if (isAdmin) {
        console.log('User is admin');
      } else {
        window.alert('You do not have access');
      }
    });
  }

  getInvoices(): void {
    this.InvoiceService.getInvoices().subscribe((response: any) => {
      this.invoices = response.content;
    });
  }

  getInvoiceById(invoiceId: string): void {
    this.InvoiceService.getInvoiceById(invoiceId).subscribe((response: any) => {
      this.response = [response];
    });
  }

  canActivate(): Observable<boolean> {
    return this.InvoiceService.isAdmin();
  }
}

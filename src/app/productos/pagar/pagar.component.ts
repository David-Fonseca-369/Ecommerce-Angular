import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css'],
})
export class PagarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    render({
      id: '#myPaypalButtons',
      currency: 'MXN',
      value: '220',

      onApprove: (details) => {
        alert('Transaction succesful');
        console.log(details);
      },
    });
  }
}

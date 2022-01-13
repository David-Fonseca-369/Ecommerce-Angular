import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { render } from 'creditcardpayments/creditCardPayments';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { ventaCreacionDTO } from 'src/app/services/venta';
import { VentasService } from 'src/app/services/ventas.service';
@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css'],
})
export class PagarComponent implements OnInit {
  constructor(
    private router: Router,
    private ventasService: VentasService,
    private seguridadService: SeguridadService
  ) {}

  cantidad: number;
  precio: number;
  idProducto: number;
  errores: string[] = [];

  ngOnInit(): void {
    this.cantidad = Number(sessionStorage.getItem('cantidad'));
    this.precio = Number(sessionStorage.getItem('precio'));
    this.idProducto = Number(sessionStorage.getItem('idProducto'));

    let total = this.cantidad * this.precio;

    render({
      id: '#myPaypalButtons',
      currency: 'MXN',
      value: total.toFixed(2),

      onApprove: (details) => {
        this.crearVenta(details);
      },
    });
  }

  crearVenta(details: any) {
    let venta: ventaCreacionDTO = {
      idUsuario: Number(this.seguridadService.obtenerCampoJWT('idUsuario')),
      idTransaccion: details.purchase_units[0].payments.captures[0].id,
      importe: Number((this.cantidad * this.precio).toFixed(2)),
      titular: details.payer.name.given_name + ' ' + details.payer.name.surname,
      detalles: [
        {
          idProducto: this.idProducto,
          cantidad: this.cantidad,
          precio: this.precio,
        },
      ],
    };

    this.ventasService.crear(venta).subscribe(
      (idVenta) => {
        sessionStorage.setItem('idVenta', idVenta.toString());
        this.router.navigate(['/pago-realizado']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}

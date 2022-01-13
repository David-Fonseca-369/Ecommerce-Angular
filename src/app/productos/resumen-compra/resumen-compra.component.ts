import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumen-compra',
  templateUrl: './resumen-compra.component.html',
  styleUrls: ['./resumen-compra.component.css'],
})
export class ResumenCompraComponent implements OnInit {
  constructor() {}

  cantidad: number;
  precio: number;
  idProducto: number;

  ngOnInit(): void {
    this.cantidad = Number(sessionStorage.getItem('cantidad'));
    this.precio = Number(sessionStorage.getItem('precio'));
    this.idProducto = Number(sessionStorage.getItem('idProducto'));
  }
}

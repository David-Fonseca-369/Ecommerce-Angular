import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { ventaDTO } from 'src/app/services/venta';
import { VentasService } from 'src/app/services/ventas.service';
import { ComprobanteComponent } from '../comprobante/comprobante.component';

@Component({
  selector: 'app-indice-compras',
  templateUrl: './indice-compras.component.html',
  styleUrls: ['./indice-compras.component.css'],
})
export class IndiceComprasComponent implements OnInit {
  ventas: ventaDTO[];
  errores: string[] = [];
  isLoading = false;
  columnasAMostrar = [
    'opciones',
    'idTransaccion',
    'estatusPago',
    'importe',
    'fecha',
    'titular',
    'estado',
  ];

  //Paginación
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;
  constructor(
    private ventasService: VentasService,
    private seguridadService: SeguridadService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarRegistrosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  cargarRegistrosPaginacion(pagina: number, cantidadElementosAMostrar) {
    this.isLoading = true;

    let id = Number(this.seguridadService.obtenerCampoJWT('idUsuario'));
    this.ventasService
      .obtenerPaginadoCompras(pagina, cantidadElementosAMostrar, id)
      .subscribe(
        (respuesta: HttpResponse<ventaDTO[]>) => {
          this.ventas = respuesta.body;

          this.cantidadTotalRegistros = respuesta.headers.get(
            'cantidadTotalRegistros'
          );
          this.isLoading = false;
        },
        (error) => {
          this.errores = parsearErroresAPI(error);
          this.isLoading = false;
        }
      );
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;

    this.cargarRegistrosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  openDialog(idVenta: number) {
    sessionStorage.setItem('idVenta', idVenta.toString());

    const dialogRef = this.dialog.open(ComprobanteComponent);
  }
}

import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ComprobanteComponent } from 'src/app/clientes/comprobante/comprobante.component';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { ventaDTO } from 'src/app/services/venta';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-indice-ventas',
  templateUrl: './indice-ventas.component.html',
  styleUrls: ['./indice-ventas.component.css'],
})
export class IndiceVentasComponent implements OnInit {
  ventas: ventaDTO[];
  errores: string[] = [];
  isLoading = false;
  columnasAMostrar = [
    'opciones',
    'nombreUsuario',
    'correoUsuario',
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

    this.ventasService
      .obtenerPaginadoVentas(pagina, cantidadElementosAMostrar)
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

  entregar(idVenta: number) {
    this.ventasService.entregar(idVenta).subscribe(
      () => {
        MensajeExistoso('¡Actualizado!');
        this.cargarRegistrosPaginacion(
          this.paginaActual,
          this.cantidadRegistrosAMostrar
        );
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}

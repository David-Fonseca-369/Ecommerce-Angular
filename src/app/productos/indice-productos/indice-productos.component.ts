import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import Swal from 'sweetalert2';
import { productoDTO } from '../producto';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-indice-productos',
  templateUrl: './indice-productos.component.html',
  styleUrls: ['./indice-productos.component.css'],
})
export class IndiceProductosComponent implements OnInit {
  constructor(private productosService: ProductosService) {}

  productos: productoDTO[];

  columnasAMostrar = [
    'opciones',
    'portada',
    'nombre',
    'categoria',
    'codigo',
    'precioVenta',
    'stock',
    'vendidos',
    'estado',
  ];
  //Paginación
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;
  isLoading = false;
  errores: string[] = [];

  ngOnInit(): void {
    this.cargarRegistrosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  cargarRegistrosPaginacion(pagina: number, cantidadElementosAMostrar) {
    this.isLoading = true;
    this.productosService
      .obtenerPaginacion(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<productoDTO[]>) => {
          this.productos = respuesta.body;

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

  activar(producto: productoDTO) {
    Swal.fire({
      title: `Activar ${producto.nombre}`,
      text: '¿Seguro que deseas activarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosService.activar(producto.idProducto).subscribe(
          () => {
            MensajeExistoso(`¡${producto.nombre} activado!`);
            this.cargarRegistrosPaginacion(
              this.paginaActual,
              this.cantidadRegistrosAMostrar
            );
          },
          (error) => console.log(error)
        );
      }
    });
  }

  desactivar(producto: productoDTO) {
    Swal.fire({
      title: `Desactivar ${producto.nombre}`,
      text: '¿Seguro que deseas desactivarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosService.desactivar(producto.idProducto).subscribe(
          () => {
            MensajeExistoso(`¡${producto.nombre} desactivado!`);
            this.cargarRegistrosPaginacion(
              this.paginaActual,
              this.cantidadRegistrosAMostrar
            );
          },
          (error) => console.log(error)
        );
      }
    });
  }
}

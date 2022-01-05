import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import Swal from 'sweetalert2';
import { categoriaDTO } from '../categoria';
import { CategoriasService } from '../categorias.service';

@Component({
  selector: 'app-indice-categorias',
  templateUrl: './indice-categorias.component.html',
  styleUrls: ['./indice-categorias.component.css'],
})
export class IndiceCategoriasComponent implements OnInit {
  constructor(private categoriasService: CategoriasService) {}
  columnasAMostrar = ['opciones', 'nombre', 'estado'];
  categorias: categoriaDTO[];

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
    this.categoriasService
      .obtenerPaginado(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<categoriaDTO[]>) => {
          this.categorias = respuesta.body;

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

  activar(categoria: categoriaDTO) {
    Swal.fire({
      title: `Activar ${categoria.nombre}`,
      text: '¿Seguro que deseas activarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriasService.activar(categoria.idCategoria).subscribe(
          () => {
            MensajeExistoso(`¡${categoria.nombre} activado!`);
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

  desactivar(categoria: categoriaDTO) {
    Swal.fire({
      title: `Desactivar ${categoria.nombre}`,
      text: '¿Seguro que deseas desactivarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriasService.desactivar(categoria.idCategoria).subscribe(
          () => {
            MensajeExistoso(`¡${categoria.nombre} desactivado!`);
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

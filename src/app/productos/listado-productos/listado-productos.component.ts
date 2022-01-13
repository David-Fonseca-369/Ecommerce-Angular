import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { productDTO } from 'src/app/models/product';
import { productoCardDTO } from '../producto';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css'],
})
export class ListadoProductosComponent implements OnInit {
  productos: productoCardDTO[];
  //Paginación
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 20;
  isLoading = false;
  errores: string[] = [];

  form: FormGroup;

  formularioOriginal = {
    nombre: '',
  };

  @Input()
  busqueda: string;

  imagesForSlider = [
    {
      path: './assets/images/maqu.jpg',
    },
    {
      path: './assets/images/maqui.jpg',
    },
    {
      path: './assets/images/maquillaje.png',
    },
  ];

  constructor(
    private productosService: ProductosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cargarRegistrosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );

    this.form.valueChanges.subscribe((valores) => {
      this.buscarProductos(valores);
    });
  }

  cargarRegistrosPaginacion(pagina: number, cantidadElementosAMostrar) {
    this.isLoading = true;
    this.productosService
      .cardsPaginacion(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<productoCardDTO[]>) => {
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

  buscarProductos(valores: any) {
    this.isLoading = true;
    valores.pagina = this.paginaActual;
    valores.recordsPorPagina = this.cantidadRegistrosAMostrar;

    this.productosService.filtrarCards(valores).subscribe((response) => {
      this.cantidadTotalRegistros = response.headers.get(
        'cantidadTotalRegistros'
      );
      this.isLoading = false;
    });
  }
}

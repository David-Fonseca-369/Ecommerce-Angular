import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { parsearErroresAPI } from '../helpers/helpers';
import { productoCardDTO } from '../productos/producto';
import { ProductosService } from '../productos/productos.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [
    'Labial Rosa',
    'Maquillaje pintura',
    'Base de maquillaje',
  ];
  filteredOptions: Observable<string[]>;

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
    this.form = this.formBuilder.group(this.formularioOriginal);

    this.form.valueChanges.subscribe((valores) => {
      this.buscarProductos(valores);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
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
      this.productos = response.body;
      this.cantidadTotalRegistros = response.headers.get(
        'cantidadTotalRegistros'
      );
      this.isLoading = false;
    });
  }
}

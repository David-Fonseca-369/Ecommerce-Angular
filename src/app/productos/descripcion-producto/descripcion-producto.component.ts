import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { productoDescripcionDTO } from '../producto';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-descripcion-producto',
  templateUrl: './descripcion-producto.component.html',
  styleUrls: ['./descripcion-producto.component.css'],
})
export class DescripcionProductoComponent implements OnInit {
  constructor(
    private productosService: ProductosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public seguridadService: SeguridadService
  ) {}

  rutaImagenPortada = null;

  isLoading = false;
  errores: string[] = [];
  producto: productoDescripcionDTO;
  cantidad: number = 1;

  urlWhatsapp = 'https://api.whatsapp.com/send?phone=7121123493&text=';
  mensaje = 'Hola, ¿Puede darme información?, por favor.';
  // urlWhatsapp = "https://api.whatsapp.com/send?phone=7121123493&text=Hola,%20¿Puede%20darme%20información?,%20por%20favor"
  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto() {
    this.activatedRoute.params.subscribe((params) => {
      this.isLoading = true;

      this.productosService.productoDescripcion(params.id).subscribe(
        (producto) => {
          this.producto = producto;
          this.rutaImagenPortada = producto.portada;
          this.isLoading = false;
          this.cantidad = 1;
          window.scrollTo(0, 0);
        },
        (error) => {
          this.errores = parsearErroresAPI(error);
          this.isLoading = false;
        }
      );
    });
  }

  seleccionaImagen(rutaImagen: string) {
    this.rutaImagenPortada = rutaImagen;
  }
  sumar() {
    if (this.cantidad < this.producto.stock) {
      this.cantidad++;
    }
  }
  restar() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  resumenCompra() {
    if (this.seguridadService.estaLogueado()) {
      sessionStorage.setItem('cantidad', this.cantidad.toString());
      sessionStorage.setItem('idProducto', this.producto.idProducto.toString());
      sessionStorage.setItem('precio', this.producto.precioVenta.toString());
      this.router.navigate(['/productos/resumen-compra']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}

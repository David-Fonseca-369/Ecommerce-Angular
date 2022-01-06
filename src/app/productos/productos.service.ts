import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { productDTO } from '../models/product';
import { productoCreacionDTO, productoDTO } from './producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'productos';

  public obtenerPaginacion(pagina: number, cantidadRegistrosAMostrar: number) {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<productoDTO[]>(this.apiURL + '/todosPaginacion', {
      observe: 'response',
      params,
    });
  }

  public desactivar(id: number) {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }
  public activar(id: number) {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }

  public crear(producto: productoCreacionDTO) {
    const formData = this.construirFormulario(producto);

    return this.http.post(`${this.apiURL}/crear`, formData);
  }

  private construirFormulario(producto: productoCreacionDTO): FormData {
    const formData = new FormData();

    formData.append('idCategoria', String(producto.idCategoria));
    formData.append('nombre', String(producto.nombre));
    formData.append('codigo', producto.codigo);
    formData.append('precioVenta', String(producto.precioVenta));
    formData.append('stock', String(producto.stock));

    if (producto.descripcion) {
      formData.append('descripcion', producto.descripcion);
    }
    //
    if (producto.imagenes) {
      producto.imagenes.forEach((element) => {
        formData.append('imagenes', element);
      });
    }
    return formData;
  }
}

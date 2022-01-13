import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { productDTO } from '../models/product';
import {
  imagenProductoDTO,
  productoCardDTO,
  productoCreacionDTO,
  productoDescripcionDTO,
  productoDTO,
  productoEditarDTO,
  productoVerDTO,
} from './producto';

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

  public filtrarCards(valores: any): Observable<any> {
    let params = new HttpParams({ fromObject: valores });

    return this.http.get<productoDTO[]>(this.apiURL + '/cardsFiltrar', {
      observe: 'response',
      params,
    });
  }

  public cardsPaginacion(pagina: number, cantidadRegistrosAMostrar: number) {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<productoCardDTO[]>(this.apiURL + '/cardsPaginacion', {
      observe: 'response',
      params,
    });
  }

  public productoDescripcion(id: number): Observable<productoDescripcionDTO> {
    return this.http.get<productoDescripcionDTO>(
      `${this.apiURL}/descripcion/${id}`
    );
  }

  public imagenesProducto(idProducto: number): Observable<imagenProductoDTO[]> {
    return this.http.get<imagenProductoDTO[]>(
      `${this.apiURL}/imagenesProducto/${idProducto}`
    );
  }

  public eliminarImagen(idImagen: number) {
    return this.http.delete(`${this.apiURL}/eliminarImagen/${idImagen}`);
  }
  public getProducto(id: number): Observable<productoVerDTO> {
    return this.http.get<productoVerDTO>(`${this.apiURL}/producto/${id}`);
  }

  public desactivar(id: number) {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }

  public editar(id: number, producto: productoEditarDTO) {
    const formData = this.construirFormularioEditar(producto);
    return this.http.put(`${this.apiURL}/editar/${id}`, formData);
  }
  public activar(id: number) {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }

  public crear(producto: productoCreacionDTO) {
    const formData = this.construirFormulario(producto);

    return this.http.post(`${this.apiURL}/crear`, formData);
  }

  public agregarImagen(idProducto: number, imagenes: File[]) {
    const formData = new FormData();

    if (imagenes) {
      imagenes.forEach((element) => {
        formData.append('imagenes', element);
      });
    }

    return this.http.post(
      `${this.apiURL}/agregarImagen/${idProducto}`,
      formData
    );
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

    if (producto.portada) {
      formData.append('portada', producto.portada);
    }

    //
    if (producto.imagenes) {
      producto.imagenes.forEach((element) => {
        formData.append('imagenes', element);
      });
    }
    return formData;
  }

  private construirFormularioEditar(producto: productoEditarDTO): FormData {
    const formData = new FormData();

    formData.append('idCategoria', String(producto.idCategoria));
    formData.append('nombre', String(producto.nombre));
    formData.append('codigo', producto.codigo);
    formData.append('precioVenta', String(producto.precioVenta));
    formData.append('stock', String(producto.stock));

    if (producto.descripcion) {
      formData.append('descripcion', producto.descripcion);
    }

    if (producto.portada) {
      formData.append('portada', producto.portada);
    }

    return formData;
  }
}

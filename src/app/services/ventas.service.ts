import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ventaCreacionDTO, ventaDTO } from './venta';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'ventas';

  public crear(venta: ventaCreacionDTO): Observable<number> {
    return this.http.post<number>(`${this.apiURL}/crear`, venta);
  }

  public obtenerComprobante(id: number): Observable<ventaDTO> {
    return this.http.get<ventaDTO>(`${this.apiURL}/comprobante/${id}`);
  }

  public obtenerPaginadoCompras(
    pagina: number,
    cantidadRegistrosAMostrar: number,
    idUsuario: number
  ) {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<ventaDTO[]>(this.apiURL + '/compras/' + idUsuario, {
      observe: 'response',
      params,
    });
  }

  public obtenerPaginadoVentas(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ) {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<ventaDTO[]>(this.apiURL + '/ventasPaginacion', {
      observe: 'response',
      params,
    });
  }

  public entregar(idVenta: number) {
    return this.http.put(`${this.apiURL}/entregar/${idVenta}`, null);
  }
}

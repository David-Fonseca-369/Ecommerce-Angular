import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { categoriaCreacionDTO, categoriaDTO } from './categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'categorias';

  public obtenerPaginado(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<categoriaDTO[]>(this.apiURL + '/todasPaginacion', {
      observe: 'response',
      params,
    });
  }

  public obtenerTodos() {
    return this.http.get<categoriaDTO[]>(`${this.apiURL}/todas`);
  }
  public obtenerPorId(id: number): Observable<categoriaDTO> {
    return this.http.get<categoriaDTO>(`${this.apiURL}/${id}`);
  }

  public crear(categoria: categoriaCreacionDTO) {
    return this.http.post(this.apiURL + '/crear', categoria);
  }

  public editar(id: number, categoria: categoriaCreacionDTO) {
    return this.http.put(`${this.apiURL}/editar/${id}`, categoria);
  }

  public activar(id: number) {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }
  public desactivar(id: number) {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }
}

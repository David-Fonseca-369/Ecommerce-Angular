import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { respuestaAutenticacionDTO } from '../seguridad/seguridad';
import { clienteCreacionDTO, usuarioCreacionDTO, usuarioDTO } from './usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}
  private apiURL = environment.apiURL + 'usuarios';

  public obtenerPaginadoUsuarios(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ) {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<usuarioDTO[]>(this.apiURL + '/usuariosPaginacion', {
      observe: 'response',
      params,
    });
  }

  public obtenerPaginadoClientes(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ) {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<usuarioDTO[]>(this.apiURL + '/clientesPaginacion', {
      observe: 'response',
      params,
    });
  }

  public activar(id: number) {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }
  public obtenerPorId(id: number): Observable<usuarioDTO> {
    return this.http.get<usuarioDTO>(`${this.apiURL}/${id}`);
  }

  public crearUsuario(usuario: usuarioCreacionDTO) {
    return this.http.post(this.apiURL + '/crearUsuario', usuario);
  }

  public crearCliente(
    cliente: clienteCreacionDTO
  ): Observable<respuestaAutenticacionDTO> {
    return this.http.post<respuestaAutenticacionDTO>(
      this.apiURL + '/crearCliente',
      cliente
    );
  }
  public editar(id: number, usuario: usuarioCreacionDTO) {
    return this.http.put(`${this.apiURL}/editar/${id}`, usuario);
  }

  public desactivar(id: number) {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }
}

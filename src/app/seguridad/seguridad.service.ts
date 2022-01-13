import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { loginDTO, respuestaAutenticacionDTO } from './seguridad';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  apiURL = environment.apiURL + 'usuarios';

  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly campoRol = 'rol';
  private readonly llaveNombre = 'nombre';

  login(loginUsuario: loginDTO): Observable<respuestaAutenticacionDTO> {
    return this.httpClient.post<respuestaAutenticacionDTO>(
      this.apiURL + '/login',
      loginUsuario
    );
  }

  guardarToken(respuestaAutenticacion: respuestaAutenticacionDTO) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(
      this.llaveExpiracion,
      respuestaAutenticacion.expiracion.toString()
    );
    localStorage.setItem(this.llaveNombre, respuestaAutenticacion.nombre);
  }

  obtenerToken() {
    return localStorage.getItem(this.llaveToken);
  }

  obtenerRol(): string {
    return this.obtenerCampoJWT(this.campoRol);
  }

  public obtenerCampoJWT(campo: string): string {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return '';
    }

    var dataToken = JSON.parse(atob(token.split('.')[1])); //se divide en 3, y el 1 es el de la data.

    return dataToken[campo];
  }

  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
    this.router.navigate(['']);
  }

  public estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken); //traigo el token del localStorage.

    if (!token) {
      return false; //si no hay token no está logeado
    }

    const expiracion = localStorage.getItem(this.llaveExpiracion); //si hay token, entonces traigo la expiración.
    const expiracionFecha = new Date(expiracion); //convierto la expoeracion a fecha

    if (expiracionFecha <= new Date()) {
      //verifico que aun este vigente
      //Si ya pasó la expiración del token, hago un logout
      this.logout();
      return false;
    }

    return true; //el token sigue vigente
  }

  cerrarSesion() {
    Swal.fire({
      title: `Cerrar Sesión`,
      text: '¿Estás seguro de que quieres cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
      }
    });
  }
}

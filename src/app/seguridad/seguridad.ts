export interface loginDTO {
  correo: string;
  password: string;
}

export interface respuestaAutenticacionDTO {
  nombre: string;
  token: string;
  expiracion: Date;
}

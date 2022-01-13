export interface usuarioDTO {
  idUsuario: number;
  idRol: number;
  nombre: string;
  correo: string;
  estado: boolean;
}

export interface usuarioCreacionDTO {
  idRol: number;
  nombre: string;
  correo: string;
  password: string;
}

export interface clienteCreacionDTO {
  nombre: string;
  correo: string;
  password: string;
}

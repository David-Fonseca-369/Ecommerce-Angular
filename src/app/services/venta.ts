export interface ventaCreacionDTO {
  idUsuario: number;
  idTransaccion: string;
  importe: number;
  titular: string;

  detalles: detalleCreacionDTO[];
}

export interface detalleCreacionDTO {
  idProducto: number;
  cantidad: number;
  precio: number;
}

export interface ventaDTO {
  idCabecera: number;
  idUsuario: number;
  nombreUsuario: string;
  correoUsuario: string;
  idTransaccion: number;
  estatusPago: string;
  importe: number;
  fecha: Date;
  titular: string;
  estado: boolean;
  detalles: detalleDTO[];
}

export interface detalleDTO {
  idDetalle: number;
  idCabecera: number;
  idProducto: number;
  nombreProducto: string;
  cantidad: number;
  precio: number;
}

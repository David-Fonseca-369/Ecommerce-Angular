export interface productoCreacionDTO {
  idCategoria: number;
  nombre: string;
  codigo: string;
  precioVenta: number;
  stock: number;
  descripcion: string;
  portada: File;
  imagenes: File[];
}

export interface productoDTO {
  idProducto: number;
  nombre: string;
  idCategoria: number;
  nombreCategoria: string;
  codigo: string;
  precioVenta: number;
  stock: number;
  vendidos: number;
  portada: string;
  estado: boolean;
}

export interface productoCardDTO {
  idProducto: number;
  nombre: string;
  precioVenta: number;
  vendidos: number;
  portada: string;
}

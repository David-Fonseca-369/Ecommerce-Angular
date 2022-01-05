export interface productoCreacionDTO {
  idCategoria: number;
  nombre: string;
  codigo: string;
  precioVenta: number;
  stock: number;
  descripcion: string;
  imagenes: File[];
}

export interface productoDTO {
  idCategoria: number;
  nombre: string;
  codigo: string;
  precioVenta: number;
  stock: number;
  vendidos: number;
}

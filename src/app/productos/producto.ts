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
  idProducto: number;
  nombre: string;
  idCategoria: number;
  nombreCategoria: string;
  codigo: string;
  precioVenta: number;
  stock: number;
  vendidos: number;
  estado: boolean;
}

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

export interface productoEditarDTO {
  idCategoria: number;
  nombre: string;
  codigo: string;
  precioVenta: number;
  stock: number;
  descripcion: string;
  portada: File;
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

export interface productoDescripcionDTO {
  idProducto: number;
  nombre: string;
  precioVenta: number;
  stock: number;
  vendidos: number;
  descripcion: string;
  portada: string;
  imagenes: string[];
}

export interface productoVerDTO {
  idProducto: number;
  nombre: string;
  idCategoria: number;
  codigo: string;
  precioVenta: number;
  stock: number;
  descripcion: string;
  portada: string;
  imagenes: imagenProductoDTO[];
}

export interface imagenProductoDTO {
  idImagen: number;
  nombre: string;
  ruta: string;
}

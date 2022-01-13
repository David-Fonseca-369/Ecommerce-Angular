import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCategoriaComponent } from './categorias/crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './categorias/editar-categoria/editar-categoria.component';
import { IndiceCategoriasComponent } from './categorias/indice-categorias/indice-categorias.component';
import { ComprobanteComponent } from './clientes/comprobante/comprobante.component';
import { IndiceComprasComponent } from './clientes/indice-compras/indice-compras.component';
import { PagoExitosoComponent } from './clientes/pago-exitoso/pago-exitoso.component';
import { RegistrarseComponent } from './clientes/registrarse/registrarse.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { DescripcionProductoComponent } from './productos/descripcion-producto/descripcion-producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { IndiceProductosComponent } from './productos/indice-productos/indice-productos.component';
import { IndiceVentasComponent } from './productos/indice-ventas/indice-ventas.component';
import { PagarComponent } from './productos/pagar/pagar.component';
import { ResumenCompraComponent } from './productos/resumen-compra/resumen-compra.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { IndiceClientesComponent } from './usuarios/indice-clientes/indice-clientes.component';
import { IndiceUsuariosComponent } from './usuarios/indice-usuarios/indice-usuarios.component';

const routes: Routes = [
  //Administrador
  { path: 'categorias', component: IndiceCategoriasComponent },
  { path: 'categorias/crear', component: CrearCategoriaComponent },
  { path: 'categorias/editar/:id', component: EditarCategoriaComponent },

  { path: 'clientes', component: IndiceClientesComponent },

  { path: 'usuarios', component: IndiceUsuariosComponent },
  { path: 'usuarios/crear', component: CrearUsuarioComponent },
  { path: 'usuarios/editar/:id', component: EditarUsuarioComponent },

  { path: 'productos', component: IndiceProductosComponent },
  { path: 'productos/crear', component: CrearProductoComponent },
  { path: 'productos/editar/:id', component: EditarProductoComponent },
  { path: 'ventas', component: IndiceVentasComponent },

  //Clientes -libre
  { path: 'registrarse', component: RegistrarseComponent },

  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'productos/descripcion/:id',
    component: DescripcionProductoComponent,
  },

  //Clientes logeado
  {
    path: 'productos/resumen-compra',
    component: ResumenCompraComponent,
  },
  {
    path: 'productos/pagar',
    component: PagarComponent,
  },

  { path: 'pago-realizado', component: PagoExitosoComponent },
  { path: 'compras', component: IndiceComprasComponent },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

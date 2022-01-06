import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCategoriaComponent } from './categorias/crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './categorias/editar-categoria/editar-categoria.component';
import { IndiceCategoriasComponent } from './categorias/indice-categorias/indice-categorias.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { IndiceProductosComponent } from './productos/indice-productos/indice-productos.component';

const routes: Routes = [
  //Administrador
  { path: 'categorias', component: IndiceCategoriasComponent },
  { path: 'categorias/crear', component: CrearCategoriaComponent },
  { path: 'categorias/editar/:id', component: EditarCategoriaComponent },

  { path: 'productos', component: IndiceProductosComponent },
  { path: 'productos/crear', component: CrearProductoComponent },
  //

  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'productDescription', component: ProductDetailsComponent },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

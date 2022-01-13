import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Para formularios reactivos
//Binding de doble vía 'FormsModule'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Http client
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Sweet alert 2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//Dropzone
import { NgxDropzoneModule } from 'ngx-dropzone';

//Markdown
import { MarkdownModule } from 'ngx-markdown';

//Importo MaterialModule
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

//Carousel
import { IvyCarouselModule } from 'angular-responsive-carousel';

import { FooterComponent } from './footer/footer.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { IndiceCategoriasComponent } from './categorias/indice-categorias/indice-categorias.component';
import { FormularioCategoriaComponent } from './categorias/formulario-categoria/formulario-categoria.component';
import { MostrarErroresComponent } from './helpers/mostrar-errores/mostrar-errores.component';
import { SpinnerComponent } from './helpers/spinner/spinner.component';
import { CrearCategoriaComponent } from './categorias/crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './categorias/editar-categoria/editar-categoria.component';
import { IndiceProductosComponent } from './productos/indice-productos/indice-productos.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { InputMarkdownComponent } from './helpers/input-markdown/input-markdown.component';
import { ListadoProductosComponent } from './productos/listado-productos/listado-productos.component';
import { InputImgComponent } from './helpers/input-img/input-img.component';
import { DescripcionProductoComponent } from './productos/descripcion-producto/descripcion-producto.component';
import { ResumenCompraComponent } from './productos/resumen-compra/resumen-compra.component';
import { PagarComponent } from './productos/pagar/pagar.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { RegistrarseComponent } from './clientes/registrarse/registrarse.component';
import { AutorizadoComponent } from './seguridad/autorizado/autorizado.component';
import { IndiceUsuariosComponent } from './usuarios/indice-usuarios/indice-usuarios.component';
import { FormularioUsuarioComponent } from './usuarios/formulario-usuario/formulario-usuario.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { PagoExitosoComponent } from './clientes/pago-exitoso/pago-exitoso.component';
import { ComprobanteComponent } from './clientes/comprobante/comprobante.component';
import { IndiceComprasComponent } from './clientes/indice-compras/indice-compras.component';
import { IndiceVentasComponent } from './productos/indice-ventas/indice-ventas.component';
import { IndiceClientesComponent } from './usuarios/indice-clientes/indice-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    LandingPageComponent,
    FooterComponent,
    ProductDetailsComponent,
    IndiceCategoriasComponent,
    FormularioCategoriaComponent,
    MostrarErroresComponent,
    SpinnerComponent,
    CrearCategoriaComponent,
    EditarCategoriaComponent,
    IndiceProductosComponent,
    CrearProductoComponent,
    InputMarkdownComponent,
    ListadoProductosComponent,
    InputImgComponent,
    DescripcionProductoComponent,
    ResumenCompraComponent,
    PagarComponent,
    EditarProductoComponent,
    RegistrarseComponent,
    AutorizadoComponent,
    IndiceUsuariosComponent,
    FormularioUsuarioComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    PagoExitosoComponent,
    ComprobanteComponent,
    IndiceComprasComponent,
    IndiceVentasComponent,
    IndiceClientesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    IvyCarouselModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module,
    NgxDropzoneModule,
    MarkdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

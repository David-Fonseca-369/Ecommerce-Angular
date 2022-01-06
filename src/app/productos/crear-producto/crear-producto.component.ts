import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { categoriaDTO } from 'src/app/categorias/categoria';
import { CategoriasService } from 'src/app/categorias/categorias.service';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent implements OnInit {
  constructor(
    private categoriasService: CategoriasService,
    private productosService: ProductosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  form: FormGroup;
  categorias: categoriaDTO[];
  errores: string[] = [];
  isLoading = false;

  files: File[] = [];

  ngOnInit(): void {
    this.obtenerCategorias();
    this.cargarFormulario();
  }

  obtenerCategorias() {
    this.isLoading = true;
    this.categoriasService.obtenerTodos().subscribe(
      (categorias) => {
        this.categorias = categorias;
        this.isLoading = false;
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
      }
    );
  }

  cargarFormulario() {
    this.form = this.formBuilder.group({
      idCategoria: ['', { validators: [Validators.required] }],
      nombre: ['', { validators: [Validators.required] }],
      codigo: ['', { validators: [Validators.required] }],
      precioVenta: ['', { validators: [Validators.required] }],
      stock: ['', { validators: [Validators.required] }],
      descripcion: '',
      imagenes: [],
    });
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  cambioMarkdown(texto: String) {
    //En caso de quererlo agregar al formulario para validacion.
    this.form.get('descripcion').setValue(texto);
  }

  crearProducto() {
    this.cargarImagenesFormulario();

    this.productosService.crear(this.form.value).subscribe(() => {
      MensajeExistoso('¡Producto Creado!');
      this.router.navigate(['/productos']);
    });
  }

  cargarImagenesFormulario() {
    if (this.files.length > 0) {
      this.form.get('imagenes').setValue(this.files);
    }
  }
}

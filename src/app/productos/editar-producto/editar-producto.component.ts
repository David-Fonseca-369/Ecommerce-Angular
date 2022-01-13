import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { categoriaDTO } from 'src/app/categorias/categoria';
import { CategoriasService } from 'src/app/categorias/categorias.service';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import Swal from 'sweetalert2';
import { imagenProductoDTO, productoVerDTO } from '../producto';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
})
export class EditarProductoComponent implements OnInit {
  constructor(
    private categoriasService: CategoriasService,
    private productosService: ProductosService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  form: FormGroup;
  categorias: categoriaDTO[];
  errores: string[] = [];
  isLoading = false;

  files: File[] = [];
  producto: productoVerDTO;
  columnasAMostrar = ['opciones', 'imagen', 'nombre'];
  idProducto: number;
  imagenCambiada = false;
  imagenesProducto: imagenProductoDTO[];

  ngOnInit(): void {
    this.obtenerCategorias();
    this.cargarFormulario();
    this.obtenerProducto();
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

  obtenerProducto() {
    this.activatedRoute.params.subscribe((params) => {
      this.isLoading = true;

      this.productosService.getProducto(params.id).subscribe(
        (producto) => {
          this.producto = producto;
          this.form.patchValue(producto);
          this.idProducto = producto.idProducto;
          this.imagenesProducto = producto.imagenes;
          this.isLoading = false;
        },
        (error) => {
          this.errores = parsearErroresAPI(error);
          this.isLoading = false;
        }
      );
    });
  }
  cargarFormulario() {
    this.form = this.formBuilder.group({
      idCategoria: ['', { validators: [Validators.required] }],
      nombre: ['', { validators: [Validators.required] }],
      codigo: ['', { validators: [Validators.required] }],
      precioVenta: ['', { validators: [Validators.required] }],
      stock: ['', { validators: [Validators.required] }],
      descripcion: '',
      portada: '',
    });
  }

  obtenerImagenesProducto() {
    this.productosService.imagenesProducto(this.idProducto).subscribe(
      (imagenesProducto) => {
        this.imagenesProducto = imagenesProducto;
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
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

  editarProducto() {
    if (!this.imagenCambiada) {
      this.form.patchValue({ portada: null }); //Para que no se vaya como liga
    }

    //Limpio los archivos de imagenes que se empataron con el formulario
    this.form.patchValue({ imagenes: null });

    this.productosService.editar(this.idProducto, this.form.value).subscribe(
      () => {
        MensajeExistoso('¡Producto Actualizado!');
        this.router.navigate(['/productos']);
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
      }
    );
  }

  archivoSeleccionado(file) {
    //Agrego valor al campo foto
    this.form.get('portada').setValue(file);
    this.imagenCambiada = true;
  }
  eliminarImagen(id: number) {
    Swal.fire({
      title: `Eliminar imagen`,
      text: '¿Seguro que deseas eliminarla?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosService.eliminarImagen(id).subscribe(
          () => {
            MensajeExistoso('¡Imagen eliminada!');
            this.obtenerImagenesProducto();
          },
          (error) => (this.errores = parsearErroresAPI(error))
        );
      }
    });
  }

  agregarImagenes() {
    this.productosService.agregarImagen(this.idProducto, this.files).subscribe(
      () => {
        if (this.files.length == 1) {
          MensajeExistoso('¡Imagen agregada correctamente!');
        }
        if (this.files.length > 1) {
          MensajeExistoso('¡Imágenes agregadas correctamente!');
        }

        this.files = [];

        this.obtenerImagenesProducto();
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
      }
    );
  }
}

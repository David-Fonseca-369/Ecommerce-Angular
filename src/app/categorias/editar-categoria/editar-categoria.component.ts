import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { categoriaCreacionDTO, categoriaDTO } from '../categoria';
import { CategoriasService } from '../categorias.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css'],
})
export class EditarCategoriaComponent implements OnInit {
  constructor(
    private router: Router,
    private categoriaService: CategoriasService,
    private activatedRoute: ActivatedRoute
  ) {}

  modelo: categoriaDTO;
  errores: string[] = [];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.categoriaService.obtenerPorId(params.id).subscribe(
        (grupo) => {
          this.modelo = grupo;
        },
        () => this.router.navigate(['/categorias'])
      );
      //En caso de no encontrar el grupo, retornará un notfound, por lo que regresará a
      //grupos, es por ello que no se captura nigún error.
    });
  }

  guardarCambios(categoria: categoriaCreacionDTO) {
    console.log(categoria);

    this.categoriaService.editar(this.modelo.idCategoria, categoria).subscribe(
      () => {
        MensajeExistoso(`¡${categoria.nombre} actualizado!`);

        this.router.navigate(['/categorias']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}

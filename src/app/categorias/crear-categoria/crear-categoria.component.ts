import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { categoriaCreacionDTO } from '../categoria';
import { CategoriasService } from '../categorias.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css'],
})
export class CrearCategoriaComponent implements OnInit {
  errores: string[] = [];

  constructor(
    private router: Router,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {}

  guardar(categoria: categoriaCreacionDTO): void {
    this.categoriasService.crear(categoria).subscribe(
      () => {
        MensajeExistoso(`¡${categoria.nombre} se ha guardado correctamente!`);
        this.router.navigate(['/categorias']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}

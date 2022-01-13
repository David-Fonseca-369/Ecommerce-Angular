import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { usuarioCreacionDTO } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  constructor(
    private router: Router,
    private usuariosService: UsuariosService
  ) {}

  errores: string[] = [];

  ngOnInit(): void {}

  guardar(usuario: usuarioCreacionDTO): void {
    this.usuariosService.crearUsuario(usuario).subscribe(
      () => {
        MensajeExistoso(`¡${usuario.nombre} ha sido creado correctamente!`);
        this.router.navigate(['/usuarios']);
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
      }
    );
  }
}

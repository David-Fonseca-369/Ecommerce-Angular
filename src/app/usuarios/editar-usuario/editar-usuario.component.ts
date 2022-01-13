import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeExistoso, parsearErroresAPI } from 'src/app/helpers/helpers';
import { usuarioDTO } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  form: FormGroup;
  errores: string[] = [];
  roles = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Vendedor' },
  ];

  isLoading = false;

  usuario: usuarioDTO;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idRol: ['', { validators: [Validators.required] }],
      nombre: ['', { validators: [Validators.required] }],
      correo: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.minLength(8)] }],
    });

    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.usuariosService.obtenerPorId(params.id).subscribe(
        (usuario) => {
          this.usuario = usuario;
          this.form.patchValue(this.usuario);
        },
        () => this.router.navigate(['/usuarios'])
      );
      this.isLoading = false;
    });
  }

  editar() {
    this.usuariosService
      .editar(this.usuario.idUsuario, this.form.value)
      .subscribe(
        () => {
          MensajeExistoso('¡Actualizado!');
          this.router.navigate(['/usuarios']);
        },
        (error) => {
          this.errores = parsearErroresAPI(this.errores);
        }
      );
  }
}

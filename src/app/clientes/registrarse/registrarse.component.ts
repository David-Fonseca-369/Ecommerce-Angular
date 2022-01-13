import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css'],
})
export class RegistrarseComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private seguridadService: SeguridadService,
    private router: Router
  ) {}

  hide = true;
  form: FormGroup;
  errores: string[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', { validators: [Validators.required] }],
      correo: ['', { validators: [Validators.required, Validators.email] }],
      password: [
        '',
        { validators: [Validators.required, Validators.minLength(8)] },
      ],
    });
  }

  obtenerMensajeErrorCorreo() {
    var campo = this.form.get('correo');

    if (campo.hasError('required')) {
      return 'El campo Correo es requerido';
    }

    if (campo.hasError('email')) {
      return 'El correo no es válido';
    }

    return '';
  }

  crearCliente() {
    this.usuariosService.crearCliente(this.form.value).subscribe(
      (response) => {
        this.isLoading = false;
        this.seguridadService.guardarToken(response);

        this.router.navigate(['']);
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
      }
    );
  }
}

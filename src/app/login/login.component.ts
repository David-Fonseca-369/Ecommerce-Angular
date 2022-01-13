import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parsearErroresAPI } from '../helpers/helpers';
import { SeguridadService } from '../seguridad/seguridad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private seguridadService: SeguridadService,
    private router: Router
  ) {}

  form: FormGroup;
  errores: string[] = [];
  hide = true;
  isLoading = false;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
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

  login() {
    this.isLoading = true;
    this.seguridadService.login(this.form.value).subscribe(
      (response) => {
        this.isLoading = false;
        this.seguridadService.guardarToken(response);

        this.router.navigate(['']);
      },
      (errores) => {
        this.errores = parsearErroresAPI(errores);
        this.isLoading = false;
      }
    );
  }
}

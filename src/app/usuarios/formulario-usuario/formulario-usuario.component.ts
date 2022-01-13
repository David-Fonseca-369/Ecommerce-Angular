import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { usuarioCreacionDTO } from '../usuario';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css'],
})
export class FormularioUsuarioComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router) {}
  form: FormGroup;
  @Output()
  onSubmit: EventEmitter<usuarioCreacionDTO> = new EventEmitter<usuarioCreacionDTO>();

  @Input()
  errores: string[] = [];
  roles = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Vendedor' },
  ];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idRol: ['', { validators: [Validators.required] }],
      nombre: ['', { validators: [Validators.required] }],
      correo: ['', { validators: [Validators.required, Validators.email] }],
      password: [
        '',
        { validators: [Validators.required, Validators.minLength(8)] },
      ],
    });
  }
  guardar() {
    this.onSubmit.emit(this.form.value);
  }
}

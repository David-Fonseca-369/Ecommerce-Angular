import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { categoriaCreacionDTO } from '../categoria';

@Component({
  selector: 'app-formulario-categoria',
  templateUrl: './formulario-categoria.component.html',
  styleUrls: ['./formulario-categoria.component.css'],
})
export class FormularioCategoriaComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  @Output() //Para emitir el formulario al formulario padre.
  onSubmit: EventEmitter<categoriaCreacionDTO> = new EventEmitter<categoriaCreacionDTO>();

  @Input()
  errores: string[] = [];

  //Para editar
  @Input()
  modelo: categoriaCreacionDTO;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', { validators: [Validators.required] }],
      descripcion: '',
    });

    //si ya está definido o sea que se editará
    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo); //se encarga de machear las propiedades del
    }
  }

  guardar() {
    //envio el formulario
    this.onSubmit.emit(this.form.value);
  }
}

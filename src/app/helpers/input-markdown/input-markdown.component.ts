import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css'],
})
export class InputMarkdownComponent implements OnInit {
  constructor() {}

  @Input()
  contenidoMarkdown = '';
  //Lo emitimos al componente padre
  @Output()
  changeMarkdown: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {}

  inputTextArea(texto) {
    this.contenidoMarkdown = texto.value;
    this.changeMarkdown.emit(texto.value);
  }
}

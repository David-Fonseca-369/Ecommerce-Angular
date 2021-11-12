import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [
    'Labial Rosa',
    'Maquillaje pintura',
    'Base de maquillaje',
  ];
  filteredOptions: Observable<string[]>;

  productList = [
    {
      id: 1,
      name: 'Paleta de Sombras de ojos',
      image: './assets/images/sombras.jpg',
      price: 120,
      sales: 30,
    },
    {
      id: 5,
      name: 'Labial Liquido Morado',
      image: './assets/images/labial_liquido.jpg',
      price: 250,
      sales: 10,
    },
    {
      id: 5,
      name: 'Labial Dorado',
      image: './assets/images/labial_dorado.jpg',
      price: 45.99,
      sales: 12,
    },
    {
      id: 5,
      name: 'Labial Liquido Rosa',
      image: './assets/images/labial_rosa.jpg',
      price: 130,
      sales: 1,
    },
    {
      id: 5,
      name: 'Polvo',
      image: './assets/images/polvo.jpg',
      price: 200,
      sales: 12,
    },
  ];
  constructor() {}

  imagesForSlider = [
    {
      path: './assets/images/maqu.jpg',
    },
    {
      path: './assets/images/maqui.jpg',
    },
    {
      path: './assets/images/maquillaje.png',
    },
  ];

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}

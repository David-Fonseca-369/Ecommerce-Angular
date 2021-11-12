import { Component, Input, OnInit } from '@angular/core';
import { productDTO } from '../models/product';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css'],
})
export class ProductListingComponent implements OnInit {
  constructor() {}
  @Input()
  products: productDTO[];

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss'],
})
export class OthersComponent implements OnInit {
  color = 'yellow';
  text = 'Un texto';
  products: Product[] = [];

  constructor(private productsSrv: ProductsService) {}

  ngOnInit(): void {
    this.productsSrv.getAll().subscribe((items) => {
      this.products = items;
    });
  }
}

import { ItemComponent } from './../item/item.component';
import { ManufacturerService } from './../../../../services/manufacturer.service';
import { Manufacturer } from './../../../../model/manufacturer';
import { PproductService } from './../../../../services/pproduct.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { Pproduct } from 'src/app/model/pproduct';
import { delay } from 'rxjs/operators';
import { Image } from 'src/app/model/image';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  sub?: Subscription;
  model = {} as Product;
  product = {} as Product;
  imgs: Image[] = [];
  img = {} as Image;
  pproducts: Pproduct[] = [];
  manufacturers: Manufacturer[] = [];
  errorMessage: string = '';

  Hobbies: string[] = [
    'Acrobatics',
    'Acting',
    'Animation',
    'Astronomy',
    'Baking'
  ];

  constructor(private pproductService: PproductService,
              private manufacturerService: ManufacturerService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.manufacturerService.getAll().subscribe({
      next: manufacturers => {
        this.manufacturers = manufacturers;
        console.log(this.manufacturers);
      },
      error: err => this.errorMessage = err
    });

    this.sub = this.pproductService.getAll().subscribe({
      next: pproducts => {
        this.pproducts = pproducts;
        console.log(this.pproducts);
      },
      error: err => this.errorMessage = err
    });

    
  }

  onSubmit(form: { value: any; }) {

    this.img.pathPicture = form.value.images;
    this.img.id = 0;
    this.imgs.push(this.img);

    this.product.name= form.value.name;
    this.product.description= form.value.description;
    this.product.quantityProducts= form.value.quantityProducts;
    this.product.unitCost= form.value.unitCost;
    this.product.state= form.value.state;
    this.product.idPProductType= form.value.idPProductType;
    this.product.idManufacturer= form.value.idManufacturer;
    this.product.images= this.imgs;
    this.product.state= true;
    this.product.starRating= form.value.starRating;
    console.log(this.product);
    
     /*let product = {
      "description": "jojo",
      "idManufacturer": 4,
      "idPProductType": 5,
      "images": [
        {
          "pathPicture": "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"
        }
      ],
      "name": "test",
      "quantityProducts": 300,
      "starRating": 2.2,
      "state": true,
      "unitCost": 10
    };
    */
    //this.product.name = form.value.name;

    this.sub = this.productService.setProduct(this.product).subscribe({
      next: products => {
        console.log("*********");
        console.log(products);
      },
      error: err => this.errorMessage = err
    });
  }

}

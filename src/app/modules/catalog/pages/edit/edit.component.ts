import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { Image } from 'src/app/model/image';
import { Pproduct } from 'src/app/model/pproduct';
import { Manufacturer } from 'src/app/model/manufacturer';
import { PproductService } from 'src/app/services/pproduct.service';
import { ManufacturerService } from 'src/app/services/manufacturer.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
 
  constructor(private route: ActivatedRoute,
    private pproductService: PproductService,
    private manufacturerService: ManufacturerService,
    private productService: ProductService) { }
    id: String = '';
    product = {} as Product;
    sub?: Subscription;
    errorMessage: string = '';
    imgs: Image[] = [];
    img = {} as Image;
    pproducts: Pproduct[] = [];
    manufacturers: Manufacturer[] = [];

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        let id = params.get('id');
        this.id = (id == null)? '' : id;
      })

      this.sub = this.productService.getProduct(this.id).subscribe({
        next: product => {
        this.product = product;
        console.log(this.product);
      },
        error: err => this.errorMessage = err
      });

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
    
    this.sub = this.productService.setProduct(this.product).subscribe({
      next: products => {
        console.log("*********");
        console.log(products);
      },
      error: err => this.errorMessage = err
    });
  }

}

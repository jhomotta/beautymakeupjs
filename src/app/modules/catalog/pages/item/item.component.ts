import { Manufacturer } from './../../../../model/manufacturer';
import { Pproduct } from './../../../../model/pproduct';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { PproductService } from 'src/app/services/pproduct.service';
import { ManufacturerService } from 'src/app/services/manufacturer.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  
  constructor(private route: ActivatedRoute,
              private pproductService: PproductService,
              private manufacturerService: ManufacturerService,
              private prouctService: ProductService) { }
  id: String = '';
  product = {} as Product;
  sub?: Subscription;
  errorMessage: string = '';
  pproduct = {} as Pproduct;
  manufacturer = {} as Manufacturer;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.id = (id == null)? '' : id;
      console.log(this.id);
    });

    this.sub = this.prouctService.getProduct(this.id).subscribe({
      next: product => {
        this.product = product;
        console.log('Que onda wey');

        this.sub = this.manufacturerService.getItem(String(this.product.idManufacturer)).subscribe({
          next: manufacturers => {
            this.manufacturer = manufacturers;
            console.log(this.manufacturer);
          },
          error: err => this.errorMessage = err
        });
    
        this.sub = this.pproductService.getItem(String(this.product.idPProductType)).subscribe({
          next: pproducts => {
            this.pproduct = pproducts;
            console.log(this.pproduct);
          },
          error: err => this.errorMessage = err
        });
        
      },
      error: err => this.errorMessage = err
    });

    

    
  }

}

import { EditComponent } from './../edit/edit.component';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, FormArray, ValidatorFn,Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';

import { debounceTime } from 'rxjs/operators';
import { ItemComponent } from './../item/item.component';
import { ManufacturerService } from './../../../../services/manufacturer.service';
import { Manufacturer } from './../../../../model/manufacturer';
import { PproductService } from './../../../../services/pproduct.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { Pproduct } from 'src/app/model/pproduct';
import { delay } from 'rxjs/operators';
import { Image } from 'src/app/model/image';

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { range: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  sub?: Subscription;
  model = {} as Product;
  product = {} as Product;
  productSave = {} as Product;

  img = {} as Image;
  pproducts: Pproduct[] = [];
  manufacturers: Manufacturer[] = [];
  errorMessage: string = '';
  pageTitle = 'Product Edit';

  productForm!: FormGroup;

  //private validationMessages: { [key: string]: { [key: string]: string } };
  //private genericValidator: GenericValidator;

  getimagesControls() {
    return (this.productForm.get('images') as FormArray).controls;
  }

  constructor(private pproductService: PproductService,
              private manufacturerService: ManufacturerService,
              private productService: ProductService,
              private router: ActivatedRoute,
              private route: Router,
              private builder: FormBuilder)  {

              }

  ngOnInit(): void {

    this.productForm = this.builder.group({  
      images : this.builder.array([]),
      imageAlias: this.builder.array([]),
      name :  ['', [Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50)]],
      description : ['', [Validators.required, Validators.maxLength(50)]],
      quantityProducts : new FormControl('', Validators.compose([Validators.pattern("^[0-9]*$"), ratingRange(0, 500000), Validators.required])),
      unitCost : new FormControl('', Validators.compose([Validators.pattern("^[0-9]*$"), ratingRange(0, 500000), Validators.required])),
      ////state : new FormControl('', Validators.required),
      idPProductType : new FormControl('', Validators.required),
      idManufacturer : new FormControl('', Validators.required),
      starRating : [null, ratingRange(1, 5)],
      sendCatalog: true,
    }); 

    

    // Read the product Id from the route parameter
    this.sub = this.router.paramMap.subscribe(
      params => {
        const id = Number(params.get('id'));
        console.log(id);
        this.getProduct(id);
      }
    );

    this.sub = this.manufacturerService.getAll().subscribe({
      next: manufacturers => {
        this.manufacturers = manufacturers;
      },
      error: err => this.errorMessage = err
    });

    this.sub = this.pproductService.getAll().subscribe({
      next: pproducts => {
        this.pproducts = pproducts;
      },
      error: err => this.errorMessage = err
    });

    
    this.addNewImage();
    
  }



  ngAfterViewInit(): void {
 
  }
 
  getProduct(id: number): void {
    this.sub = this.productService.getProduct(id).subscribe({
      next: (product: Product) => this.displayProduct(product),
      error: err => this.errorMessage = err
    });
  }
  
  addNewImage() {
    const imageF = this.productForm.get('images') as FormArray;
    imageF.push(
        this.builder.group({
          pathPicture: ['', [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500)]],
        id: 0
    }));
  }

  deleteImage(i:number){
    console.log(i);
    const imageF = (this.productForm.get('images')as FormArray);
    imageF.removeAt(i);
    if(imageF.length===0){
      this.addNewImage();
    }
  }

 

  displayProduct(product: Product): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.name}`;
    }
    
    //this.productForm.setControl('images', this.builder.array(this.product.images || []) as FormArray);
    // Update the data on the form
    let arraImage: any[] = new Array();


    this.product.images.forEach( (img) => {
      var imagebg = this.builder.group({
        pathPicture: img.pathPicture,
        id: img.id
      });
      arraImage.push(imagebg);
    }); 

    //arraImage.push(this.product.images[1]);

    this.productForm.patchValue({
      name: this.product.name,
      description: this.product.description,
      quantityProducts: this.product.quantityProducts,
      unitCost: this.product.unitCost,
      idPProductType: this.product.idPProductType,
      idManufacturer: this.product.idManufacturer,
      starRating: this.product.starRating,
      //images: arraImage
      
    });

    //this.productForm.setControl('images', this.product.images);
    
    
    this.productForm.setControl('images', this.builder.array(arraImage));
    
    console.log('Que onda wey arraImage');
    console.log(arraImage);
    console.log('Que onda wey this.productForm');
    //console.log(this.productForm);
    console.log('Que onda wey');
    
    //this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }

  createItem(): FormGroup {
    return this.builder.group({
      id: '',
      pathPicture: ''
    });
  }




  saveProduct(): void {
    
    console.log(this.productForm.value.images);    
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        var p = { ...this.productSave, ...this.productForm.value };

       // p = { ...this.productSave.images, ...this.productForm.value.images };
        console.log("````````````````````````");
        console.log(p);
        if (this.product.id === 0) {
          this.productService.setProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.productService.updateProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
      
    }
  }

  deleteProduct(): void {
    console.error(this.product.id)
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } /*else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }*/
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.route.navigate(['/products']);
  }





}

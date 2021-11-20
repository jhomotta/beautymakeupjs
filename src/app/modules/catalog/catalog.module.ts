import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';
import { ItemComponent } from './pages/item/item.component';
import { AppComponent } from 'src/app/app.component';
import { StarComponent } from 'src/app/shared/star.component';



@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ListComponent,
    ItemComponent,
    StarComponent
  ],
  imports: [
 //   BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CatalogRoutingModule,    
    
  ]
})
export class CatalogModule { }

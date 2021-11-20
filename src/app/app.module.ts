import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { CatalogModule } from './modules/catalog/catalog.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//main routes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarComponent } from './shared/star.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces';

@NgModule({
  declarations: [
    AppComponent,
    //StarComponent,
    ConvertToSpacesPipe,
    ConvertToSpacesPipe,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    //FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    
    ReactiveFormsModule
    //CatalogModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

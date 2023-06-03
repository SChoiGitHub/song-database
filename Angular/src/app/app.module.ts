import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './Table/table.component';
import { CreateSongFormComponent } from './create-song-form/create-song-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditSongFormComponent } from './edit-song-form/edit-song-form.component';
import { IndexComponent } from './index/index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationitemComponent } from './navigationitem/navigationitem.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CreateSongFormComponent,
    EditSongFormComponent,
    IndexComponent,
    NavigationitemComponent,
    NavigationBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

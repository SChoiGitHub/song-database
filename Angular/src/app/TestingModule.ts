import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationitemComponent } from './navigationitem/navigationitem.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HttpClientTestingModule,
    RouterTestingModule.withRoutes([
      { path: '', redirectTo: 'addSong', pathMatch: 'full' },
      { path: 'addSong', component: NavigationitemComponent },
      { path: 'editSong', component: NavigationitemComponent },
    ]),
    RouterModule.forRoot([])
  ],
  providers: [{ provide: 'API_BASE_URL', useValue: '' }],
})
class CommonTestModule { };

export const buildTestBed = () => TestBed.configureTestingModule({
  imports: [CommonTestModule]
});
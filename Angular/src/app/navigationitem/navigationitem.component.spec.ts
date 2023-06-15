import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { expect } from '@jest/globals';
import { buildTestBed } from '../TestingModule';
import { NavigationitemComponent } from './navigationitem.component';

describe('NavigationitemComponent', () => {
  let component: NavigationitemComponent;
  let fixture: ComponentFixture<NavigationitemComponent>;
  let router: Router;

  beforeEach(async () => {
    await buildTestBed().configureTestingModule({
      declarations: [NavigationitemComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(NavigationitemComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
  });

  it('should match snapshot', () => {
    //Arrange
    component.link = '/addSong';
    component.label = 'Add Song';

    //Act
    fixture.detectChanges();

    //Assert
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('can become active', () => {
    //Arrange
    component.link = '/addSong';
    component.label = 'Add Song';

    //Act
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();

    //Assert
    expect(fixture.nativeElement).toMatchSnapshot();
  });
  it('can become active based on the URL', async () => {
    //Arrange
    component.link = '/addSong';
    component.label = 'Add Song';
    fixture.detectChanges();

    //Act
    await router.navigate(['/editSong']);
    fixture.detectChanges()
    expect(fixture.nativeElement).toMatchSnapshot();

    await router.navigate(['/addSong']);
    fixture.detectChanges()
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});

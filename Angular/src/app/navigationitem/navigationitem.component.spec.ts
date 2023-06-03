import { expect } from '@jest/globals';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavigationitemComponent } from './navigationitem.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavigationitemComponent', () => {
  let component: NavigationitemComponent;
  let fixture: ComponentFixture<NavigationitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationitemComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NavigationitemComponent);
    component = fixture.componentInstance;
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

  it('can become active', fakeAsync(() => {
    //Arrange
    component.link = '/addSong';
    component.label = 'Add Song';

    fixture.debugElement.query(By.css('button')).nativeElement.click();

    //Act
    fixture.detectChanges();
    tick();

    //Assert
    expect(fixture.debugElement.classes).toEqual('');
  }));
});

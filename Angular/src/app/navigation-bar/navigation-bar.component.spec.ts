import { expect } from '@jest/globals';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationBarComponent } from './navigation-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationitemComponent } from '../navigationitem/navigationitem.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationBarComponent, NavigationitemComponent],
      imports: [RouterTestingModule, NgbModule],
    });
    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should match snapshot', () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });


  it('should be active for the active link', () => {
    //Act
    let button = fixture.debugElement.query(By.css('button[aria-label="Navigate to Add Song"]'));
    button.nativeElement.click();
    fixture.detectChanges();

    //Assert
    expect(button.nativeElement).toMatchSnapshot();
    expect(button.nativeElement.class).toEqual('active');
  });
});

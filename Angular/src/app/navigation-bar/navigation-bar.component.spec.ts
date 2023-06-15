import { expect } from '@jest/globals';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavigationBarComponent } from './navigation-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationitemComponent } from '../navigationitem/navigationitem.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  let buttonToViewSongs: DebugElement;
  let buttonToAddSong: DebugElement;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationBarComponent, NavigationitemComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: '', component: NavigationitemComponent },
        { path: 'addSong', component: NavigationitemComponent },
        { path: 'editSong', component: NavigationitemComponent },
      ]), NgbModule],
    });
    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    buttonToAddSong = fixture.debugElement.query(By.css('button[aria-label="Navigate to Add Song"]'));
    buttonToViewSongs = fixture.debugElement.query(By.css('button[aria-label="Navigate to View Songs"]'));
  });

  it('should default active to nothing',  fakeAsync(() => {
    //Act
    tick();

    //Assert
    expect(fixture.nativeElement).toMatchSnapshot();
    expect(buttonToViewSongs.classes['active']).toBeFalsy();
  }));

  it('should be active for the active link', fakeAsync(() => {
    //Act
    buttonToAddSong.nativeElement.click();
    fixture.detectChanges();

    tick();

    //Assert
    expect(buttonToAddSong.classes['active']).toBeTruthy();
    expect(fixture.nativeElement).toMatchSnapshot();
  }));

  it('should use the last clicked link', () => {
    //Act
    buttonToAddSong.nativeElement.click();
    fixture.detectChanges();

    buttonToViewSongs.nativeElement.click();
    fixture.detectChanges();

    //Assert
    expect(fixture.nativeElement).toMatchSnapshot();
    expect(buttonToAddSong.classes['active']).toBeFalsy();
    expect(buttonToViewSongs.classes['active']).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { buildTestBed } from '../TestingModule';
import { EditSongFormComponent } from './edit-song-form.component';

describe('EditSongFormComponent', () => {
  let component: EditSongFormComponent;
  let fixture: ComponentFixture<EditSongFormComponent>;

  beforeEach(() => {
    buildTestBed().configureTestingModule({
      declarations: [EditSongFormComponent]
    });
    fixture = TestBed.createComponent(EditSongFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

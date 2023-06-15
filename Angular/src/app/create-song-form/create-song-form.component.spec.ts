import { ComponentFixture, TestBed } from '@angular/core/testing';
import { buildTestBed } from '../TestingModule';
import { CreateSongFormComponent } from './create-song-form.component';

describe('CreateSongFormComponent', () => {
  let component: CreateSongFormComponent;
  let fixture: ComponentFixture<CreateSongFormComponent>;

  beforeEach(async () => {
    await buildTestBed().configureTestingModule({
      declarations: [CreateSongFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSongFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

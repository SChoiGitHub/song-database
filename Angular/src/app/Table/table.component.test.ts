import { expect } from '@jest/globals';
import { TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { MusicService } from '../Service/music.service';
import { MusicServiceDouble } from '../Service/__mocks__/music.service';
import { Song } from '../BusinessObject/song';
import { BrowserTestingModule } from '@angular/platform-browser/testing';

describe('TableComponent', () => {
  let mock: MusicServiceDouble;

  beforeEach(() => {
    mock = new MusicServiceDouble();

    const providers = [
      { provide: MusicService, useValue: mock }
    ];

    TestBed.configureTestingModule({
      imports: [BrowserTestingModule],
      providers,
      declarations: [TableComponent]
    });
  });

  it('should say no music added without songs', () => {
    //Act
    const fixture = TestBed.createComponent(TableComponent);
    const app = fixture.nativeElement;

    //Assert
    expect(app).toMatchSnapshot()
  });

  it('should list songs', () => {
    //Arrange
    const song = new Song({ name: "Reborn Again", length: 209 });
    const fixture = TestBed.createComponent(TableComponent);

    //Act
    mock.songs.next([song]);
    fixture.detectChanges();
    const app = fixture.nativeElement;

    //Assert
    expect(app).toMatchSnapshot()
  });
});

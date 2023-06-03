import { expect } from '@jest/globals';
import { TestBed } from '@angular/core/testing';
import { MusicService } from '../Service/music.service';
import { MusicServiceDouble } from '../Service/__mocks__/music.service';
import { RawSong, Song } from '../BusinessObject/song';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('MusicService', () => {
  let http: HttpClient;
  let httpController: HttpTestingController;
  let musicService: MusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);

    musicService = new MusicService(http);
  });

  it('can acknowledge no songs', () => {
    //Arrange, Act
    const req = httpController.expectOne('http://localhost:5042/Music/GetAllSongs');
    req.flush([])

    //Assert
    expect(musicService.songs.getValue()).toEqual([])
  });

  it('can acknowledge no songs', () => {
    //Arrange
    const req = httpController.expectOne('http://localhost:5042/Music/GetAllSongs');
    req.flush([{ songId: 200, name: 'for Elise' }, { songId: 201, name: 'Titanium' }] as RawSong[]);

    //Act
    const songNotFound = musicService.getSong(404);
    const songFound = musicService.getSong(200);

    //Assert
    expect(songNotFound.songId).toEqual(-1);
    expect(songFound.name).toEqual('for Elise');
  });
});

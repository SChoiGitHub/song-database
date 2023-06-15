import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { RawSong } from '../BusinessObject/song';
import { MusicService } from '../Service/music.service';
import { buildTestBed } from '../TestingModule';

describe('MusicService', () => {
  let http: HttpClient;
  let httpController: HttpTestingController;
  let musicService: MusicService;

  beforeEach(() => {
    buildTestBed();

    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);

    musicService = new MusicService(http, 'test:1234');
  });

  it('can acknowledge no songs', () => {
    //Arrange, Act
    const req = httpController.expectOne('test:1234/Music/GetAllSongs');
    req.flush([])

    //Assert
    expect(musicService.songs.getValue()).toEqual([])
  });

  it('can acknowledge no songs', () => {
    //Arrange
    const req = httpController.expectOne('test:1234/Music/GetAllSongs');
    req.flush([{ songId: 200, name: 'for Elise' }, { songId: 201, name: 'Titanium' }] as RawSong[]);

    //Act
    const songNotFound = musicService.getSong(404);
    const songFound = musicService.getSong(200);

    //Assert
    expect(songNotFound.songId).toEqual(-1);
    expect(songFound.name).toEqual('for Elise');
  });
});

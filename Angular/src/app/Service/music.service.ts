import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song, RawSong } from '../BusinessObject/song';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  songs: BehaviorSubject<Song[]>;

  public constructor(private http: HttpClient) {
    this.songs = new BehaviorSubject<Song[]>([]);
    this.refreshSongs();
  }

  refreshSongs() {
    this.http.get<RawSong[]>("http://localhost:5042/Music/GetAllSongs").subscribe({
      next: (data: RawSong[]) => {
        this.songs.next(data.map(rs => new Song(rs)));
      },
    });
  }

  public addSong(song: RawSong) {
    this.http.post("http://localhost:5042/Music/AddNewSong", song).subscribe({
      next: () => this.refreshSongs(),
    });
  }

  public getSong(songId: number): Song {
    const allSongs = this.songs.getValue();

    return allSongs.find(s => s.songId === songId) ?? new Song();
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, share, shareReplay } from 'rxjs';
import { Song, RawSong } from '../BusinessObject/song';
import { RawTag, Tag } from '../BusinessObject/tag';

type TagMap = {
  [id: number]: Tag;
};

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  songs: BehaviorSubject<Song[]>;
  tags: Observable<TagMap>;

  public constructor(private http: HttpClient, @Inject('API_BASE_URL') private apiBaseUrl: string) {
    this.songs = new BehaviorSubject<Song[]>([]);
    this.tags = this.songs.pipe(map(songs => {
      const entries = songs.flatMap(s => s.tags.map(t => [t.tagId, t] as [number, Tag]))
      return Object.fromEntries(entries) as TagMap;
    }));

    this.refreshSongs();
  }

  refreshSongs() {
    this.http.get<RawSong[]>(this.apiBaseUrl + "/Music/GetAllSongs").subscribe({
      next: (data: RawSong[]) => {
        this.songs.next(data.map(rs => new Song(rs)));
      },
    });
  }

  public addSong(song: RawSong) {
    const subscription = this.http.post(this.apiBaseUrl + "/Music/AddNewSong", song).pipe(shareReplay(1));
    subscription.subscribe({
      next: () => this.refreshSongs(),
    });

    return subscription;
  }

  public getSong(songId: number): Observable<Song> {
    return this.songs.pipe(
      map(allSongs => allSongs.find(s => s.songId === songId) ?? new Song())
    );
  }

  public deleteSong(id: number) {
    this.http.delete(this.apiBaseUrl + `/Music/DeleteSong?id=${id}`).subscribe({
      next: () => this.refreshSongs(),
    });
  }

  public editSong(song: RawSong) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    const subscription = this.http.patch(this.apiBaseUrl + "/Music/EditSong", song, { headers }).pipe(shareReplay(1));
    subscription.subscribe({
      next: () => this.refreshSongs(),
    });

    return subscription;
  }

  public getTag(id: number) {
    return this.tags.pipe(map(ts => ts[id] ?? new Tag({})));
  }

  public editTag(tag: RawTag) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    const subscription = this.http.patch(this.apiBaseUrl + "/Music/EditTag", tag, { headers }).pipe(shareReplay(1));
    subscription.subscribe({
      next: () => this.refreshSongs(),
    });

    return subscription;
  }
}

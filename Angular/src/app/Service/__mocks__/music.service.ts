import { BehaviorSubject } from 'rxjs';
import { Song } from '../../BusinessObject/song';

export class MusicServiceDouble {
  songs: BehaviorSubject<Song[]>;

  constructor() {
    this.songs = new BehaviorSubject([] as Song[])
  };
}
